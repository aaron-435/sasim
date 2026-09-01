# lib/i18n — translation scaffold

Set up 2026-09-02 so that when Fatesaid is ready to translate (deliberately
deferred until the product is feature-complete — this is a global-first
product, EN/ES are the real target, Korean is just the dev's own working
language), it's a **pure translation task**: fill in `en.ts`/`es.ts` with
translated values, no code refactoring needed.

## How it works

- `ko.ts` is the only fully-populated dictionary today. Every UI string
  used by the components listed below lives here, organized by screen.
- `en.ts` and `es.ts` currently just re-export `ko` verbatim (see their
  own file comments). Components already call `useStrings()` from
  `lib/i18n`, so swapping in real translations later means editing
  ONLY those two files — no component changes.
- `index.ts`'s `useStrings()` always returns `ko` for now (no locale
  switching exists yet — that's a separate decision for later: URL-based
  routing, a manual toggle, browser detection, etc. are all still open).

## To add a real translation later

1. Open `en.ts` (or `es.ts`), replace `export const en = ko;` with a
   literal object matching `ko.ts`'s exact shape, values translated.
2. TypeScript enforces the shape automatically (`Dictionary` in
   `index.ts` is `typeof ko`) — a missing or misspelled key is a type
   error, not a silent runtime fallback to Korean.
3. Wire up actual locale switching in `index.ts`'s `useStrings()` (or
   replace it with a proper Context/routing-based solution) — not done
   yet since there was nothing to switch between.

## What's covered

UI chrome text in: `OnboardingBirthChart.jsx`, `QuizScreen.jsx` (chrome
only — see below), `ChatScreen.jsx`, `ModuleSelect.jsx`, `ErrorNotice.jsx`,
`LoadingReveal.jsx`, `LegalPage.jsx` + `app/privacy/page.tsx` /
`app/terms/page.tsx` (via `lib/legalContent.ts`), `app/layout.tsx` metadata,
and `ReportScreen.jsx`'s closing disclaimer only.

## What's deliberately NOT covered (don't try to fold these in mechanically)

- **`lib/chatPrompts.ts`** — GPT-4o system prompts, including the crisis-
  response protocol and jailbreak defenses. Safety-critical wording;
  needs a careful dedicated pass (and probably native-speaker review),
  not a string-table swap. Also: the chatbot's actual reply language
  needs to match the user's language, which is a prompt-engineering
  change, not a translation-key change.
- **`lib/quizProfile.ts`'s `generateNuancedSummary()` / `generateFollowUpPrompt()`**
  — these compose sentences using Korean grammatical particles (은/는,
  이/가) chosen based on the preceding word. English/Spanish don't have
  an equivalent mechanic — this needs its own per-language sentence-
  building function, not translated string values.
- **The 11 module question banks** (`lib/module1Attachment.ts` ... 
  `lib/module11Instinct.ts`, ~330 questions total) and `lib/modules.ts`'s
  `title`/`subtitle`/`dimensionShortNames` — left alone because the
  content itself is still being revised (see project memory). Extending
  `getModuleById()` to take a `locale` param and look for a
  `moduleNXxx.<locale>.ts` variant is the intended pattern once the
  Korean content is final — don't restructure these files before then.
- **`ReportScreen.jsx`'s demo narrative body** — this is placeholder/
  sample content for a report feature that doesn't really exist yet
  (real reports are paid, per-module, and not built). Not worth
  translating content that's going to be replaced. Only its generic
  closing disclaimer was pulled into `ko.ts` (`report.disclaimer`),
  since that boilerplate will likely survive into the real thing.
