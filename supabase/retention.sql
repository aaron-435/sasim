-- Fatesaid — 보관 기간이 지난 서버 기록 매일 삭제 (2026-10-27, TODO 5)
-- 처리방침 3항("최대 1년", 초대 30일, 커플 연결 코드 7일, 웹→앱 넘김 7일)을 실제 동작으로 맞춘다.
-- 이 파일 전에는 1년 지난 행을 지우는 작업이 저장소에 없었다(invites·pairs만 다음 생성 때 정리).
--
-- 실행(사용자, 한 번). handoffs 테이블이 있어야 하므로 supabase/handoffs.sql을 먼저 실행한다:
--   1. Supabase 대시보드 → Database → Extensions → pg_cron 켜기
--   2. SQL Editor에 이 파일 전체를 붙여넣고 실행
--   3. 확인: select jobname, schedule from cron.job;  → fatesaid-retention 한 줄
--      바로 한 번 돌려 보기: select purge_expired_data();
--
-- 지우지 않는 것: compat_report_purchases(구매한 리포트를 다시 열 수 있는 동안 보관한다고 적음).
-- sessions를 지우면 saju_results·quiz_results·chat_sessions·report_results·llm_usage_log의
-- 그 세션 행도 함께 지워진다(on delete cascade). 서버는 이 기록을 다시 읽어 기능을 만들지 않으므로
-- (리포트는 기기에 저장) 지워도 앱 동작은 바뀌지 않는다.

create extension if not exists pg_cron;

create or replace function purge_expired_data() returns void
language sql
as $$
  delete from saju_results    where created_at < now() - interval '1 year';
  delete from quiz_results    where created_at < now() - interval '1 year';
  delete from chat_sessions   where created_at < now() - interval '1 year';
  delete from report_results  where created_at < now() - interval '1 year';
  delete from llm_usage_log   where created_at < now() - interval '1 year';
  delete from sessions        where created_at < now() - interval '1 year';
  delete from events          where created_at < now() - interval '1 year';
  delete from invites         where expires_at < now();
  delete from pairs           where joined_at is null and code_expires_at < now();
  delete from handoffs        where expires_at < now();
$$;

-- 매일 03:15 UTC(한국 12:15). 같은 이름으로 다시 실행하면 일정만 덮어쓴다.
select cron.schedule('fatesaid-retention', '15 3 * * *', 'select purge_expired_data()');
