alter table public.team add column if not exists nickname text;
update public.team set nickname = 'Kyle' where id = 'tm2';
