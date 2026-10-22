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
        o("The sheer amount of work", "The amount alone is what catches first.", "the amount of work"),
        o("The people", "The weight comes more from people than from the work.", "people"),
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
        o("Listlessness", "Tilted toward not being able to get motivated.", "listlessness"),
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
      question: "When you think back on those stretches, what comes to mind first?",
      options: [
        o("Work piled up", "The scene of stacked deadlines comes first.", "a time when work piled up"),
        o("People were hard", "Relationships sit up front in that memory.", "a time when people were hard"),
        o("It's blurry", "Some stretches get passed through in a blur.", "a blurry stretch"),
      ],
    },
    7: {
      turn: 7,
      question: "Why does the work feel so heavy to you?",
      options: [
        o("There's too much of it", "So it feels heavy because there's so much of it.", "quantity"),
        o("I can't see the point", "So it feels heavy because the point is hard to see.", "meaning"),
      ],
    },
    8: {
      turn: 8,
      question: "What drains your energy the most?",
      options: [
        o("The amount of work", "The pile that keeps growing is the biggest leak.", "the amount of work"),
        o("Handling emotions", "Spending feelings takes the most.", "handling emotions"),
        o("Things not going my way", "What's out of my hands takes the most.", "things not going your way"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: 'Where does the feeling of "I mustn\'t rest" come from?',
      questionNoQuote: "If something stops you from resting, where do you think it comes from?",
      options: [
        o("From inside me", "Often it's a standard you set yourself.", "inside you"),
        o("From worrying about others", "An outside gaze has become the standard.", "worrying about others"),
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
        o("Seeing myself do it well", "The sense of getting it done was the strength.", "doing it well"),
        o("Feeling recognized", "The response from outside was the strength.", "recognition"),
      ],
    },
    13: {
      turn: 13,
      question: "Is there anything that still refills you, even a little?",
      options: [
        o("People close to me", "Even now, people close to you refill you a little.", "people close to you"),
        o("Time alone", "Even now, time alone refills you a little.", "time alone"),
        o("Small wins at work", "Even now, small wins at work refill you a little.", "small wins at work"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "How do you spend your days off?",
      options: [
        o("I actually rest", "Rest time turns into real rest.", "days off that really rest"),
        o("Work stays on my mind", "The body rests, the mind stays at work.", "work staying on your mind while resting"),
      ],
    },
    15: {
      turn: 15,
      question: "When thoughts of work cut in, what do you usually do?",
      options: [
        o("Just let them be", "When work thoughts cut in, you usually let them be.", "letting them be"),
        o("Check or deal with it", "When work thoughts cut in, you usually check or deal with it.", "checking and dealing with it"),
        o("Turn to something else", "When work thoughts cut in, you usually turn to something else.", "turning to something else"),
      ],
    },
    16: {
      turn: 16,
      question: "When things are hard, how do you ask for help?",
      options: [
        o("I tend to say so", "You're on the side that speaks up first.", "speaking up"),
        o("I carry it alone to the end", "On the side that carries it alone to the end.", "carrying it alone"),
      ],
    },
    17: {
      turn: 17,
      question: "Has anyone noticed how you're doing now?",
      options: [
        o("One or two people know", "One or two people have noticed how you are now.", "one or two people noticing"),
        o("Only family and friends", "Only family and friends know how you are now.", "only people outside work knowing"),
        o("Nobody knows", "Nobody has noticed how you are now.", "nobody knowing"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "If your energy came back, what would you want to do first?",
      options: [
        o("Do my work properly", "Wanting to go back to work first.", "work"),
        o("See people", "The heart goes to people first.", "people"),
        o("Take care of myself", "Time spent on yourself comes first.", "taking care of yourself"),
      ],
    },
    19: {
      turn: 19,
      question: "What would the smallest version of starting that look like?",
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
        o("Nervous", "You started that day nervous.", "nervousness"),
        o("I can't really remember", "The memory has gone as far back as the time has.", "the memory having faded"),
      ],
    },
    21: {
      turn: 21,
      question: "If you could say one thing to yourself on that first day, what would it be?",
    },
  },
  checkpoint: [
    "From what you've told me, the biggest share looks like {g2}, the kind of exhaustion like {g4}, and what drains you most like {g8}.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "The weight of your day starts with {g2}, runs toward {g4}, and what drains you most is {g8}.",
      "Underneath the feeling that you mustn't rest sits {g11}, and you still get a little refill from {g13}.",
      "When work thoughts cut in, it's {g15}; as for who's noticed how you are, it's {g17}; and once your energy returns, you'd start with {g19}.",
    ],
    perspectiveLine: "I'll also keep the words you wrote to yourself on that first day, just as you wrote them.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
