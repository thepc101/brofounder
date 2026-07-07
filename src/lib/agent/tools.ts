export interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, { type: string; description: string; required?: boolean }>;
  execute: (args: Record<string, string>, context?: AgentContext) => Promise<ToolResult>;
}

export interface AgentContext {
  projectId?: string;
  projectName?: string;
  projectDescription?: string;
  industry?: string;
  targetMarket?: string;
}

export interface ToolResult {
  success: boolean;
  data: unknown;
  summary: string;
}

interface BrowsedPageData {
  title: string;
  description: string;
  headings: string[];
  links?: { text: string; href: string }[];
  bodyText?: string;
}

function extractTextFromHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 8000);
}

function extractMeta(html: string): Record<string, string> {
  const meta: Record<string, string> = {};
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  if (titleMatch) meta.title = titleMatch[1].trim();

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  if (descMatch) meta.description = descMatch[1].trim();

  const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
  if (ogTitle) meta.ogTitle = ogTitle[1].trim();

  const ogDesc = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
  if (ogDesc) meta.ogDescription = ogDesc[1].trim();

  return meta;
}

function extractHeadings(html: string): string[] {
  const headings: string[] = [];
  const matches = html.matchAll(/<h[1-6][^>]*>([^<]*)<\/h[1-6]>/gi);
  for (const match of matches) {
    headings.push(match[1].trim());
  }
  return headings.slice(0, 20);
}

function extractLinks(html: string, baseUrl: string): { text: string; href: string }[] {
  const links: { text: string; href: string }[] = [];
  const matches = html.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>([^<]*)<\/a>/gi);
  for (const match of matches) {
    if (match[2].trim() && !match[1].startsWith("#") && !match[1].startsWith("javascript")) {
      let href = match[1];
      try {
        if (href.startsWith("/")) href = new URL(href, baseUrl).toString();
      } catch {}
      links.push({ text: match[2].trim(), href });
    }
  }
  return links.slice(0, 30);
}

