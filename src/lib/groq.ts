const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface GroqCompletionOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

const defaultOptions: GroqCompletionOptions = {
  model: "mixtral-8x7b-32768",
  temperature: 0.7,
  max_tokens: 4096,
};

export async function createGroqCompletion(
  messages: GroqMessage[],
  options: GroqCompletionOptions = {}
) {
  const opts = { ...defaultOptions, ...options };

  if (!GROQ_API_KEY) {
    // Return simulated response when no API key is configured
    return simulateResponse(messages);
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: opts.model,
        messages,
        temperature: opts.temperature,
        max_tokens: opts.max_tokens,
        stream: opts.stream,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API call failed, using simulation:", error);
    return simulateResponse(messages);
  }
}

function simulateResponse(messages: GroqMessage[]): string {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";

  if (lastMessage.includes("business plan") || lastMessage.includes("business summary")) {
    return JSON.stringify({
      message: "I've generated a comprehensive business summary for your startup. Here's an overview of your business plan covering the key areas you'll need to focus on.",
      sections: [
        { id: "s1", title: "Business Summary", content: "A platform that helps remote teams manage async communication and stay aligned across time zones. The product focuses on reducing information overload and improving team coordination through intelligent threading, smart notifications, and integration-first architecture.", type: "summary", editable: true },
        { id: "s2", title: "Problem", content: "Remote teams struggle to stay aligned across time zones. Existing tools are either too noisy (Slack) or too slow (email), causing missed updates, duplicate work, and team fragmentation.", type: "problem", editable: true },
        { id: "s3", title: "Solution", content: "An intelligent async communication platform that uses AI to prioritize messages, summarize conversations, and ensure critical information reaches the right people at the right time.", type: "solution", editable: true },
        { id: "s4", title: "Market", content: "The global team communication market is valued at $50B TAM, with remote work adoption accelerating post-pandemic. SAM of $12B for mid-market teams, with SOM of $850M achievable in 3 years.", type: "market", editable: true },
        { id: "s5", title: "Competition", content: "Competing with Slack, Microsoft Teams, and async-first tools like Twist. Key differentiator is AI-powered prioritization and context preservation across time zones.", type: "competition", editable: true },
        { id: "s6", title: "Pricing", content: "Freemium model with Pro at $12/user/month and Enterprise at $25/user/month. Focus on bottom-up adoption with team-based pricing.", type: "pricing", editable: true },
        { id: "s7", title: "Go-to-Market", content: "Product-led growth targeting remote-first companies. Content marketing focused on async best practices. Launch on Product Hunt with founder community.", type: "gtm", editable: true },
        { id: "s8", title: "Risks", content: "Key risks include competition from established players, slow enterprise adoption, and the challenge of changing team communication habits.", type: "risks", editable: true },
        { id: "s9", title: "Next Steps", content: "1. Complete idea validation\n2. Build MVP with core async features\n3. Run beta with 10 design partners\n4. Launch on Product Hunt\n5. Iterate based on feedback", type: "next-steps", editable: true },
      ],
    });
  }

  if (lastMessage.includes("market") || lastMessage.includes("research")) {
    return JSON.stringify({
      message: "I've analyzed your market. Here are the key findings including market sizing, trends, and competitive landscape.",
      sections: [
        { id: "m1", title: "Market Size", content: "TAM: $50B | SAM: $12B | SOM: $850M. The remote work tools market is growing at 15% CAGR.", type: "market", editable: true },
        { id: "m2", title: "Key Trends", content: "1. Remote work adoption accelerating\n2. AI-powered tools becoming standard\n3. Integration-first platforms winning\n4. Privacy and security becoming critical", type: "market", editable: true },
      ],
    });
  }

  return JSON.stringify({
    message: "I've analyzed your request and here's what I recommend. Let me break this down into actionable steps for your startup.",
    sections: [
      { id: "g1", title: "Analysis", content: "Based on your startup context, I recommend focusing on validating demand before building. Start with customer interviews and a landing page test.", type: "summary", editable: true },
      { id: "g2", title: "Recommendations", content: "1. Run 30 customer interviews in 2 weeks\n2. Create a landing page with waitlist\n3. Set up analytics to measure interest\n4. Build MVP only after validation", type: "next-steps", editable: true },
    ],
  });
}
