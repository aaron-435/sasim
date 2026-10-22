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
        o("I stay right where I am", "When eyes gather, you stay right where you are.", "staying put under the gaze"),
        o("I slip away", "When eyes gather, you slip away.", "slipping away"),
        o("I pass it to someone else", "When eyes gather, you pass it to someone else.", "passing it to someone else"),
      ],
    },
    2: {
      turn: 2,
      question: "Recently, what kind of words did you swallow just before they came out?",
      options: [
        o("My opinion", "A scene of one thought stopping in front of the mouth.", "your opinion"),
        o("A request or a wish", "One thing you wanted, folded away inside.", "a request or a wish"),
        o("A refusal", "A \"no\" that turned back in the throat.", "a refusal"),
      ],
    },
    3: {
      turn: 3,
      question: "What was your relationship with the people there?",
      options: [
        o("Close", "The people there were close to you.", "a close relationship"),
        o("People I barely knew", "The people there were ones you barely knew.", "a relationship of barely knowing each other"),
      ],
    },
    4: {
      turn: 4,
      question: "After swallowing it, which is closer to your mind?",
      options: [
        o("Stifled", "A blocked feeling stays behind.", "feeling stifled"),
        o("Regret over what I missed", "Looking once more at what you let slip.", "regret over what you missed"),
        o("Relief", "A feeling of exhaling came first.", "relief"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "How often do you say things like \"whatever\" or \"I'm fine\"?",
      options: [
        o("Often", "You're on the side that often says \"whatever\" or \"I'm fine.\"", "saying it often"),
        o("Sometimes", "You're on the side that sometimes says \"whatever\" or \"I'm fine.\"", "saying it sometimes"),
        o("Hardly ever", "You're on the side that hardly ever says \"whatever\" or \"I'm fine.\"", "hardly ever saying it"),
      ],
    },
    6: {
      turn: 6,
      question: "Where do you mostly end up swallowing words?",
      options: [
        o("In a group", "The more people, the smaller the voice.", "in a group"),
        o("One-on-one", "If anything, words fold up when it's just the two of you.", "one-on-one"),
        o("At work", "Work is where you swallow the most.", "at work"),
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
      question: "Just before swallowing, what crosses your mind first?",
      options: [
        o("Standing out", "Being noticed catches first.", "the worry about standing out"),
        o("Getting it wrong", "Weighing first the chance it isn't the right answer.", "the worry about getting it wrong"),
        o("Spoiling the mood", "The grain of the room comes into view first.", "the worry about spoiling the mood"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "When you've said what you wanted, what kind of response has come back most often?",
      options: [
        o("It was accepted", "There's a memory of words landing in the right place.", "having been accepted"),
        o("It was brushed aside", "Words that passed without landing remain.", "having been brushed aside"),
        o("I was laughed at", "A scene that came back as laughter stays long.", "having been laughed at"),
      ],
    },
    11: {
      turn: 11,
      question: "If you showed what you want, how do you think it would look?",
      options: [
        o("Selfish", "If you showed what you want, it might look selfish.", "the worry of looking selfish"),
        o("Awkward", "If you showed what you want, it might feel awkward.", "the worry of it getting awkward"),
        o("No big deal", "Even if you showed what you want, it might be no big deal.", "a sense that it'd be no big deal"),
      ],
    },
    12: {
      turn: 12,
      question: "When you look in the mirror, what do you notice first?",
      options: [
        o("What I like", "An eye that finds the good parts first.", "what you like"),
        o("What I want to fix", "What needs working on catches your eye first.", "what you want to fix"),
        o("I just walk past", "On the side that doesn't look long.", "just walking past"),
      ],
    },
    13: {
      turn: 13,
      question: "Looking back later on what you swallowed, which is closer?",
      options: [
        o("Regret stays", "Looking back on what you swallowed, regret stays.", "regret"),
        o("I'm actually relieved", "Looking back on what you swallowed, you're actually relieved.", "relief"),
        o("It depends on the time", "Looking back on what you swallowed, your feeling changes each time.", "a feeling that changes"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "When an unfamiliar setting or something spontaneous comes up, what do you do?",
      options: [
        o("I head to what's familiar", "Your mind rests in choosing a known path.", "heading toward what's familiar"),
        o("I go along for now", "Giving yourself to the flow and watching.", "going along for now"),
        o("I try it first", "Taking a step first into the unfamiliar.", "trying it first"),
      ],
    },
    15: {
      turn: 15,
      question: "Where does the swallowed feeling usually go?",
      options: [
        o("It gets forgotten", "A swallowed feeling usually gets forgotten.", "getting forgotten"),
        o("I fill it in alone", "A swallowed feeling usually gets filled in alone.", "filling it in alone"),
        o("It bursts out later", "A swallowed feeling usually bursts out later.", "bursting out later"),
      ],
    },
    16: {
      turn: 16,
      question: "What are you like when you're alone?",
      options: [
        o("Free, as if singing or dancing", "There's a self that loosens when no one's there.", "freedom when alone"),
        o("Careful even alone", "Watching yourself even with no eyes on you.", "being careful even alone"),
      ],
    },
    17: {
      turn: 17,
      question: "Is there someone near you whom you can comfortably tell what you want?",
      options: [
        o("One or two people", "There are one or two people you can comfortably tell what you want.", "one or two people"),
        o("Sometimes, in certain moments", "There are moments when you comfortably say what you want.", "certain moments now and then"),
        o("Not yet", "There's no one yet to comfortably tell what you want.", "no one yet"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "When do you feel \"I'm quite myself like this\"?",
      options: [
        o("When I'm alone", "Being yourself is clearest in time alone.", "when you're alone"),
        o("When I'm with someone comfortable", "A moment when someone beside you loosens you up.", "when you're with someone comfortable"),
        o("When I'm absorbed in something", "On the side where you see yourself inside the task at hand.", "when you're absorbed in something"),
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
      question: "On the day you gave yourself that permission, what do you think I'd look like?",
      options: [
        o("Much lighter", "A figure with one layer of load off the shoulders.", "feeling much lighter"),
        o("A little unfamiliar", "A scene of facing a face you've never seen.", "feeling a little unfamiliar"),
        o("I can't picture it yet", "That scene remains blurry for now.", "a picture that's still blurry"),
      ],
    },
    21: {
      turn: 21,
      question: "If the child you once were, who said whatever you wanted without hesitation, could say something to you now, what would it be?",
    },
  },
  checkpoint: [
    "From what you've told me, what you swallowed recently is {g2}, afterward your mind is close to {g4}, and just before swallowing {g8} crosses your mind first.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "What you swallowed recently is {g2}, afterward your mind is close to {g4}, and where you mostly swallow is {g6}.",
      "Showing what you want brings {g11}, and for the swallowed feeling it's {g15}.",
      "The people you can speak comfortably with are {g17}, and the small permission you'd give yourself starts with {g19}.",
    ],
    perspectiveLine: "I'll also keep what the child you once were said, in your own words.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
