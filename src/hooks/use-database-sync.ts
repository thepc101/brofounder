"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";

export function useDatabaseSync() {
  const supabase = createClient();
  const store = useStore();
  const { isAuthenticated, user, project } = store;
  const isSyncingRef = useRef(false);

  // 1. Initial Load: Fetch data from Supabase when user logs in or project changes
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    async function loadData() {
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;

      try {
        const { data: { user: sbUser } } = await supabase.auth.getUser();
        if (!sbUser) {
          isSyncingRef.current = false;
          return;
        }

        // Fetch project
        const { data: projects, error: projectError } = await supabase
          .from("projects")
          .select("*")
          .order("updated_at", { ascending: false })
          .limit(1);

        if (projectError) throw projectError;

        if (projects && projects.length > 0) {
          const dbProject = projects[0];
          const projectId = dbProject.id;

          // Hydrate project state
          store.setProject({
            id: dbProject.id,
            name: dbProject.name,
            description: dbProject.description,
            stage: dbProject.stage,
            createdAt: dbProject.created_at,
            updatedAt: dbProject.updated_at,
            onboardingData: {
              idea: dbProject.idea || "",
              stage: dbProject.stage || "",
              problem: dbProject.problem || "",
              customer: dbProject.customer || "",
              industry: dbProject.industry || "",
              businessModel: dbProject.business_model || "",
              country: dbProject.country || "",
              team: dbProject.team_size || "",
              experience: dbProject.experience || "",
              challenge: dbProject.challenge || "",
              goals: dbProject.goals || [],
              extra: dbProject.extra_info || "",
            },
          });

          // Fetch workspace sections
          const { data: sections } = await supabase
            .from("workspace_sections")
            .select("*")
            .eq("project_id", projectId);
          if (sections) {
            store.setWorkspaceSections(
              sections.map((s: any) => ({
                id: s.id,
                title: s.title,
                content: s.content,
                type: s.section_type,
                editable: s.editable,
              }))
            );
          }

          // Fetch tasks
          const { data: tasks } = await supabase
            .from("tasks")
            .select("*")
            .eq("project_id", projectId);
          if (tasks) {
            tasks.forEach((t: any) => {
              if (!store.tasks.some((existingTask) => existingTask.id === t.id)) {
                store.addTask({
                  id: t.id,
                  title: t.title,
                  completed: t.completed,
                  priority: t.priority,
                  dueDate: t.due_date,
                });
              }
            });
          }

          // Fetch validation
          const { data: validations } = await supabase
            .from("validation_results")
            .select("*")
            .eq("project_id", projectId)
            .maybeSingle();
          if (validations) {
            store.setValidationResult({
              ideaScore: validations.idea_score,
              demandScore: validations.demand_score,
              executionDifficulty: validations.execution_difficulty,
              revenuePotential: validations.revenue_potential,
              competitionLevel: validations.competition_level,
              aiConfidence: validations.ai_confidence,
              strengths: validations.strengths || [],
              weaknesses: validations.weaknesses || [],
              recommendations: validations.recommendations || [],
            });
          }

          // Fetch market research
          const { data: market } = await supabase
            .from("market_research")
            .select("*")
            .eq("project_id", projectId)
            .maybeSingle();
          if (market) {
            store.setMarketResearch({
              tam: market.tam,
              sam: market.sam,
              som: market.som,
              trends: market.trends || [],
              painPoints: market.pain_points || [],
              searchIntent: market.search_intent,
              buyingBehavior: market.buying_behavior,
            });
          }

          // Fetch competitors
          const { data: competitors } = await supabase
            .from("competitors")
            .select("*")
            .eq("project_id", projectId);
          if (competitors) {
            store.setCompetitors(
              competitors.map((c: any) => ({
                id: c.id,
                name: c.name,
                description: c.description,
                strengths: c.strengths || [],
                weaknesses: c.weaknesses || [],
                pricing: c.pricing,
                marketShare: c.market_share,
              }))
            );
          }

          // Fetch personas
          const { data: personas } = await supabase
            .from("customer_personas")
            .select("*")
            .eq("project_id", projectId);
          if (personas) {
            store.setPersonas(
              personas.map((p: any) => ({
                id: p.id,
                name: p.name,
                age: p.age,
                role: p.role,
                goals: p.goals || [],
                painPoints: p.pain_points || [],
                objections: p.objections || [],
                buyingTriggers: p.buying_triggers || [],
                preferredPlatforms: p.preferred_platforms || [],
                dailyWorkflow: p.daily_workflow,
                messagingStrategy: p.messaging_strategy,
              }))
            );
          }

          // Fetch MVP Plan
          const { data: mvp } = await supabase
            .from("mvp_plans")
            .select("*")
            .eq("project_id", projectId)
            .maybeSingle();
          if (mvp) {
            store.setMvpPlan({
              roadmap: mvp.roadmap || [],
              priorities: mvp.priorities || [],
              phases: mvp.phases || [],
              technicalSuggestions: mvp.technical_suggestions || [],
              timeline: mvp.timeline,
            });
          }

          // Fetch Marketing Plan
          const { data: marketing } = await supabase
            .from("marketing_plans")
            .select("*")
            .eq("project_id", projectId)
            .maybeSingle();
          if (marketing) {
            store.setMarketingPlan({
              positioning: marketing.positioning,
              tagline: marketing.tagline,
              landingPageCopy: marketing.landing_page_copy,
              seoStrategy: marketing.seo_strategy,
              launchStrategy: marketing.launch_strategy,
              socialPosts: marketing.social_posts || [],
              emailCampaign: marketing.email_campaign || {},
              productHuntChecklist: marketing.product_hunt_checklist || [],
              redditStrategy: marketing.reddit_strategy,
              contentRoadmap: marketing.content_roadmap || [],
            });
          }
        }
      } catch (err) {
        console.error("Failed to sync load data from Supabase:", err);
      } finally {
        isSyncingRef.current = false;
      }
    }

    loadData();
  }, [isAuthenticated, user]);

  // 2. Write/Sync Hook: Save project state to Supabase when it changes in Zustand
  useEffect(() => {
    if (!isAuthenticated || !project || isSyncingRef.current) return;

    const timeout = setTimeout(async () => {
      try {
        const { data: { user: sbUser } } = await supabase.auth.getUser();
        if (!sbUser) return;

        // Upsert project
        const projectPayload = {
          id: project.id,
          user_id: sbUser.id,
          name: project.name,
          description: project.description || "",
          stage: project.stage || "idea",
          idea: project.onboardingData?.idea || "",
          problem: project.onboardingData?.problem || "",
          customer: project.onboardingData?.customer || "",
          industry: project.onboardingData?.industry || "",
          business_model: project.onboardingData?.businessModel || "",
          country: project.onboardingData?.country || "",
          team_size: project.onboardingData?.team || "",
          experience: project.onboardingData?.experience || "",
          challenge: project.onboardingData?.challenge || "",
          goals: project.onboardingData?.goals || [],
          extra_info: project.onboardingData?.extra || "",
          updated_at: new Date().toISOString(),
        };

        await supabase.from("projects").upsert(projectPayload);

        // Sync workspace sections
        if (store.workspaceSections.length > 0) {
          const sectionsPayload = store.workspaceSections.map((s) => ({
            id: s.id,
            project_id: project.id,
            title: s.title,
            content: s.content || "",
            section_type: s.type,
            editable: s.editable,
            updated_at: new Date().toISOString(),
          }));
          await supabase.from("workspace_sections").upsert(sectionsPayload);
        }

        // Sync market research
        if (store.marketResearch) {
          const marketPayload = {
            project_id: project.id,
            tam: store.marketResearch.tam || "",
            sam: store.marketResearch.sam || "",
            som: store.marketResearch.som || "",
            trends: store.marketResearch.trends || [],
            pain_points: store.marketResearch.painPoints || [],
            search_intent: store.marketResearch.searchIntent || "",
            buying_behavior: store.marketResearch.buyingBehavior || "",
          };
          await supabase.from("market_research").upsert(marketPayload);
        }

        // Sync validation score
        if (store.validationResult) {
          const validationPayload = {
            project_id: project.id,
            idea_score: store.validationResult.ideaScore || 0,
            demand_score: store.validationResult.demandScore || 0,
            execution_difficulty: store.validationResult.executionDifficulty || 0,
            revenue_potential: store.validationResult.revenuePotential || 0,
            competition_level: store.validationResult.competitionLevel || 0,
            ai_confidence: store.validationResult.aiConfidence || 0,
            strengths: store.validationResult.strengths || [],
            weaknesses: store.validationResult.weaknesses || [],
            recommendations: store.validationResult.recommendations || [],
          };
          await supabase.from("validation_results").upsert(validationPayload);
        }
      } catch (err) {
        console.error("Failed to sync project update to Supabase:", err);
      }
    }, 2000); // Debounce database saves by 2 seconds

    return () => clearTimeout(timeout);
  }, [
    project,
    store.workspaceSections,
    store.marketResearch,
    store.validationResult,
    isAuthenticated,
  ]);
}
