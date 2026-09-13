-- Atrium: owner-only delete, enforced at the database level (not just hidden in the UI)
do $$
declare t text;
begin
  foreach t in array array['content','team','activity','campaigns','tasks','revenue','expenses','budgets','goals','assets','publishing']
  loop
    execute format('drop policy if exists "owner delete %1$s" on public.%1$s', t);
    execute format($f$
      create policy "owner delete %1$s" on public.%1$s for delete using (
        exists (select 1 from public.team tm where tm.email = auth.jwt() ->> 'email' and tm.access = 'owner')
      )
    $f$, t);
  end loop;
end $$;
