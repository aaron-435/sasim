-- Fatesaid — initial schema
-- Supabase SQL Editor에 붙여넣고 실행하세요.
-- user_id는 지금은 항상 null(익명 세션)이고, 나중에 로그인 붙이면
-- auth.users.id로 채워집니다 — 그때 마이그레이션 없이 그대로 연결됩니다.

create extension if not exists "pgcrypto";

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  track text,
  nickname text,
  verify_code text unique,
  verify_code_created_at timestamptz,
  created_at timestamptz not null default now()
);

-- 2026-09-04: nickname (onboarding step 1, needed so the web→app
-- verification-code handoff can restore it) + verify_code (short code
-- shown after the 2 free web Q&A questions — see /api/verification-code
-- — a future native app redeems it to pull this session's birth data
-- instead of asking the user to re-enter everything) added to an
-- already-created table. `create table if not exists` above won't add
-- these to a table that already exists in your Supabase project — run
-- this once by hand if `sessions` predates 2026-09-04:
--   alter table sessions add column if not exists nickname text;
--   alter table sessions add column if not exists verify_code text unique;
--
-- 2026-09-12: verify_code_created_at added for a 24h code expiry (the
-- code previously had no expiration at all — see /api/verification-code's
-- GET handler). This tracks when the CODE was (re)generated, separately
-- from the session row's own `created_at` (a session can sit around for
-- days before a code is ever generated on it, so reusing `created_at`
-- for the expiry check would be wrong). Run by hand if `sessions` predates
-- this date:
--   alter table sessions add column if not exists verify_code_created_at timestamptz;

create index if not exists idx_sessions_verify_code on sessions(verify_code);

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

-- 2026-09-09: GPT로 생성한 유료 리포트 본문 (see lib/report.ts). 기존에 이미
-- 배포된 DB에는 이 테이블이 없으므로, 아래 create table을 SQL Editor에서
-- 한 번 직접 실행해야 한다 (다른 alter table 마이그레이션들과 동일한 이유).
create table if not exists report_results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  content jsonb,
  created_at timestamptz not null default now()
);

-- 2026-09-10: LLM 호출(챗봇/QA/리포트) 토큰·비용 로그 — 실사용 트래픽 기준
-- GPT 비용을 추적하기 위함. 기존에 이미 배포된 DB에는 이 테이블이 없으므로,
-- 아래 create table을 SQL Editor에서 한 번 직접 실행해야 한다.
create table if not exists llm_usage_log (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete cascade,
  endpoint text not null,
  model text not null,
  prompt_tokens int not null,
  completion_tokens int not null,
  cost_usd numeric(10, 6),
  created_at timestamptz not null default now()
);

-- 2026-10-05: 제품 이벤트(온보딩·운세·Q&A·결제·공유·초대·알림·👍/👎) 자체 기록.
-- 외부 분석 SDK 대신 /api/events가 여기에 쓴다. anon_id는 기기(앱)·브라우저(웹)마다
-- 만든 무작위 값이고 sessions 테이블과 연결하지 않는다. 생년월일·이름·자유 입력 글은
-- 넣지 않는다(라우트가 이벤트 이름과 속성 키를 허용 목록으로만 받는다).
-- 배포된 DB에는 이 테이블이 없으므로 아래 create table을 SQL Editor에서 한 번 실행한다.
create table if not exists events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  client_ts timestamptz,
  anon_id text not null,
  locale text,
  platform text not null,
  dev boolean not null default false,
  name text not null,
  props jsonb
);

create index if not exists idx_events_created_at on events(created_at);
create index if not exists idx_events_name_created_at on events(name, created_at);

