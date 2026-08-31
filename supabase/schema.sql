-- Fatesaid — initial schema
-- Supabase SQL Editor에 붙여넣고 실행하세요.
-- user_id는 지금은 항상 null(익명 세션)이고, 나중에 로그인 붙이면
-- auth.users.id로 채워집니다 — 그때 마이그레이션 없이 그대로 연결됩니다.

create extension if not exists "pgcrypto";

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  track text,
  created_at timestamptz not null default now()
);

create table if not exists saju_results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  birth_year int,
  birth_month int,
  birth_day int,
  birth_hour int,
  birth_minute int,
  is_female boolean,
  birth_city text,
  elements jsonb,
  four_pillars jsonb,
  decade_fortune jsonb,
  summary jsonb,
  created_at timestamptz not null default now()
);

create table if not exists quiz_results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  module_id text,
  module_title text,
  answers jsonb,
  dimension_results jsonb,
  type_info jsonb,
  nuanced_summary text,
  created_at timestamptz not null default now()
);

create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  transcript jsonb,
  extract jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_saju_results_session on saju_results(session_id);
create index if not exists idx_quiz_results_session on quiz_results(session_id);
create index if not exists idx_chat_sessions_session on chat_sessions(session_id);

-- RLS(Row Level Security) 켜두기 — 서버(service_role 키)에서만 쓰고
-- 클라이언트에서 직접 DB를 건드리지 않을 것이므로, 기본적으로 전부 막아둔다.
alter table sessions enable row level security;
alter table saju_results enable row level security;
alter table quiz_results enable row level security;
alter table chat_sessions enable row level security;

-- service_role은 RLS를 우회하지만, 테이블 자체에 대한 GRANT는 별개다.
-- "Automatically expose new tables"를 꺼둔 상태에서 SQL Editor로 테이블을
-- 만들면 이 GRANT가 자동으로 안 걸리므로 명시적으로 열어준다.
grant usage on schema public to service_role;
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;
alter default privileges in schema public grant all on tables to service_role;
