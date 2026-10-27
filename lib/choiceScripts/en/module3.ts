/**
 * lib/choiceScripts/en/module3.ts — Module 3 (burnout) fixed script, English.
 * Adapted from the Korean script (../module3.ts): same 22-turn shape, same field map. No particle syntax.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE3_SCRIPT_EN: ModuleScript = {
  moduleId: "module3",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "When in the day does that feel the strongest?",
      questionNoQuote: "When in the day does the exhaustion from work feel the strongest?",
      options: [
        o("Before I head to work", "It hits hardest before you head to work.", "before work"),
        o("Right in the middle of work", "It hits hardest right in the middle of work.", "mid-work"),
        o("After work is over", "It hits hardest once work is over.", "after work"),
      ],
    },
    2: {
      turn: 2,
      question: "What takes up the biggest share of that weight?",
      options: [
        o("The sheer amount of work", "The sheer amount is what stands out first.", "the volume of work"),
        o("The people", "The weight comes more from people than from the work.", "the people around you"),
        o("I can't pick just one", "Not fitting into one thing is an answer too.", "several things piling up"),
      ],
    },
    3: {
      turn: 3,
      question: "Where did the exhaustion show up first?",
      options: [
        o("My body wore out first", "The exhaustion came first in the body.", "the body"),
        o("My heart cooled first", "The exhaustion came first in the heart.", "the heart"),
      ],
    },
    4: {
      turn: 4,
      question: "If you had to name this state in one word, which is closest?",
      options: [
        o("Listlessness", "Leaning toward not being able to get going.", "listlessness"),
        o("Irritation", "The edgier side is out in front.", "irritation"),
        o("Emptiness", "A hollow feeling sits at the center.", "emptiness"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Have you had a stretch like this before, or is this the first?",
      questionNoQuote: "Have you had a stretch of work exhaustion like this before, or is this the first?",
      options: [
        o("Yes, before", "So there have been stretches like this before.", "a stretch that has happened before"),
        o("This is the first time", "So this is the first stretch like this.", "a first-time stretch"),
      ],
    },
    6: {
      turn: 6,
      question: "When you think of the hardest stretch at work so far, what comes to mind first?",
      options: [
        o("Work piled up", "The scene of stacked deadlines comes first.", "a time when work piled up"),
        o("People were hard", "Relationships sit up front in that memory.", "a time when people were hard"),
        o("It's blurry", "Some stretches get passed through in a blur.", "a blurry stretch"),
      ],
    },
    7: {
      turn: 7,
      // Turns 2 and 8 already offer "the amount of work", so this asks what changed when the heaviness began (2026-10-27).
      question: "Around the time this heaviness started, what changed?",
      options: [
        o("The point of the work blurred", "The reason for doing it faded first.", "the point of the work blurring"),
        o("My daily rhythm shifted", "The beat that kept your days moving changed then.", "a shift in your daily rhythm"),
        o("Nothing I can pin down", "No particular trigger comes to mind.", "a change you can't pin down"),
      ],
    },
    8: {
      turn: 8,
      question: "What drains your energy the most?",
      options: [
        // "The amount of work" is already a turn-2 option, so it is left out here (demand_drain: emotional labor, things out of your control).
        o("Handling emotions", "Managing feelings takes the most.", "handling emotions"),
        o("Things not going my way", "What's out of your hands takes the most.", "things not going your way"),
        o("Pressure to do well", "Living up to expectations is where your strength leaks out.", "the pressure to do well"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: 'Where does the feeling of "I mustn\'t rest" come from?',
      questionNoQuote: "If something stops you from resting, where do you think it comes from?",
      options: [
        o("From inside me", "Often it's a standard you set yourself.", "inside you"),
        o("From worrying about others", "Other people's eyes have become the standard.", "worrying about others"),
      ],
    },
    11: {
      turn: 11,
      question: "If that feeling went away, what would worry you most?",
      options: [
        o("Falling behind", "Falling behind is what worries you most.", "the worry of falling behind"),
        o("Becoming useless", "Becoming useless is what worries you most.", "the worry of becoming useless"),
        o("I'm not sure", "What worries you most isn't clear yet.", "something not yet put into words"),
      ],
    },
    12: {
      turn: 12,
      question: "What did you like about this work when you first took it on?",
      options: [
        o("The work itself", "The joy that came from the work itself.", "the work itself"),
        o("Seeing myself do it well", "Seeing yourself do it well was the draw.", "doing it well"),
        o("Feeling recognized", "Recognition from others was the draw.", "recognition"),
      ],
    },
    13: {
      turn: 13,
      question: "Is there anything that still gives you a little energy, even now?",
      options: [
        o("People close to me", "Even now, people close to you give you a little energy.", "people close to you"),
        o("Time alone", "Even now, time alone gives you a little energy.", "time alone"),
        o("Small wins at work", "Even now, small wins at work give you a little energy.", "small wins at work"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "How do you spend your days off?",
      options: [
        o("I actually rest", "Your days off turn into real rest.", "days off that really rest"),
        o("Work stays on my mind", "The body rests, the mind stays at work.", "work staying on your mind while resting"),
      ],
    },
    15: {
      turn: 15,
      question: "If thoughts of work come up while you're resting, what do you usually do?",
      options: [
        o("Just let them be", "When work thoughts come up, you usually let them be.", "letting them be"),
        o("Check or deal with it", "When work thoughts come up, you usually check or deal with it.", "checking and dealing with it"),
        o("Turn to something else", "When work thoughts come up, you usually turn to something else.", "turning to something else"),
      ],
    },
    16: {
      turn: 16,
      question: "When things get hard, which is closer to how you handle asking for help?",
      options: [
        o("I tend to say so", "You're on the side that speaks up first.", "speaking up"),
        o("I carry it alone to the end", "You're on the side that carries it alone to the end.", "carrying it alone"),
      ],
    },
    17: {
      turn: 17,
      question: "Who knows how you're doing right now?",
      options: [
        o("One or two people know", "One or two people know how you're doing now.", "one or two people"),
        o("Only family and friends", "Only family and friends know how you're doing now.", "only family and friends"),
        o("Nobody knows", "Nobody knows how you're doing now.", "nobody"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "If your energy came back, what would you want to do first?",
      options: [
        o("Do my work properly", "Getting back to the work comes first.", "work"),
        o("See people", "The heart goes to people first.", "people"),
        o("Take care of myself", "Time spent on yourself comes first.", "taking care of yourself"),
      ],
    },
    19: {
      turn: 19,
      question: "What would be the smallest first step toward getting your energy back?",
      options: [
        o("A ten-minute walk", "The smallest start is a ten-minute walk.", "a ten-minute walk"),
        o("Doing something I used to love", "The smallest start is going back to something you used to love.", "going back to something you loved"),
        o("A full night's sleep", "The smallest start is a full night's sleep.", "a full night's sleep"),
      ],
    },
    20: {
      turn: 20,
      question: "What were you like on the day you first started this work?",
      options: [
        o("Excited", "You started that day with excitement.", "excitement"),
        o("Nervous", "You started that day feeling nervous.", "nervousness"),
        o("I can't really remember", "That day has faded with time.", "the memory having faded"),
      ],
    },
    21: {
      turn: 21,
      question: "If you could say one thing to yourself on that first day, what would it be?",
    },
  },
  checkpoint: [
    "From what you've told me, the heaviest part of your days is {g2}; the exhaustion feels like {g4}; and what drains you most is {g8}.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "What weighs on your days most is {g2}. The exhaustion feels like {g4}, and what drains you most is {g8}.",
      "When you picture that feeling gone, what comes up is {g11}, and you still get a little energy from {g13}.",
      "When work thoughts come up, your usual move is {g15}; as for who knows how you're doing, the answer is {g17}; and the smallest first step you chose toward getting your energy back is {g19}.",
    ],
    perspectiveLine: "I'll also keep the words you wrote to yourself on that first day, just as you wrote them.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
