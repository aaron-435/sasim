/**
 * lib/choiceScripts/en/module2.ts — Module 2 (money script) fixed script, English. Adapted from ../module2.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE2_SCRIPT_EN: ModuleScript = {
  moduleId: "module2",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "In what kind of moment does that feeling rise the most?",
      questionNoQuote: "In what kind of moment does money stir you up the most?",
      options: [
        o("Right before paying", "It rises the most right before paying.", "the moment before paying"),
        o("When I check my balance", "It rises the most when you check your balance.", "checking the balance"),
        o("When I see how others spend", "It rises the most when you see how others spend.", "seeing how others spend"),
      ],
    },
    2: {
      turn: 2,
      question: "In that moment, what weighs on you the most?",
      options: [
        o("The amount I'm spending", "How much you spend is the first gate for your mind.", "the amount spent"),
        o("The balance left", "The number that's left is what catches your eye first.", "the balance left"),
        o("The version of me who spends", "The gaze on yourself spending comes before the money.", "the version of you who spends"),
      ],
    },
    3: {
      turn: 3,
      question: "Right before paying, which is closer to you?",
      options: [
        o("I pause and weigh it", "Right before paying, you're on the side that pauses and weighs it.", "pausing once"),
        o("I pay now, think later", "Right before paying, you're on the side that pays first and thinks later.", "paying first"),
      ],
    },
    4: {
      turn: 4,
      question: "After paying, what's closest to what stays with you?",
      options: [
        o("Relief", "There's a side that exhales after settling something.", "relief"),
        o("Guilt", "One corner of the mind gets heavy after spending.", "guilt"),
        o("A letdown", "A feeling of emptiness lingers even after filling something.", "a letdown"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Has this feeling about money been there for a long time, or has it grown lately?",
      questionNoQuote: "Has your feeling about money been there for a long time, or has it grown lately?",
      options: [
        o("It's been there a long time", "This feeling about money has been there for a long time.", "a long-standing feeling"),
        o("It's grown lately", "This feeling about money has grown lately.", "a feeling that has grown lately"),
      ],
    },
    6: {
      turn: 6,
      question: "When someone talks about their salary or their house, how does it sound to you?",
      options: [
        o("I compare myself", "Putting your own number next to theirs.", "comparing"),
        o("I just let it pass", "Leaving their story as their story.", "letting it pass"),
        o("Envy comes first", "Envy stands in the front row.", "envy"),
      ],
    },
    7: {
      turn: 7,
      question: "After comparing, which way does your mind lean?",
      options: [
        o("Impatient", "After comparing, it leans toward impatience.", "impatience"),
        o("Shrunken", "After comparing, it leans toward shrinking back.", "shrinking back"),
        o("No real change", "After comparing, nothing much changes in your mind.", "no real change"),
      ],
    },
    8: {
      turn: 8,
      question: "On a day when money worry grows, which way does your wallet move?",
      options: [
        o("It shuts tighter", "The bigger the worry, the tighter the lock.", "saving more"),
        o("It actually opens", "Working off the anxiety by spending.", "spending more instead"),
        o("No real change", "Worry and wallet move separately.", "nothing changing"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "What was the mood around money talk at home when you were young?",
      options: [
        o("It came up often", "A home where money talk reached the table.", "a topic that came up often"),
        o("It was quietly avoided", "A topic that had presence by not being spoken.", "a topic that was avoided"),
        o("I don't remember well", "Some scenes stay without being clear.", "something blurry in memory"),
      ],
    },
    11: {
      turn: 11,
      question: "If you filled in 'Money is, in the end, ___' right away, what comes to mind first?",
      options: [
        o("The safety that protects me", "So money is, in the end, the safety that protects you.", "safety"),
        o("The freedom that makes life easier", "So money is, in the end, the freedom that makes life easier.", "freedom"),
        o("The yardstick I'm measured by", "So money is, in the end, the yardstick you're measured by.", "a yardstick for yourself"),
      ],
    },
    12: {
      turn: 12,
      question: "If you had plenty of money, which way do you think your mind would go?",
      options: [
        o("I'd feel at ease", "A picture where the number turns into relief.", "a picture of feeling at ease"),
        o("Other worries would appear", "A picture where worry just changes places.", "a picture where other worries appear"),
        o("I'm not sure", "Maybe a picture you've never drawn.", "a picture not yet drawn"),
      ],
    },
    13: {
      turn: 13,
      question: "What have you kept steadily when it comes to money?",
      options: [
        o("Not spending more than needed", "Not spending more than needed is what you've kept steadily.", "not spending more than needed"),
        o("Saving steadily", "Saving steadily is what you've kept.", "saving steadily"),
        o("Giving to others", "Giving to others is what you've kept steadily.", "giving to others"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "When you talk about money, which way do you come across?",
      options: [
        o("I say it plainly", "You can bring up numbers as numbers.", "saying it plainly"),
        o("I go around it", "A way of circling so it doesn't touch directly.", "going around it"),
        o("I don't bring it up at all", "Putting the conversation itself away.", "not bringing it up"),
      ],
    },
    15: {
      turn: 15,
      question: "When money worry rises, what do you mostly do?",
      options: [
        o("Make a plan first", "When money worry rises, you mostly make a plan first.", "making a plan first"),
        o("Switch off and do something else", "When money worry rises, you mostly switch off and do something else.", "switching off and doing something else"),
        o("Tell someone", "When money worry rises, you mostly tell someone.", "telling someone"),
      ],
    },
    16: {
      turn: 16,
      question: "After that, what happens to the worry?",
      options: [
        o("It shrinks", "One action brings the worry down in size.", "it shrinking"),
        o("It's only put off for a while", "It changes place more than it disappears.", "it only being put off for a while"),
        o("It stays the same", "Whatever you do, the size doesn't change.", "it staying the same"),
      ],
    },
    17: {
      turn: 17,
      question: "Who is it most uncomfortable to talk about money with?",
      options: [
        o("Family", "Money talk with family is the most uncomfortable.", "family"),
        o("A partner or spouse", "Money talk with a partner or spouse is the most uncomfortable.", "a partner or spouse"),
        o("Friends or coworkers", "Money talk with friends or coworkers is the most uncomfortable.", "friends or coworkers"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "If you were at peace with money, what would your payday look like?",
      options: [
        o("A quick check, then move on", "A picture of glancing at one number calmly and moving on.", "a quick check and moving on"),
        o("A small gift to myself", "A picture where my own share comes first.", "a small gift to yourself"),
        o("Sharing with someone", "The scene of sharing with someone close comes first.", "sharing with someone"),
      ],
    },
    19: {
      turn: 19,
      question: "What's the smallest step toward that picture?",
      options: [
        o("Check my balance calmly", "The smallest step is checking the balance calmly.", "checking the balance calmly"),
        o("Talk money with one person", "The smallest step is talking money with one person.", "talking money with one person"),
        o("Spend a little on myself", "The smallest step is spending a little on yourself.", "spending a little on yourself"),
      ],
    },
    20: {
      turn: 20,
      question: "If someone who just got their first paycheck were in front of you, what would you feel first?",
      options: [
        o("Warmth", "Welcoming someone just starting out comes first.", "warmth"),
        o("Worry", "Someone whose rules haven't set yet stays on your mind.", "worry"),
        o("Envy", "You can see the first thrill up close.", "envy"),
      ],
    },
    21: {
      turn: 21,
      question: "Is there one thing about money you'd really want to tell that person?",
    },
  },
  checkpoint: [
    "From what you've told me, what weighs most around money looks like {g2}, after paying it's close to {g4}, and on days the worry grows {g8} comes first.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "What weighs most around money is {g2}, and after paying it's close to {g4}.",
      "In the blank of 'Money is, in the end, ___' you put {g11}, and what you've kept steadily is {g13}.",
      "When worry rises it's {g15}, the person it's most uncomfortable to talk to is {g17}, and you'd like to start with {g19}.",
    ],
    perspectiveLine: "I'll also keep what you'd tell the person with their first paycheck, in your own words.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
