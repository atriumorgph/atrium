-- Atrium: lock the whole system to signed-in admins only

-- both admins, same access
update public.team set access='admin' where id='tm9';
insert into public.team (id, name, role, dept, color, capacity, allocated, joined, email, access, status, last_active)
values ('tm2','Ram Kyle Bernardo','Admin','Operations','#3A5A8C',40,0, current_date, 'kyle@atrium.ph','admin','Active','now')
on conflict (id) do update set name=excluded.name, email=excluded.email, access=excluded.access;

-- tighten every table: only a signed-in user may read or write, no more public access
do $$
declare t text;
begin
  foreach t in array array['content','team','activity','campaigns','tasks','revenue','expenses','budgets','goals','assets','publishing']
  loop
    execute format('drop policy if exists "public read %1$s" on public.%1$s', t);
    execute format('drop policy if exists "public write %1$s" on public.%1$s', t);
    execute format('drop policy if exists "public insert %1$s" on public.%1$s', t);
    execute format('drop policy if exists "public update %1$s" on public.%1$s', t);
    execute format('create policy "auth read %1$s" on public.%1$s for select using (auth.role() = ''authenticated'')', t);
    execute format('create policy "auth insert %1$s" on public.%1$s for insert with check (auth.role() = ''authenticated'')', t);
    execute format('create policy "auth update %1$s" on public.%1$s for update using (auth.role() = ''authenticated'')', t);
  end loop;
end $$;
