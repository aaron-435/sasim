-- Fatesaid — 웹→앱 넘김 저장 (2026-10-27, TODO 9). /api/handoff, lib/handoff.ts.
-- 웹에서 "앱에서 이어 보기"를 누른 때만 한 행이 생긴다. 7일 뒤 만료, 앱이 꺼내면(코드든 링크든) 지운다.
-- 저장: 6자리 코드, 링크 토큰의 SHA-256(원문은 링크에만), 진입점, 언어, 웹에서 이미 입력한 값
-- (생년월일, 있으면 시각·성별·도시·닉네임·관심 주제). 기기 식별자·자유 입력 글은 없다.
--
-- 실행(사용자, 한 번): SQL Editor에 이 파일 전체를 붙여넣고 실행. retention.sql보다 먼저.
-- 확인: select count(*) from handoffs;  → 0

create table if not exists handoffs (
  code text primary key,
  token_hash text not null unique,
  source text not null check (source in ('type_card', 'calculator', 'day_master', 'invite', 'qa')),
  locale text not null check (locale in ('ko', 'en', 'es')),
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists idx_handoffs_expires_at on handoffs(expires_at);

alter table handoffs enable row level security;