-- 2026-10-06: 궁합 상세 리포트(소모성 상품 compat_report) 구매 기록. 한 번 산 거래는
-- 한 상대 조합에만 쓴다 — /api/compatReport/paid가 RevenueCat에서 거래를 확인한 뒤
-- 처음 쓰는 거래면 상대 조합을 묶어 넣고, 다른 조합으로 다시 오면 거절한다.
-- pair_key는 상대 생년월일 등을 서버 비밀값으로 HMAC한 값이라 생년월일 원문은 남지 않는다.
-- transaction_id는 RevenueCat의 구매 id(스토어 거래 id로 와도 같은 구매면 같은 값으로 바꿔 넣는다).
-- generations는 같은 거래로 다시 만든 횟수(재설치·생성 실패 뒤 재시도 허용, 상한 있음).
-- 배포된 DB에는 이 테이블이 없으므로 아래 create table을 SQL Editor에서 한 번 실행한다.
create table if not exists compat_report_purchases (
  transaction_id text primary key,
  app_user_id text not null,
  pair_key text not null,
  generations int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2026-10-06: 친구 궁합 초대 링크(fatesaidapp.com/c/<code>). 앱이 만들고, 친구가 웹에서 자기
-- 생년월일을 넣으면 결과가 붙고, 보낸 사람 앱이 owner token으로 결과를 가져간다.
-- 저장하는 것: 코드, owner token의 SHA-256(원문은 보낸 사람 기기에만), 보낸 사람 표시 이름,
-- 보낸 사람 일간 한 글자(궁합은 두 일간만 비교), 언어, 친구가 적은 표시 이름(선택), 친구 결과
-- (일간 한 글자·사주 유형·가장 많은 오행). 친구 생년월일은 요청 안에서만 쓰고 저장하지 않는다.
-- 30일 뒤 만료되고, 만료된 행은 다음 초대를 만들 때 지운다.
-- 배포된 DB에는 이 테이블이 없으므로 아래 create table을 SQL Editor에서 한 번 실행한다.
create table if not exists invites (
  code text primary key,
  owner_token_hash text not null,
  sender_name text not null default '',
  sender_day_master text not null,
  locale text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  accepted_at timestamptz,
  friend_name text,
  friend_result jsonb
);

create index if not exists idx_invites_expires_at on invites(expires_at);

-- 2026-10-06: 커플 모드 연결(SPEC §7). 한 행 = 두 사람의 연결 하나.
-- 코드는 만든 사람(a)이 상대에게 보내고, 상대(b)가 자기 앱에서 입력하면 연결된다.
-- 저장: 양쪽 토큰의 SHA-256(기기만 원문을 앎), 표시 이름, 일간·일지 한 글자씩(오늘 흐름 계산용),
-- RevenueCat 앱 사용자 id(둘 중 한 명이라도 구독 중인지 서버가 확인). 생년월일은 없다.
-- 연결 전 코드는 7일 뒤 만료되고 다음 생성 때 지운다. 해제하면 행을 지운다(어느 쪽이든).
-- 배포된 DB에는 이 테이블이 없으므로 아래 create table을 SQL Editor에서 한 번 실행한다.
create table if not exists pairs (
  code text primary key,
  a_token_hash text not null,
  a_name text not null default '',
  a_day_master text not null,
  a_day_branch text,
  a_app_user_id text,
  b_token_hash text,
  b_name text,
  b_day_master text,
  b_day_branch text,
  b_app_user_id text,
  created_at timestamptz not null default now(),
  code_expires_at timestamptz not null,
  joined_at timestamptz
);

create index if not exists idx_pairs_code_expires_at on pairs(code_expires_at);

create index if not exists idx_saju_results_session on saju_results(session_id);
create index if not exists idx_quiz_results_session on quiz_results(session_id);
create index if not exists idx_chat_sessions_session on chat_sessions(session_id);
create index if not exists idx_report_results_session on report_results(session_id);
create index if not exists idx_llm_usage_log_session on llm_usage_log(session_id);
create index if not exists idx_llm_usage_log_created_at on llm_usage_log(created_at);

-- RLS(Row Level Security) 켜두기 — 서버(service_role 키)에서만 쓰고
-- 클라이언트에서 직접 DB를 건드리지 않을 것이므로, 기본적으로 전부 막아둔다.
alter table sessions enable row level security;
alter table saju_results enable row level security;
alter table quiz_results enable row level security;
alter table chat_sessions enable row level security;
alter table report_results enable row level security;
alter table llm_usage_log enable row level security;
alter table events enable row level security;
alter table compat_report_purchases enable row level security;
alter table invites enable row level security;
alter table pairs enable row level security;

-- service_role은 RLS를 우회하지만, 테이블 자체에 대한 GRANT는 별개다.
-- "Automatically expose new tables"를 꺼둔 상태에서 SQL Editor로 테이블을
-- 만들면 이 GRANT가 자동으로 안 걸리므로 명시적으로 열어준다.
grant usage on schema public to service_role;
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;
alter default privileges in schema public grant all on tables to service_role;
