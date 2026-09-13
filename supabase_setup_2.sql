-- Atrium: campaigns, tasks, revenue, expenses, budgets, goals, assets, publishing

create table if not exists public.campaigns (
  id text primary key,
  name text not null, objective text, start date, "end" date,
  budget numeric default 0, spent numeric default 0, revenue numeric default 0,
  status text default 'Active', team jsonb default '[]'::jsonb, platforms jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.tasks (
  id text primary key,
  title text not null, content text, assignee text, due date,
  status text default 'To do', priority text, dept text, hours numeric default 0,
  created_at timestamptz default now()
);

create table if not exists public.revenue (
  id text primary key,
  date date, source text, client text, campaign text, content text,
  platform text, amount numeric default 0, status text default 'Pending', invoice text,
  created_at timestamptz default now()
);

create table if not exists public.expenses (
  id text primary key,
  date date, category text, vendor text, description text, amount numeric default 0,
  method text, dept text, campaign text, content text, recurrence text, approval text default 'Pending',
  created_at timestamptz default now()
);

create table if not exists public.budgets (
  id text primary key,
  name text not null, type text, period text, budget numeric default 0, actual numeric default 0, dept text,
  created_at timestamptz default now()
);

create table if not exists public.goals (
  id text primary key,
  name text not null, owner text, target numeric default 0, actual numeric default 0,
  fmt text default 'num', inverse boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.assets (
  id text primary key,
  name text not null, type text, content text, campaign text, creator text,
  date date, version numeric default 1, status text default 'Draft', tags text,
  created_at timestamptz default now()
);

create table if not exists public.publishing (
  id text primary key,
  content text, platform text, account text, date date, time text,
  status text default 'Scheduled', url text, hashtags text,
  created_at timestamptz default now()
);

alter table public.campaigns enable row level security;
alter table public.tasks enable row level security;
alter table public.revenue enable row level security;
alter table public.expenses enable row level security;
alter table public.budgets enable row level security;
alter table public.goals enable row level security;
alter table public.assets enable row level security;
alter table public.publishing enable row level security;

create policy "public read campaigns" on public.campaigns for select using (true);
create policy "public write campaigns" on public.campaigns for insert with check (true);
create policy "public update campaigns" on public.campaigns for update using (true);

create policy "public read tasks" on public.tasks for select using (true);
create policy "public write tasks" on public.tasks for insert with check (true);
create policy "public update tasks" on public.tasks for update using (true);

create policy "public read revenue" on public.revenue for select using (true);
create policy "public write revenue" on public.revenue for insert with check (true);
create policy "public update revenue" on public.revenue for update using (true);

create policy "public read expenses" on public.expenses for select using (true);
create policy "public write expenses" on public.expenses for insert with check (true);
create policy "public update expenses" on public.expenses for update using (true);

create policy "public read budgets" on public.budgets for select using (true);
create policy "public write budgets" on public.budgets for insert with check (true);
create policy "public update budgets" on public.budgets for update using (true);

create policy "public read goals" on public.goals for select using (true);
create policy "public write goals" on public.goals for insert with check (true);
create policy "public update goals" on public.goals for update using (true);

create policy "public read assets" on public.assets for select using (true);
create policy "public write assets" on public.assets for insert with check (true);
create policy "public update assets" on public.assets for update using (true);

create policy "public read publishing" on public.publishing for select using (true);
create policy "public write publishing" on public.publishing for insert with check (true);
create policy "public update publishing" on public.publishing for update using (true);
