-- brofounder database schema
-- Run this in your Supabase SQL editor

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Projects table
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text default '',
  stage text default 'idea' check (stage in ('idea', 'validating', 'building-mvp', 'growing', 'scaling')),
  idea text default '',
  problem text default '',
  customer text default '',
  industry text default '',
  business_model text default '',
  country text default '',
  team_size text default '',
  experience text default '',
  challenge text default '',
  goals text[] default '{}',
  extra_info text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Workspace sections table
create table if not exists workspace_sections (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  title text not null,
  content text default '',
  section_type text not null check (section_type in ('summary', 'problem', 'solution', 'icp', 'market', 'competition', 'pricing', 'gtm', 'risks', 'next-steps')),
  editable boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Workspace messages table
create table if not exists workspace_messages (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Market research table
create table if not exists market_research (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null unique,
  tam text default '',
  sam text default '',
  som text default '',
  trends text[] default '{}',
  pain_points text[] default '{}',
  search_intent text default '',
  buying_behavior text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Competitors table
create table if not exists competitors (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  name text not null,
  description text default '',
  strengths text[] default '{}',
  weaknesses text[] default '{}',
  pricing text default '',
  market_share text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SWOT analysis table
create table if not exists swot_analysis (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null unique,
  strengths text[] default '{}',
  weaknesses text[] default '{}',
  opportunities text[] default '{}',
  threats text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Porter's Five Forces table
create table if not exists porter_five_forces (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null unique,
  threat_of_new_entrants text default '',
  bargaining_power_of_buyers text default '',
  bargaining_power_of_suppliers text default '',
  threat_of_substitutes text default '',
  rivalry_intensity text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Validation results table
create table if not exists validation_results (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null unique,
  idea_score integer default 0 check (idea_score >= 0 and idea_score <= 100),
  demand_score integer default 0 check (demand_score >= 0 and demand_score <= 100),
  execution_difficulty integer default 0 check (execution_difficulty >= 0 and execution_difficulty <= 100),
  revenue_potential integer default 0 check (revenue_potential >= 0 and revenue_potential <= 100),
  competition_level integer default 0 check (competition_level >= 0 and competition_level <= 100),
  ai_confidence integer default 0 check (ai_confidence >= 0 and ai_confidence <= 100),
  strengths text[] default '{}',
  weaknesses text[] default '{}',
  recommendations text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Customer personas table
create table if not exists customer_personas (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  name text not null,
  age text default '',
  role text default '',
  goals text[] default '{}',
  pain_points text[] default '{}',
  objections text[] default '{}',
  buying_triggers text[] default '{}',
  preferred_platforms text[] default '{}',
  daily_workflow text default '',
  messaging_strategy text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MVP plans table
create table if not exists mvp_plans (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null unique,
  roadmap jsonb default '[]',
  priorities jsonb default '[]',
  phases jsonb default '[]',
  technical_suggestions text[] default '{}',
  timeline text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Marketing plans table
create table if not exists marketing_plans (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null unique,
  positioning text default '',
  tagline text default '',
  landing_page_copy text default '',
  seo_strategy text default '',
  launch_strategy text default '',
  social_posts text[] default '{}',
  email_campaign jsonb default '{}',
  product_hunt_checklist text[] default '{}',
  reddit_strategy text default '',
  content_roadmap jsonb default '[]',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Documents table
create table if not exists documents (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  title text not null,
  doc_type text not null check (doc_type in ('pitch-deck', 'business-plan', 'prd', 'tech-roadmap', 'investor-summary', 'marketing-plan')),
  content text default '',
  exported boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Activities table
create table if not exists activities (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  activity_type text not null check (activity_type in ('research', 'validation', 'workspace', 'document', 'marketing', 'mvp', 'audience', 'competitors')),
  title text not null,
  description text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tasks table
create table if not exists tasks (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  title text not null,
  completed boolean default false,
  priority text default 'medium' check (priority in ('low', 'medium', 'high')),
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security policies
alter table projects enable row level security;
alter table workspace_sections enable row level security;
alter table workspace_messages enable row level security;
alter table market_research enable row level security;
alter table competitors enable row level security;
alter table swot_analysis enable row level security;
alter table porter_five_forces enable row level security;
alter table validation_results enable row level security;
alter table customer_personas enable row level security;
alter table mvp_plans enable row level security;
alter table marketing_plans enable row level security;
alter table documents enable row level security;
alter table activities enable row level security;
alter table tasks enable row level security;

-- Users can only access their own data
create policy "Users can view own projects" on projects for select using (auth.uid() = user_id);
create policy "Users can insert own projects" on projects for insert with check (auth.uid() = user_id);
create policy "Users can update own projects" on projects for update using (auth.uid() = user_id);
create policy "Users can delete own projects" on projects for delete using (auth.uid() = user_id);

-- Workspace sections
create policy "Users can view own workspace sections" on workspace_sections for select
  using (exists (select 1 from projects where projects.id = workspace_sections.project_id and projects.user_id = auth.uid()));
create policy "Users can manage own workspace sections" on workspace_sections for all
  using (exists (select 1 from projects where projects.id = workspace_sections.project_id and projects.user_id = auth.uid()));

-- Workspace messages
create policy "Users can view own workspace messages" on workspace_messages for select
  using (exists (select 1 from projects where projects.id = workspace_messages.project_id and projects.user_id = auth.uid()));
create policy "Users can insert own workspace messages" on workspace_messages for insert
  with check (exists (select 1 from projects where projects.id = workspace_messages.project_id and projects.user_id = auth.uid()));

-- Market research
create policy "Users can manage own market research" on market_research for all
  using (exists (select 1 from projects where projects.id = market_research.project_id and projects.user_id = auth.uid()));

-- Competitors
create policy "Users can manage own competitors" on competitors for all
  using (exists (select 1 from projects where projects.id = competitors.project_id and projects.user_id = auth.uid()));

-- SWOT
create policy "Users can manage own swot" on swot_analysis for all
  using (exists (select 1 from projects where projects.id = swot_analysis.project_id and projects.user_id = auth.uid()));

-- Porter's Five Forces
create policy "Users can manage own porter" on porter_five_forces for all
  using (exists (select 1 from projects where projects.id = porter_five_forces.project_id and projects.user_id = auth.uid()));

-- Validation results
create policy "Users can manage own validation" on validation_results for all
  using (exists (select 1 from projects where projects.id = validation_results.project_id and projects.user_id = auth.uid()));

-- Customer personas
create policy "Users can manage own personas" on customer_personas for all
  using (exists (select 1 from projects where projects.id = customer_personas.project_id and projects.user_id = auth.uid()));

-- MVP plans
create policy "Users can manage own mvp plans" on mvp_plans for all
  using (exists (select 1 from projects where projects.id = mvp_plans.project_id and projects.user_id = auth.uid()));

-- Marketing plans
create policy "Users can manage own marketing plans" on marketing_plans for all
  using (exists (select 1 from projects where projects.id = marketing_plans.project_id and projects.user_id = auth.uid()));

-- Documents
create policy "Users can manage own documents" on documents for all
  using (exists (select 1 from projects where projects.id = documents.project_id and projects.user_id = auth.uid()));

-- Activities
create policy "Users can manage own activities" on activities for all
  using (exists (select 1 from projects where projects.id = activities.project_id and projects.user_id = auth.uid()));

-- Tasks
create policy "Users can manage own tasks" on tasks for all
  using (exists (select 1 from projects where projects.id = tasks.project_id and projects.user_id = auth.uid()));

-- Indexes for performance
create index if not exists projects_user_id_idx on projects(user_id);
create index if not exists workspace_sections_project_id_idx on workspace_sections(project_id);
create index if not exists workspace_messages_project_id_idx on workspace_messages(project_id);
create index if not exists market_research_project_id_idx on market_research(project_id);
create index if not exists competitors_project_id_idx on competitors(project_id);
create index if not exists customer_personas_project_id_idx on customer_personas(project_id);
create index if not exists documents_project_id_idx on documents(project_id);
create index if not exists activities_project_id_idx on activities(project_id);
create index if not exists tasks_project_id_idx on tasks(project_id);
