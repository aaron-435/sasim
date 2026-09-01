import React from "react";
import { Sparkles, BookOpen } from "lucide-react";
import { useStrings } from "@/lib/i18n";

/**
 * ReportScreen — module 3 (번아웃/에너지) demo report, dark mobile theme.
 * ------------------------------------------------------------------
 * Renders the same content as the v2 PDF report (오프닝→케이스미러→
 * 사주분석→심리검사분석→[NEW] 상담 내용→교차분석→브레이크→강점→취약점→
 * 라이프도메인→행동지침→사고방식지침→총평), adapted for in-app mobile
 * reading (scrollable single page, dark obsidian/gold theme matching
 * the rest of the app) instead of print pagination.
 *
 * NOTE on scope: in the real product this screen is reached after
 * purchasing Module 3's 30-question deep test — not directly from the
 * free onboarding→quiz→chat flow (the free flow's quiz is a coarse
 * 12-item filter, not the rich 3-dimension MBI breakdown this report
 * needs). This demo wires it after the free chat anyway so the full
 * pipeline can be clicked through end-to-end; the saju/quiz numbers
 * below default to the same sample scenario validated in the PDF
 * unless real values are passed in.
 *
 * `chatExtract` (from ChatScreen) is woven into a new section that
 * quotes the person's own words — the piece flagged as "다음 작업" in
 * 유료리포트_템플릿_v2_확정.md.
 * ------------------------------------------------------------------
 */

const DEFAULT_ELEMENTS = { fire: 50, earth: 8, wood: 15, metal: 12, water: 15 };
const DEFAULT_DIMENSIONS = { exhaustion: 78, cynicism: 22, efficacyLoss: 71 };

const DIMENSION_BAR_COLORS = ["#C1503B", "#3E6EA0", "#B98A4E", "#4E8368", "#8B6BB0"];

