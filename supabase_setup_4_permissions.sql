-- Atrium: per-person navigation restrictions
alter table public.team add column if not exists restricted_nav jsonb default '[]'::jsonb;

-- Ram Kyle Bernardo: no Finance section except Financial reports, no Users and roles,
-- no Company profile, no Approvals (owner-only)
update public.team
set restricted_nav = '["revenue","expenses","costs","budget","profitability","users","company","approvals"]'::jsonb
where id = 'tm2';