export const agentTools: AgentTool[] = [
  {
    name: "browse_website",
    description:
      "Visit a website URL and analyze its content. Returns page title, meta description, headings, links, and main text content. Use this to understand what a company does, read blog posts, or analyze any webpage.",
    parameters: {
      url: { type: "string", description: "The full URL to browse (must start with http or https)", required: true },
    },
    execute: async (args) => {
      try {
        const url = args.url;
        if (!url) return { success: false, data: null, summary: "Error: No URL provided" };

        const response = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; BrofounderBot/1.0)",
            Accept: "text/html,application/xhtml+xml",
          },
          signal: AbortSignal.timeout(15000),
        });

        if (!response.ok) {
          return { success: false, data: null, summary: `Error: HTTP ${response.status} when fetching ${url}` };
        }

        const html = await response.text();
        const meta = extractMeta(html);
        const headings = extractHeadings(html);
        const links = extractLinks(html, url);
        const bodyText = extractTextFromHtml(html);

        const data = {
          url,
          title: meta.title || "Untitled",
          description: meta.description || meta.ogDescription || "",
          headings,
          links: links.slice(0, 15),
          bodyText: bodyText.slice(0, 6000),
          contentLength: bodyText.length,
        };

        const summary = `Browsed ${url}. Title: "${data.title}". ${headings.length} headings found. ${links.length} links found. Content: ${bodyText.slice(0, 500)}...`;

        return { success: true, data, summary };
      } catch (error: any) {
        return { success: false, data: null, summary: `Error browsing website: ${error.message}` };
      }
    },
  },

  {
    name: "search_web",
    description:
      "Search the web for information about any topic. Returns search results with titles, URLs, and snippets. Use this to find market data, competitor info, industry trends, news, or any information.",
    parameters: {
      query: { type: "string", description: "The search query", required: true },
    },
    execute: async (args) => {
      try {
        const query = args.query;
        if (!query) return { success: false, data: null, summary: "Error: No search query provided" };

        const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Accept-Encoding": "gzip",
            ...(process.env.BRAVE_SEARCH_API_KEY ? { "X-Subscription-Token": process.env.BRAVE_SEARCH_API_KEY } : {}),
          },
          signal: AbortSignal.timeout(10000),
        }).catch(() => null);

        if (response && response.ok) {
          const data = await response.json();
          return {
            success: true,
            data,
            summary: `Search results for "${query}": ${JSON.stringify(data).slice(0, 3000)}`,
          };
        }

        // Fallback: use webfetch to search via DuckDuckGo lite
        const ddgUrl = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`;
        const ddgResponse = await fetch(ddgUrl, {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; BrofounderBot/1.0)" },
          signal: AbortSignal.timeout(10000),
        });

        if (ddgResponse.ok) {
          const html = await ddgResponse.text();
          const text = extractTextFromHtml(html);
          return {
            success: true,
            data: { query, results: text.slice(0, 4000) },
            summary: `Search results for "${query}": ${text.slice(0, 3000)}`,
          };
        }

        return {
          success: false,
          data: null,
          summary: `Unable to search for "${query}" right now. Try browsing a specific website instead.`,
        };
      } catch (error: any) {
        return { success: false, data: null, summary: `Search error: ${error.message}` };
      }
    },
  },

  {
    name: "analyze_competitor",
    description:
      "Analyze a competitor by browsing their website. Extracts their value proposition, features, pricing, target audience, and positioning. Use this when the user asks about competitors.",
    parameters: {
      name: { type: "string", description: "The competitor company name", required: true },
      website: { type: "string", description: "The competitor's website URL", required: true },
    },
    execute: async (args, context) => {
      try {
        const { name, website } = args;
        const browseResult = await agentTools[0].execute({ url: website }, context);

        if (!browseResult.success) {
          return { success: false, data: null, summary: `Could not analyze ${name}: ${browseResult.summary}` };
        }

        const pageData = browseResult.data as any;

        const analysis = {
          name,
          website,
          title: pageData.title,
          description: pageData.description,
          headings: pageData.headings,
          bodyTextPreview: pageData.bodyText.slice(0, 3000),
          links: pageData.links?.slice(0, 10),
        };

        return {
          success: true,
          data: analysis,
          summary: `Analyzed competitor "${name}" at ${website}. Title: "${pageData.title}". Description: ${pageData.description}. Key headings: ${pageData.headings.slice(0, 5).join(", ")}. Full content available for deeper analysis.`,
        };
      } catch (error: any) {
        return { success: false, data: null, summary: `Error analyzing competitor: ${error.message}` };
      }
    },
  },

  {
    name: "research_market",
    description:
      "Research a market or industry. Browses relevant sources to gather market size data, trends, growth rates, key players, and opportunities. Use this for market research tasks.",
    parameters: {
      market: { type: "string", description: "The market or industry to research", required: true },
      specific_question: { type: "string", description: "A specific question to answer about the market" },
    },
    execute: async (args, context) => {
      try {
        const market = args.market;
        const specificQuestion = args.specific_question || "";

        // Search for market data
        const searchQuery = `${market} market size trends 2024 2025 TAM SAM`;
        const searchResult = await agentTools[1].execute({ query: searchQuery }, context);

        // Browse a relevant source if available
        let additionalData = "";
        if (searchResult.success) {
          const searchData = searchResult.data as any;
          const urls = searchData.results?.match?.(/https?:\/\/[^\s]+/g) || [];
          if (urls.length > 0) {
            const pageResult = await agentTools[0].execute({ url: urls[0] }, context);
            if (pageResult.success) {
              additionalData = (pageResult.data as any).bodyText?.slice(0, 3000) || "";
            }
          }
        }

        const researchData = {
          market,
          searchResults: searchResult.summary,
          additionalData: additionalData.slice(0, 3000),
          specificQuestion,
        };

        return {
          success: true,
          data: researchData,
          summary: `Market research for "${market}": ${searchResult.summary}${specificQuestion ? `\nSpecific question: ${specificQuestion}` : ""}`,
        };
      } catch (error: any) {
        return { success: false, data: null, summary: `Market research error: ${error.message}` };
      }
    },
  },

  {
    name: "validate_idea",
    description:
      "Validate a startup idea by analyzing market demand, competition, and execution difficulty. Returns a structured validation score with strengths, weaknesses, and recommendations.",
    parameters: {
      idea: { type: "string", description: "The startup idea to validate", required: true },
      market: { type: "string", description: "The target market or industry" },
    },
    execute: async (args, context) => {
      // Gather competitor data for validation
      const searchResult = await agentTools[1].execute(
        { query: `${args.idea} competitors alternatives market` },
        context
      );

      const validation = {
        idea: args.idea,
        market: args.market || context?.industry || "General",
        competitorData: searchResult.summary?.slice(0, 2000),
        context: context,
      };

      return {
        success: true,
        data: validation,
        summary: `Validation research for "${args.idea}": ${searchResult.summary}`,
      };
    },
  },

  {
    name: "create_persona",
    description:
      "Create a detailed customer persona. Browses relevant audience data and creates a comprehensive persona with demographics, goals, pain points, and marketing strategy.",
    parameters: {
      audience: { type: "string", description: "Description of the target audience", required: true },
      product: { type: "string", description: "The product or service they would use", required: true },
    },
    execute: async (args, context) => {
      const searchResult = await agentTools[1].execute(
        { query: `${args.audience} demographics behavior preferences ${args.product}` },
        context
      );

      return {
        success: true,
        data: {
          audience: args.audience,
          product: args.product,
          researchData: searchResult.summary?.slice(0, 2000),
        },
        summary: `Persona research for "${args.audience}" interested in "${args.product}": ${searchResult.summary}`,
      };
    },
  },

  {
    name: "plan_mvp",
    description:
      "Plan an MVP with features, timeline, and technical requirements. Analyzes the idea and creates a prioritized development plan.",
    parameters: {
      idea: { type: "string", description: "The product idea to plan", required: true },
      constraints: { type: "string", description: "Budget or timeline constraints" },
    },
    execute: async (args, context) => {
      const searchResult = await agentTools[1].execute(
        { query: `${args.idea} MVP best practices tech stack` },
        context
      );

      return {
        success: true,
        data: {
          idea: args.idea,
          constraints: args.constraints,
          researchData: searchResult.summary?.slice(0, 2000),
        },
        summary: `MVP planning for "${args.idea}": ${searchResult.summary}`,
      };
    },
  },

  {
    name: "draft_document",
    description:
      "Draft a business document like a pitch deck outline, business plan, PRD, investor summary, or marketing plan. Generates comprehensive, structured content.",
    parameters: {
      type: {
        type: "string",
        description: "Document type: pitch-deck, business-plan, prd, investor-summary, marketing-plan, tech-roadmap",
        required: true,
      },
      context: { type: "string", description: "Context about the startup to include", required: true },
    },
    execute: async (args, context) => {
      return {
        success: true,
        data: {
          documentType: args.type,
          context: args.context,
          projectContext: context,
        },
        summary: `Ready to draft ${args.type} with context: "${args.context.slice(0, 200)}"`,
      };
    },
  },

  {
    name: "get_strategy",
    description:
      "Get strategic advice for a specific startup challenge, decision, or question. Browses relevant resources and provides actionable recommendations.",
    parameters: {
      challenge: { type: "string", description: "The challenge, decision, or question", required: true },
      context: { type: "string", description: "Additional context about the situation" },
    },
    execute: async (args, context) => {
      const searchResult = await agentTools[1].execute(
        { query: `${args.challenge} startup strategy best practices` },
        context
      );

      return {
        success: true,
        data: {
          challenge: args.challenge,
          context: args.context,
          researchData: searchResult.summary?.slice(0, 2000),
        },
        summary: `Strategy research for "${args.challenge}": ${searchResult.summary}`,
      };
    },
  },

  {
    name: "extract_leads",
    description:
      "Extract potential customer leads, contacts, or business information from a webpage. Use this to find potential customers, partners, or contacts.",
    parameters: {
      url: { type: "string", description: "URL to extract leads from", required: true },
    },
    execute: async (args, context) => {
      const browseResult = await agentTools[0].execute({ url: args.url }, context);

      if (!browseResult.success) {
        return { success: false, data: null, summary: `Could not extract leads: ${browseResult.summary}` };
      }

      const pageData = browseResult.data as any;
      const emails = pageData.bodyText?.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
      const phones = pageData.bodyText?.match(/\+?[\d\s()-]{7,15}/g) || [];
      const socialLinks = pageData.links?.filter(
        (l: any) =>
          l.href.includes("linkedin.com") ||
          l.href.includes("twitter.com") ||
          l.href.includes("github.com")
      ) || [];

      return {
        success: true,
        data: {
          url: args.url,
          emails: [...new Set(emails)].slice(0, 10),
          phones: [...new Set(phones)].slice(0, 5),
          socialLinks: socialLinks.slice(0, 10),
          pageLinks: pageData.links?.slice(0, 20),
        },
        summary: `Extracted leads from ${args.url}: ${emails.length} emails, ${phones.length} phones, ${socialLinks.length} social links found.`,
      };
    },
  },

  {
    name: "update_project",
    description: "Update the project details in the workspace. Set or change the project name, description, or stage.",
    parameters: {
      name: { type: "string", description: "New project name" },
      description: { type: "string", description: "New project description" },
      stage: { type: "string", description: "New stage: idea, validating, building-mvp, growing, scaling" },
    },
    execute: async (args) => {
      const updates: string[] = [];
      if (args.name) updates.push(`name: "${args.name}"`);
      if (args.description) updates.push(`description: "${args.description}"`);
      if (args.stage) updates.push(`stage: "${args.stage}"`);

      return {
        success: true,
        data: args,
        summary: updates.length > 0 ? `Project updated: ${updates.join(", ")}` : "No changes made",
      };
    },
  },

  {
    name: "generate_code",
    description:
      "Generate boilerplate code for a specific feature. Can generate landing pages, API endpoints, database schemas, or React components.",
    parameters: {
      type: {
        type: "string",
        description: "What to generate: landing-page, api-endpoint, database-schema, component",
        required: true,
      },
      description: { type: "string", description: "Description of what to generate", required: true },
    },
    execute: async (args) => {
      return {
        success: true,
        data: {
          codeType: args.type,
          description: args.description,
        },
        summary: `Ready to generate ${args.type}: "${args.description}"`,
      };
    },
  },

  {
    name: "analyze_page",
    description:
      "Deep-analyze a specific webpage for SEO, content quality, conversion opportunities, or competitive insights. Returns detailed analysis.",
    parameters: {
      url: { type: "string", description: "The URL to analyze", required: true },
      focus: {
        type: "string",
        description: "Analysis focus: seo, conversion, content, competitive, general",
      },
    },
    execute: async (args, context) => {
      const browseResult = await agentTools[0].execute({ url: args.url }, context);

      if (!browseResult.success) {
        return { success: false, data: null, summary: `Could not analyze page: ${browseResult.summary}` };
      }

      const pageData = browseResult.data as any;

      const wordCount = pageData.bodyText?.split(/\s+/).length || 0;
      const hasCTA = pageData.bodyText?.toLowerCase().includes("sign up") ||
        pageData.bodyText?.toLowerCase().includes("get started") ||
        pageData.bodyText?.toLowerCase().includes("try free");

      return {
        success: true,
        data: {
          url: args.url,
          focus: args.focus || "general",
          title: pageData.title,
          description: pageData.description,
          wordCount,
          headingCount: pageData.headings?.length || 0,
          linkCount: pageData.links?.length || 0,
          hasCTA,
          bodyText: pageData.bodyText?.slice(0, 4000),
        },
        summary: `Analysis of ${args.url}: Title "${pageData.title}", ${wordCount} words, ${pageData.headings?.length || 0} headings, CTA present: ${hasCTA}`,
      };
    },
  },

  {
    name: "inspect_webtab",
    description:
      "Inspect a URL the founder has opened in the in-app web tab. Use this for live page reviews, competitor teardown, pricing-page audits, SEO/conversion analysis, or turning a browsed page into action items.",
    parameters: {
      url: { type: "string", description: "The currently open web tab URL", required: true },
      founder_goal: {
        type: "string",
        description: "What the founder wants to learn or accomplish from this tab",
      },
    },
    execute: async (args, context) => {
      const browseResult = await agentTools[0].execute({ url: args.url }, context);

      if (!browseResult.success) {
        return { success: false, data: null, summary: `Could not inspect web tab: ${browseResult.summary}` };
      }

      const pageData = browseResult.data as BrowsedPageData;
      const lowerText = (pageData.bodyText || "").toLowerCase();
      const conversionSignals = [
        "free trial",
        "book a demo",
        "get started",
        "pricing",
        "customers",
        "security",
        "integrations",
        "case study",
      ].filter((signal) => lowerText.includes(signal));

      return {
        success: true,
        data: {
          url: args.url,
          founderGoal: args.founder_goal || "General founder analysis",
          title: pageData.title,
          description: pageData.description,
          headings: pageData.headings,
          conversionSignals,
          pageText: pageData.bodyText?.slice(0, 5000),
          links: pageData.links?.slice(0, 20),
        },
        summary: `Inspected open tab ${args.url}. Title: "${pageData.title}". Conversion signals found: ${conversionSignals.join(", ") || "none obvious"}. Founder goal: ${args.founder_goal || "general analysis"}. Key headings: ${pageData.headings?.slice(0, 8).join(", ") || "none"}.`,
      };
    },
  },

  {
    name: "design_growth_experiments",
    description:
      "Create a weekly growth experiment plan with channels, hypotheses, assets, metrics, and execution steps. Use this when a founder needs traction or launch momentum.",
    parameters: {
      product: { type: "string", description: "The product or startup", required: true },
      audience: { type: "string", description: "Target customer or market", required: true },
      goal: { type: "string", description: "Primary growth goal such as waitlist, demos, revenue, or activation" },
    },
    execute: async (args, context) => {
      const research = await agentTools[1].execute(
        {
          query: `${args.product} ${args.audience} acquisition channels communities newsletters podcasts alternatives`,
        },
        context
      );

      return {
        success: true,
        data: {
          product: args.product,
          audience: args.audience,
          goal: args.goal || "Generate qualified demand",
          research: research.summary?.slice(0, 2500),
          experiments: [
            "Pain-led landing page test with one promise and one waitlist CTA",
            "Competitor alternative page targeting high-intent search",
            "Founder-led teardown post on LinkedIn, X, Reddit, and relevant communities",
            "Concierge pilot outreach to 30 hand-picked buyers",
            "Lead magnet or calculator that captures workflow-specific intent",
          ],
        },
        summary: `Designed growth experiments for ${args.product}. Audience: ${args.audience}. Goal: ${args.goal || "qualified demand"}. Research context: ${research.summary?.slice(0, 1800)}`,
      };
    },
  },

  {
    name: "audit_pricing",
    description:
      "Audit pricing and packaging for a startup. Combines competitor research with SaaS monetization strategy and returns plan options.",
    parameters: {
      product: { type: "string", description: "The product or startup", required: true },
      competitors: { type: "string", description: "Comma-separated competitor names or URLs" },
      target_customer: { type: "string", description: "Who buys the product" },
    },
    execute: async (args, context) => {
      const query = `${args.product} pricing ${args.competitors || ""} alternatives plans`;
      const research = await agentTools[1].execute({ query }, context);

      return {
        success: true,
        data: {
          product: args.product,
          competitors: args.competitors || "Not provided",
          targetCustomer: args.target_customer || context?.targetMarket || "Early customers",
          research: research.summary?.slice(0, 2500),
          packagingOptions: [
            { plan: "Free", purpose: "Capture solo founders and prove activation", metric: "1 workspace, limited AI runs" },
            { plan: "Founder Pro", purpose: "Monetize serious builders", metric: "More agent runs, exports, browser analysis" },
            { plan: "Launch Room", purpose: "High-intent sprint buyers", metric: "Fixed-price 14-day launch workflow" },
          ],
        },
        summary: `Pricing audit for ${args.product}. Suggested freemium wedge, paid founder plan, and launch-sprint package. Competitor research: ${research.summary?.slice(0, 1800)}`,
      };
    },
  },

  {
    name: "build_launch_room",
    description:
      "Create a launch room for a startup: positioning, channels, checklist, assets, target communities, KPIs, and a 14-day execution calendar.",
    parameters: {
      product: { type: "string", description: "The product to launch", required: true },
      audience: { type: "string", description: "The target audience", required: true },
      launch_goal: { type: "string", description: "Desired outcome of launch" },
    },
    execute: async (args, context) => {
      const research = await agentTools[1].execute(
        { query: `${args.audience} communities product hunt reddit linkedin launch ${args.product}` },
        context
      );

      return {
        success: true,
        data: {
          product: args.product,
          audience: args.audience,
          launchGoal: args.launch_goal || "Generate first engaged users",
          launchAssets: [
            "One-line positioning",
            "Launch post",
            "Demo GIF script",
            "Founder story thread",
            "Customer proof checklist",
            "Follow-up email sequence",
          ],
          calendar: [
            "Days 1-2: tighten promise and landing page",
            "Days 3-5: recruit beta users and collect objections",
            "Days 6-8: publish teardown/proof content",
            "Days 9-11: prep Product Hunt and community posts",
            "Days 12-14: launch, reply fast, convert demos",
          ],
          research: research.summary?.slice(0, 2500),
        },
        summary: `Launch room created for ${args.product}: 14-day calendar, assets, KPIs, and channel research. Research: ${research.summary?.slice(0, 1800)}`,
      };
    },
  },

  {
    name: "prepare_investor_room",
    description:
      "Prepare investor-facing materials and strategy: narrative, milestones, investor targets, diligence risks, data room checklist, and update email.",
    parameters: {
      startup: { type: "string", description: "Startup name or description", required: true },
      traction: { type: "string", description: "Current traction, revenue, users, pilots, or proof" },
      raise_goal: { type: "string", description: "Funding goal or round stage" },
    },
    execute: async (args, context) => {
      const research = await agentTools[1].execute(
        { query: `${args.startup} ${context?.industry || ""} seed investors accelerators market thesis` },
        context
      );

      return {
        success: true,
        data: {
          startup: args.startup,
          traction: args.traction || "Not provided",
          raiseGoal: args.raise_goal || "Pre-seed or seed readiness",
          investorRoom: [
            "Investor memo",
            "Pitch deck outline",
            "Demo narrative",
            "Traction dashboard",
            "Use of funds",
            "Risk and objection handling",
            "Weekly investor update template",
          ],
          research: research.summary?.slice(0, 2500),
        },
        summary: `Investor room prepared for ${args.startup}. Includes narrative, diligence checklist, target investor research, and update cadence. Research: ${research.summary?.slice(0, 1800)}`,
      };
    },
  },
];

export function getToolByName(name: string): AgentTool | undefined {
  return agentTools.find((t) => t.name === name);
}

export function getToolDefinitions(): string {
  return agentTools
    .map(
      (tool) =>
        `- ${tool.name}: ${tool.description}\n  Parameters: ${Object.entries(tool.parameters)
          .map(([k, v]) => `${k} (${v.type})${v.required ? " [required]" : ""}: ${v.description}`)
          .join(", ")}`
    )
    .join("\n\n");
}
