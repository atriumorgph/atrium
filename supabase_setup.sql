-- Atrium: content, team, activity tables + policies
create table if not exists public.content (
  id text primary key,
  title text not null,
  type text, category text, platform text, campaign text,
  status text default 'Idea', owner text, editor text, priority text,
  deadline date, est_cost numeric default 0, cost numeric default 0,
  views integer default 0, er numeric default 0, followers integer default 0,
  revenue numeric default 0, published date, watch numeric default 0,
  completion numeric default 0, created_at timestamptz default now()
);

create table if not exists public.team (
  id text primary key,
  name text not null, role text, dept text, color text,
  capacity numeric default 40, allocated numeric default 0,
  joined date, email text, access text, status text default 'Active',
  last_active text, created_at timestamptz default now()
);

create table if not exists public.activity (
  id text primary key,
  date date, time text, who text, what text, ref text, label text, type text,
  created_at timestamptz default now()
);

alter table public.content enable row level security;
alter table public.team enable row level security;
alter table public.activity enable row level security;

create policy "public read content" on public.content for select using (true);
create policy "public write content" on public.content for insert with check (true);
create policy "public update content" on public.content for update using (true);

create policy "public read team" on public.team for select using (true);
create policy "public write team" on public.team for insert with check (true);
create policy "public update team" on public.team for update using (true);

create policy "public read activity" on public.activity for select using (true);
create policy "public write activity" on public.activity for insert with check (true);

-- seed the current owner so the app's built-in profile matches a real row
insert into public.team (id, name, role, dept, color, capacity, allocated, joined, email, access, status, last_active)
values ('tm9','Jaymar Bomiel','Owner','Operations','#1D1D1F',40,0, current_date, 'jaymar@atrium.ph','owner','Active','now')
on conflict (id) do nothing;
