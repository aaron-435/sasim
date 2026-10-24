/**
 * lib/choiceScripts/en/module11.ts — Module 11 (instinct · self-silencing) fixed script, English. Adapted from ../module11.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE11_SCRIPT_EN: ModuleScript = {
  moduleId: "module11",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "When people's eyes gather on you, what do you tend to do?",
      options: [
        o("I stay right where I am", "When eyes turn to you, you stay right where you are.", "staying put under the gaze"),
        o("I slip away", "When eyes turn to you, you slip away.", "slipping away"),
        o("I pass it to someone else", "When eyes turn to you, you pass the spotlight to someone else.", "passing it to someone else"),
      ],
    },
    2: {
      turn: 2,
      question: "Think of a recent time you held something back just as you were about to say it. What was it?",
      options: [
        o("My opinion", "A thought that stopped right at your lips.", "your opinion"),
        o("A request or a wish", "Something you wanted, kept folded away inside.", "a request or a wish"),
        o("A refusal", "A \"no\" that stopped in your throat.", "a refusal"),
      ],
    },
    3: {
      turn: 3,
      question: "What was your relationship with the people there?",
      options: [
        o("Close", "The people there were close to you.", "a close relationship"),
        o("People I barely knew", "You barely knew the people there.", "barely knowing each other"),
      ],
    },
    4: {
      turn: 4,
      question: "Afterward, which of these is closest to what you felt?",
      options: [
        o("Stifled", "A blocked feeling stays behind.", "feeling stifled"),
        o("Regret over what I missed", "You keep looking back at what slipped by.", "regret over what you missed"),
        o("Relief", "Letting out a breath came first.", "relief"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "How often do you say things like \"whatever\" or \"I'm fine\"?",
      options: [
        o("Often", "You often say \"whatever\" or \"I'm fine.\"", "saying it often"),
        o("Sometimes", "You sometimes say \"whatever\" or \"I'm fine.\"", "saying it sometimes"),
        o("Hardly ever", "You hardly ever say \"whatever\" or \"I'm fine.\"", "hardly ever saying it"),
      ],
    },
    6: {
      turn: 6,
      question: "Where do you mostly end up holding your words back?",
      options: [
        o("In a group", "The more people, the smaller the voice.", "in a group"),
        o("One-on-one", "Words fold up most when it's just the two of you.", "one-on-one"),
        o("At work", "Work is where you hold back the most.", "at work"),
      ],
    },
    7: {
      turn: 7,
      question: "When someone says you did well, what do you do first?",
      options: [
        o("Accept it with thanks", "When told you did well, you accept it with thanks.", "accepting it with thanks"),
        o("Wave it off first", "When told you did well, you wave it off first.", "waving it off first"),
      ],
    },
    8: {
      turn: 8,
      question: "Just before you hold something back, what crosses your mind first?",
      options: [
        o("Standing out", "Being noticed is what snags first.", "the thought of standing out"),
        o("Getting it wrong", "You weigh first whether it's the right thing to say.", "the thought of getting it wrong"),
        o("Spoiling the mood", "The mood of the room is what you notice first.", "the thought of spoiling the mood"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "When you've said what you wanted, what kind of response has come back most often?",
      options: [
        o("It was accepted", "You remember words landing in the right place.", "having been accepted"),
        o("It was brushed aside", "You remember words that passed without landing.", "having been brushed aside"),
        o("I was laughed at", "A reply of laughter is one that stays with you.", "having been laughed at"),
      ],
    },
    11: {
      turn: 11,
      question: "If you showed what you want, how do you think it would come across?",
      options: [
        o("Selfish", "Showing what you want feels like it might look selfish.", "selfish"),
        o("Awkward", "Showing what you want feels like it might get awkward.", "awkward"),
        o("No big deal", "You feel that showing what you want might be no big deal.", "no big deal"),
      ],
    },
    12: {
      turn: 12,
      question: "When you look in the mirror, what do you notice first?",
      options: [
        o("What I like", "You find the parts you like first.", "what you like"),
        o("What I want to fix", "What you want to work on catches your eye first.", "what you want to fix"),
        o("I just walk past", "You don't tend to look for long.", "just walking past"),
      ],
    },
    13: {
      turn: 13,
      question: "Looking back later on what you held back, which is closest?",
      options: [
        o("Regret stays", "Looking back on what you held back, regret stays.", "regret"),
        o("I'm actually relieved", "Looking back on what you held back, you're actually relieved.", "relief"),
        o("It depends on the time", "Looking back on what you held back, your feeling depends on the time.", "a feeling that changes"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "When an unfamiliar setting or something spontaneous comes up, what do you do?",
      options: [
        o("I head to what's familiar", "You find ease in choosing a known path.", "heading toward what's familiar"),
        o("I go along for now", "You let the flow carry you and watch.", "going along for now"),
        o("I try it first", "You take the first step into the unfamiliar.", "trying it first"),
      ],
    },
    15: {
      turn: 15,
      question: "Where does a feeling you held back usually go?",
      options: [
        o("It gets forgotten", "A held-back feeling usually gets forgotten.", "getting forgotten"),
        o("I settle it on my own", "A held-back feeling is usually something you settle on your own.", "being settled on your own"),
        o("It bursts out later", "A held-back feeling usually bursts out later.", "bursting out later"),
      ],
    },
    16: {
      turn: 16,
      question: "What are you like when you're alone?",
      options: [
        o("Free, as if singing or dancing", "A self that loosens up when no one is there.", "freedom when alone"),
        o("Careful even alone", "You keep watching yourself even with no one looking.", "being careful even alone"),
      ],
    },
    17: {
      turn: 17,
      question: "Is there someone near you whom you can comfortably tell what you want?",
      options: [
        o("One or two people", "There are one or two people you can comfortably tell what you want.", "one or two people"),
        o("Sometimes, in certain moments", "There are certain moments when you comfortably say what you want.", "only certain moments"),
        o("Not yet", "You have no one yet to comfortably tell what you want.", "no one yet"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "When do you feel \"I'm quite myself like this\"?",
      options: [
        o("When I'm alone", "Being yourself is clearest when you're alone.", "when you're alone"),
        o("When I'm with someone comfortable", "Someone beside you helps you loosen up.", "when you're with someone comfortable"),
        o("When I'm absorbed in something", "You see yourself most clearly inside the task at hand.", "when you're absorbed in something"),
      ],
    },
    19: {
      turn: 19,
      question: "If you gave yourself one small permission, what would you want to try first?",
      options: [
        o("Saying what I want to eat", "You'd like to start with saying what you want to eat.", "saying what you want to eat"),
        o("Trying to say no", "You'd like to start with saying no.", "trying to say no"),
        o("Bringing up what I want to do first", "You'd like to start with bringing up what you want to do first.", "bringing up what you want to do first"),
      ],
    },
    20: {
      turn: 20,
      question: "On the day you gave yourself that permission, how do you picture yourself?",
      options: [
        o("Much lighter", "One layer of weight lifted off your shoulders.", "feeling much lighter"),
        o("A little unfamiliar", "Like meeting a face you haven't seen before.", "feeling a little unfamiliar"),
        o("I can't picture it yet", "That picture is still blurry for now.", "a picture that's still blurry"),
      ],
    },
    21: {
      turn: 21,
      question: "If the child you once were could say something to you now, what would it be?",
    },
  },
  checkpoint: [
    "From what you've told me, what you held back recently is {g2}, afterward what you feel is closest to {g4}, and just before holding back, {g8} crosses your mind first.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "What you held back recently is {g2}, afterward what you feel is closest to {g4}, and you mostly hold back {g6}.",
      "If you showed what you want, you imagine it would come across as {g11}, and a held-back feeling usually ends up {g15}.",
      "When it comes to telling someone what you want, you have {g17}, and the small permission you'd give yourself starts with {g19}.",
    ],
    perspectiveLine: "I'll also keep the words you wrote from the child you once were, just as you wrote them.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
