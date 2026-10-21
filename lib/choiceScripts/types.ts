/**
 * lib/choiceScripts/types.ts
 * ------------------------------------------------------------------
 * 고정 스크립트형 선택지 챗(flowVersion 4)의 데이터 형식. 문구는 모두 사람이(Opus) 쓴 데이터이고,
 * 이 폴더의 코드는 문구를 만들지 않는다. 형식 설명은 CHOICE_SCRIPT_GUIDE.md 1절.
 * ------------------------------------------------------------------
 */

/** 보기 하나: 탭 문구, 그 보기를 골랐을 때 다음 턴 맨 앞에 붙는 반응 한 줄, 체크포인트·마무리 조립용 명사구. */
export interface ScriptOption {
  /** 탭 문구. 24자 이내. 사용자가 고르면 이 문구가 그대로 사용자 메시지가 된다. */
  text: string;
  reaction: string;
  /** 조사 없는 명사구. 틀 쪽에서 `{g2:이/가}` 같은 표기로 조사를 붙인다. */
  gist: string;
}

export interface ScriptTurn {
  turn: number;
  question: string;
  /** true면 질문 위에 `검사에서 "{label}"라고 답하셨어요.` 인용 줄을 둔다(1·5·10·14·18턴). */
  quote?: boolean;
  /** 인용할 퀴즈 답이 없을 때 쓰는 질문. 인용 줄에 기대지 않고 단독으로 말이 되어야 한다. 없으면 `question`을 쓴다. */
  questionNoQuote?: string;
  /** 보기 2~3개. 없으면 직접 입력 전용 턴(21턴). */
  options?: ScriptOption[];
}

/**
 * 템플릿 표기: `{g2}`는 2턴에서 고른 보기의 gist, `{g2:이/가}`는 gist 뒤에 받침이 있으면 앞 조사, 없으면
 * 뒤 조사를 붙인다. 그 턴 답이 직접 쓴 글이거나 없으면 gist 자리에 `ScriptCommon.freeGist`가 들어간다.
 */
export interface ModuleScript {
  moduleId: string;
  /** 보기 턴(1~8, 10~21). 9·22턴은 템플릿만 쓴다. */
  turns: Record<number, ScriptTurn>;
  /** 9턴: 앞에 8턴 반응 줄 1줄이 붙고, 아래 줄들이 이어진다. */
  checkpoint: string[];
  closing: {
    /** 앞에 21턴 반응 줄 1줄(직접 쓴 답이면 고정 풀)이 붙는다. 물음표 없음. */
    summary: string[];
    /** 21턴에 직접 쓴 글이 있을 때만 들어간다. */
    perspectiveLine: string;
    /** 마지막 안내 줄. */
    finalLine: string;
  };
}