export default function ReportScreen({ nickname = "OOO", elements = DEFAULT_ELEMENTS, dimensions = DEFAULT_DIMENSIONS, chatExtract, psychTestDiagnosis }) {
  const t = useStrings();
  let sectionCounter = 0;
  const nextNum = () => String(++sectionCounter).padStart(2, "0");

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#08080C", display: "flex", justifyContent: "center" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        .rp-root, .rp-root * { box-sizing: border-box; font-family: 'Manrope', 'Noto Sans KR', sans-serif; }
        .rp-serif { font-family: 'Cormorant Garamond', 'Noto Sans KR', serif; }
        .rp-section { padding: 34px 22px; border-bottom: 1px solid #17161D; }
        .rp-num { font-size: 11px; color: #C9A24B; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 4px; }
        .rp-h1 { font-family: 'Cormorant Garamond','Noto Sans KR',serif; font-size: 22px; color: #EDE7DA; margin: 0 0 14px; line-height: 1.4; }
        .rp-h2 { font-size: 13px; color: #C9A24B; margin: 18px 0 6px; font-weight: 700; }
        .rp-body { font-size: 14px; line-height: 1.85; color: #C7C3D1; margin: 0 0 12px; }
        .rp-quote { font-family: 'Cormorant Garamond','Noto Sans KR',serif; font-size: 15px; line-height: 1.8; color: #EDE7DA;
          border-left: 2px solid #C9A24B; padding-left: 14px; margin: 14px 0; }
        .rp-case { background: rgba(201,162,75,0.05); border: 1px solid #2A2833; border-radius: 8px; padding: 16px; margin: 14px 0; }
        .rp-case-tag { font-size: 10px; color: #C9A24B; letter-spacing: 0.08em; font-weight: 700; margin-bottom: 8px; }
        .rp-case p { font-size: 13px; color: #B7B2C0; line-height: 1.75; margin: 0 0 8px; }
        .rp-breather { border-top: 1px solid #4E8368; border-bottom: 1px solid #4E8368; padding: 16px 2px; margin: 16px 0; }
        .rp-takeaway { background: #14131A; border: 1px solid #2A2833; padding: 12px 14px; margin-top: 10px; border-radius: 6px; font-size: 12.5px; color: #C7C3D1; }
        .rp-takeaway b { color: #C9A24B; }
        .rp-bullet-title { font-weight: 700; color: #EDE7DA; font-size: 13.5px; margin: 12px 0 3px; }
        .rp-bullet-title::before { content: "· "; color: #C9A24B; }
        .rp-bullet-body { font-size: 13px; color: #B7B2C0; line-height: 1.7; margin: 0 0 4px 14px; }
        .rp-fitgood, .rp-fitbad { padding: 12px 14px; border-radius: 6px; margin-bottom: 8px; font-size: 12.5px; line-height: 1.7; }
        .rp-fitgood { background: rgba(78,131,104,0.1); border-left: 3px solid #4E8368; color: #C7C3D1; }
        .rp-fitbad { background: rgba(193,80,59,0.1); border-left: 3px solid #C1503B; color: #C7C3D1; }
        .rp-fit-label { display: block; font-weight: 700; font-size: 11px; margin-bottom: 4px; }
        .rp-bar-track { height: 7px; background: #1C1B24; border-radius: 999px; overflow: hidden; margin-top: 4px; }
        .rp-bar-fill { height: 100%; border-radius: 999px; }
        .rp-chatquote { background: rgba(62,110,160,0.08); border: 1px solid rgba(62,110,160,0.35); border-radius: 8px; padding: 16px; margin: 14px 0; }
      ` }} />

      <div className="rp-root" style={{ width: "100%", maxWidth: "460px" }}>
        <div style={{ padding: "48px 24px 40px", textAlign: "center", borderBottom: "1px solid #17161D" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "10.5px", letterSpacing: "0.14em", color: "#C9A24B", textTransform: "uppercase", marginBottom: "18px" }}>
            <Sparkles size={12} /> Fatesaid
          </div>
          <h1 className="rp-serif" style={{ fontSize: "26px", color: "#EDE7DA", lineHeight: 1.5, margin: "0 0 10px" }}>
            꺼지지 않는 불 앞에서,<br />혼자 재를 기다리는 사람
          </h1>
          <p style={{ fontSize: "12.5px", color: "#8B879A", margin: "0 0 26px" }}>번아웃·에너지 심층 리포트 — 사주 × 심리검사 × 상담 통합</p>
          <p className="rp-serif" style={{ fontSize: "15px", color: "#EDE7DA", margin: 0 }}>{nickname} 님</p>
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">어느 밤의 장면</h1>
          <p className="rp-body">
            몸은 이미 하루치 연료를 다 써버렸는데, 머리는 좀처럼 꺼지지 않습니다. 침대에 누워도
            손은 자꾸 화면을 켜고, 내일 할 일들이 순서 없이 떠올랐다 사라지기를 반복합니다.
            오늘도 꽤 많은 걸 해냈을 텐데 — 정작 그 하루가 손에 잡히는 느낌은 별로 없습니다.
            뿌듯함보다 먼저 드는 생각은 &apos;내일은 더 잘해야 하는데&apos;입니다. {nickname}님의 밤은
            요즘, 이런 모양을 하고 있지 않으신가요.
          </p>
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">닮은 이야기 하나</h1>
          <div className="rp-case">
            <div className="rp-case-tag">CASE — B씨, 30대 중반, 자영업</div>
            <p>B씨는 사업을 시작한 뒤로 늘 &apos;남들보다 두 배는 해야 겨우 본전&apos;이라는 마음으로
            일했습니다. 성과는 나쁘지 않았지만, 정작 스스로는 그걸 성과라고 느낀 적이 거의
            없었습니다. 매출이 오른 달에도 &apos;운이 좋았을 뿐&apos;이라 생각했습니다.</p>
            <p>B씨의 사주 역시 화 기운이 강하고 토가 약했습니다. 타고난 추진력으로 여기까지
            왔지만, 그 추진력을 결과로 붙잡아 둘 힘이 함께 갖춰지지 않았던 것입니다.</p>
          </div>
        </div>

        {psychTestDiagnosis && (
          <div className="rp-section">
            <div className="rp-num">{nextNum()}</div>
            <h1 className="rp-h1">{psychTestDiagnosis.typeInfo?.title} <span style={{ fontSize: "11px", color: "#847E90" }}>{psychTestDiagnosis.moduleTitle ?? "심리테스트"} 분석</span></h1>
            <p className="rp-body">{psychTestDiagnosis.typeInfo?.hook}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "16px 0" }}>
              {psychTestDiagnosis.dimensionResults?.map((r, i) => (
                <div key={r.dimension}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "#9C97A6", marginBottom: "3px" }}>
                    <span>{psychTestDiagnosis.dimensionShortNames?.[r.dimension] ?? r.dimension}</span>
                    <span>{Math.round(r.percentOfMax)}% · {r.intensity}</span>
                  </div>
                  <div className="rp-bar-track">
                    <div className="rp-bar-fill" style={{ width: `${r.percentOfMax}%`, background: DIMENSION_BAR_COLORS[i % DIMENSION_BAR_COLORS.length] }} />
                  </div>
                </div>
              ))}
            </div>
            {psychTestDiagnosis.nuancedSummary && <p className="rp-body">{psychTestDiagnosis.nuancedSummary}</p>}
          </div>
        )}

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">무엇이 이 패턴을 만들었나 <span style={{ fontSize: "11px", color: "#847E90" }}>사주 원국 분석</span></h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {Object.entries(elements).map(([key, val]) => {
              const label = t.common.elementLabels[key];
              const color = { wood: "#4E8368", fire: "#C1503B", earth: "#B98A4E", metal: "#C7CAD1", water: "#3E6EA0" }[key];
              return (
                <div key={key}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "#9C97A6", marginBottom: "3px" }}>
                    <span>{label}</span><span>{val}%</span>
                  </div>
                  <div className="rp-bar-track"><div className="rp-bar-fill" style={{ width: `${val}%`, background: color }} /></div>
                </div>
              );
            })}
          </div>
          <h2 className="rp-h2">화(火) 과다 — 타오르는 속도는 타고났다</h2>
          <p className="rp-body">화는 표현력, 열정, 추진력을 상징하는 원소입니다. 다만 과다할 경우 에너지가
          오래 지속되기보다 짧고 강렬하게 소모되는 패턴을 보이기 쉽습니다.</p>
          <h2 className="rp-h2">토(土) 결핍 — 쌓아 둘 그릇이 비어 있다</h2>
          <p className="rp-body">토는 안정과 축적을 상징합니다. 화생토(火生土)의 원리상 화의 에너지는 토라는
          그릇에 담겨야 순환이 완성되는데, 이 사주에서는 그 그릇이 부족해 토가 용신(用神)으로
          작용해야 하는 구조입니다.</p>
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">몸과 마음이 보내온 신호 <span style={{ fontSize: "11px", color: "#847E90" }}>MBI 기반</span></h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {[
              { key: "exhaustion", label: "소진", active: true },
              { key: "cynicism", label: "냉소", active: false },
              { key: "efficacyLoss", label: "효능감저하", active: true },
            ].map((d) => (
              <div key={d.key}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "#9C97A6", marginBottom: "3px" }}>
                  <span>{d.label} {d.active ? <span style={{ color: "#CB6249" }}>● 활성</span> : <span style={{ color: "#4E8368" }}>● 비활성</span>}</span>
                  <span>{dimensions[d.key]}%</span>
                </div>
                <div className="rp-bar-track"><div className="rp-bar-fill" style={{ width: `${dimensions[d.key]}%`, background: d.active ? "#C1503B" : "#4E8368" }} /></div>
              </div>
            ))}
          </div>
          <p className="rp-body">자기효능감(self-efficacy, Albert Bandura)은 &apos;내가 이 일을 해낼 수 있다&apos;는
          스스로에 대한 신뢰입니다. 소진 상태가 지속되면 객관적 성과와 무관하게 효능감이 먼저
          무너지는 경우가 흔합니다. 냉소가 낮게 나온 것은, 일에 대한 애정이 식은 게 아니라
          애정이 큰 만큼 많이 써버린 결과에 가깝다는 뜻입니다.</p>
        </div>

        {chatExtract && (
          <div className="rp-section">
            <div className="rp-num">{nextNum()}</div>
            <h1 className="rp-h1">직접 나눈 이야기</h1>
            <p className="rp-body">사주와 심리검사가 구조를 보여준다면, 방금 나눈 대화는 지금 이 순간의
            실제 결을 보여줍니다.</p>
            <div className="rp-chatquote">
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <BookOpen size={13} color="#7FA8D6" />
                <span style={{ fontSize: "10.5px", color: "#7FA8D6", letterSpacing: "0.06em", fontWeight: 700 }}>상담 중 나온 이야기</span>
              </div>
              <p className="rp-serif" style={{ fontSize: "14.5px", color: "#EDE7DA", lineHeight: 1.75, margin: 0 }}>
                &quot;{chatExtract.summary_quote || chatExtract.trigger_point}&quot;
              </p>
            </div>
            <p className="rp-body">
              직접 나눈 대화에서도 {chatExtract.primary_concern} 쪽 고민이 선명하게 드러났고, 그 안에
              담긴 감정은 {chatExtract.emotional_state}에 가까웠습니다.
            </p>
            {chatExtract.integrated_summary && (
              <p className="rp-body">{chatExtract.integrated_summary}</p>
            )}
          </div>
        )}

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">타오르는 불이 재로 남지 못하는 이유</h1>
          <div className="rp-quote">
            화(火) 과다는 심리검사의 &apos;소진&apos; 결과와 정확히 맞물립니다. 에너지가 없어서가 아니라,
            너무 많이 써서 지친 쪽입니다.
          </div>
          <div className="rp-quote">
            토(土) 결핍은 &apos;효능감저하&apos;와 정확히 맞물립니다. 실제로는 많은 걸 이뤄냈어도, 그것이
            손에 잡히는 확신으로 정착되지 못하고 계속 흘러 나가버립니다.
          </div>
        </div>

        <div className="rp-section">
          <div className="rp-breather">
            <h2 className="rp-h2" style={{ color: "#4E8368" }}>잠깐, 심리학 상식 하나</h2>
            <p className="rp-body" style={{ margin: 0 }}>생리학자 한스 셀리에는 스트레스 반응을 세 단계로 설명했습니다 — 경보,
            저항, 소진. 화 기운이 강한 사주일수록 저항 단계를 유난히 오래 버티는데, 잘 버틴다는
            것이 안전하다는 뜻은 아닙니다.</p>
            <div className="rp-takeaway"><b>기억할 한 가지 · </b>지금 &apos;버틸 만하다&apos;는 감각 자체가, 이미 저항 단계 깊숙이
            들어와 있다는 신호일 수 있습니다.</div>
          </div>
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">강점</h1>
          {[
            ["추진력과 결단력", "결정을 내리면 지체 없이 행동으로 옮기는 힘이 있습니다."],
            ["상황 판단력", "직관적으로 흐름을 읽고 빠르게 대응하는 능력이 뛰어납니다."],
            ["일에 대한 진심", "낮은 냉소 지수가 보여주듯, 지금도 애정과 의미를 잃지 않고 있습니다."],
          ].map(([t, b]) => (
            <React.Fragment key={t}>
              <div className="rp-bullet-title">{t}</div>
              <div className="rp-bullet-body">{b}</div>
            </React.Fragment>
          ))}
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">취약점 및 주의할 점</h1>
          {[
            ["성과가 손에 잡히지 않는 감각", "이 상태가 반복되면 '더 해야 한다'는 조급함으로 이어지기 쉽습니다."],
            ["번아웃의 반복 가능성", "근본 구조가 바뀌지 않는 한 소진·회복 패턴이 주기적으로 되풀이될 수 있습니다."],
            ["휴식에 대한 죄책감", "멈춰서 회복하는 시간을 '낭비'처럼 느끼기 쉽습니다."],
          ].map(([t, b]) => (
            <React.Fragment key={t}>
              <div className="rp-bullet-title">{t}</div>
              <div className="rp-bullet-body">{b}</div>
            </React.Fragment>
          ))}
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">당신에게 맞는 일·환경</h1>
          <div className="rp-fitgood">
            <span className="rp-fit-label" style={{ color: "#4E8368" }}>이런 환경을 찾으세요</span>
            노력과 결과가 눈에 바로 보이는 구조 — 명확한 마감, 구체적인 피드백이 있는 일.
          </div>
          <div className="rp-fitbad">
            <span className="rp-fit-label" style={{ color: "#CB6249" }}>이런 환경은 피하세요</span>
            성과가 몇 달 뒤에야 드러나는 장기 프로젝트 단독 담당, 피드백이 거의 없는 업무.
          </div>
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">어떻게 행동하면 좋을까</h1>
          {[
            ["성과를 기록으로 남기기", "매주 완료한 것을 짧게라도 적어두는 습관을 들입니다."],
            ["의도적인 여백 시간 확보", "멈춤 자체를 일정처럼 계획해야 합니다."],
          ].map(([t, b]) => (
            <React.Fragment key={t}>
              <div className="rp-bullet-title">{t}</div>
              <div className="rp-bullet-body">{b}</div>
            </React.Fragment>
          ))}
        </div>

        <div className="rp-section">
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">어떻게 생각하면 편해질까</h1>
          <p className="rp-body">&apos;쉬는 것은 멈추는 것&apos;이라는 생각을 &apos;쉬는 것은 토를 쌓는 시간&apos;이라는
          은유로 바꿔보세요. 성과를 완성된 결과물이 아니라 축적되는 과정으로 재정의하는 것도
          도움이 됩니다.</p>
        </div>

        <div className="rp-section" style={{ borderBottom: "none" }}>
          <div className="rp-num">{nextNum()}</div>
          <h1 className="rp-h1">재는, 결국 쌓인다</h1>
          <p className="rp-body">타고난 화력은 부족함이 없습니다 — 문제는 그 화력을 담아낼 토가 아직
          충분히 갖춰지지 않았다는 데 있습니다. 매일 밤 다시 타오르기만 하던 불이, 이제는
          조금씩 재를 남기기 시작할 시간입니다.</p>
          <p style={{ fontSize: "11px", color: "#847E90", lineHeight: 1.6, marginTop: "22px", borderTop: "1px solid #1C1B24", paddingTop: "14px" }}>
            본 리포트는 SAZU 사주 데이터, 자체 설계된 번아웃 척도(MBI 기반), 상담 대화 내용을
            결합해 생성되었습니다. 사례(B씨)는 이해를 돕기 위한 각색된 예시입니다.
          </p>
          <p style={{ fontSize: "11px", color: "#847E90", lineHeight: 1.6, marginTop: "8px" }}>
            {t.report.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
