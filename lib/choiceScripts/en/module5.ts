/**
 * lib/choiceScripts/en/module5.ts — Module 5 (follow-through · procrastination) fixed script, English. Adapted from ../module5.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE5_SCRIPT_EN: ModuleScript = {
  moduleId: "module5",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "What kind of task does that side of you show up for most often?",
      questionNoQuote: "What kind of task do you put off most often?",
      options: [
        o("Paperwork and tidying chores", "It shows up most often with paperwork and tidying chores.", "chores"),
        o("Work or study that gets evaluated", "It shows up most often with work or study that gets evaluated.", "evaluated work"),
        o("Messages and replies to people", "It shows up most often with messages and replies to people.", "things to do with people"),
      ],
    },
    2: {
      turn: 2,
      question: "Right before you were about to open that task, what thought flashed by?",
      options: [
        o("I have to do it well", "The standard stands up before you even start.", "the thought \"I have to do it well\""),
        o("I don't want to do it now", "The not-wanting speaks up first.", "the thought \"I don't want to do this now\""),
        o("I don't know where to begin", "You stall at not finding the first square.", "the thought \"where do I even begin\""),
      ],
    },
    3: {
      turn: 3,
      question: "In that moment, what do you most want to avoid?",
      options: [
        o("The hassle and the boredom", "In that moment, what you most want to avoid is the hassle and boredom.", "the hassle"),
        o("It not going well", "In that moment, what you most want to avoid is it not going well.", "the worry that it won't go well"),
      ],
    },
    4: {
      turn: 4,
      question: "While you're putting it off, which is closer to your mind?",
      options: [
        o("Restlessness", "The clock keeps ticking in your ears.", "restlessness"),
        o("Guilt", "The undone task stays in a corner of the mind.", "guilt"),
        o("A moment of relief", "There's a side that exhales in the moment you put it off.", "a moment of relief"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Has this side of you been there a long time, or has it grown lately?",
      questionNoQuote: "Has your putting things off been there a long time, or has it grown lately?",
      options: [
        o("It's been there a long time", "This has been there for a long time.", "a long-standing habit"),
        o("It's grown lately", "This has grown lately.", "something that has grown lately"),
      ],
    },
    6: {
      turn: 6,
      question: "Where do you usually stall?",
      options: [
        o("At the start", "The first step is the heaviest.", "at the start"),
        o("Partway through", "You start, but stop in the middle.", "partway through"),
        o("Right before finishing", "Your hands stop almost at the end.", "right before finishing"),
      ],
    },
    7: {
      turn: 7,
      question: "When you have to choose, which way do you go?",
      options: [
        o("I choose for so long I miss it", "When you have to choose, you deliberate so long you miss it.", "choosing for too long"),
        o("I choose fast and regret it", "When you have to choose, you choose fast and then regret it.", "choosing fast"),
      ],
    },
    8: {
      turn: 8,
      question: "What blocks you from starting the hardest?",
      options: [
        o("Fear of getting it wrong", "Worry about mistakes sits on the brake.", "fear of getting it wrong"),
        o("Standards that are too high", "Your eye sits far ahead of your hand.", "high standards"),
        o("Too many options", "So many branches you can't hold on to one.", "too many options"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "Who is closer to having set that standard?",
      questionNoQuote: "Who is closer to having set the standard you feel you have to meet?",
      options: [
        o("I set it", "A measuring mark you made yourself.", "a standard you set"),
        o("I feel others expect it", "Outside expectations became the standard.", "others' expectations"),
      ],
    },
    11: {
      turn: 11,
      question: "When the result falls short of the standard, what bothers you most?",
      options: [
        o("Being judged as bad at the work", "Being judged as bad at the work is what bothers you most.", "the fear of the work being judged poorly"),
        o("Being judged as bad myself", "Being judged as bad yourself is what bothers you most.", "the fear of being judged poorly yourself"),
        o("I'm not sure yet", "What bothers you most isn't clear yet.", "something not yet put into words"),
      ],
    },
    12: {
      turn: 12,
      question: "Whose judgment do you care about the most?",
      options: [
        o("Someone above me", "The eyes of the person who hands out the work are the nearest.", "the judgment of someone above"),
        o("Someone close to me", "The eyes of someone beside you loom large.", "the judgment of someone close"),
        o("My own", "The gaze points inward more than outward.", "your own judgment"),
      ],
    },
    13: {
      turn: 13,
      question: "What was it that finally got you moving?",
      options: [
        o("A deadline closing in", "In the end, a deadline closing in got you moving.", "a deadline"),
        o("Someone beside me", "In the end, someone beside you got you moving.", "someone beside you"),
        o("Breaking it into tiny pieces", "In the end, breaking it into tiny pieces got you moving.", "breaking it into pieces"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "On a day you knock out something you'd been putting off, how do you feel?",
      options: [
        o("Relieved", "A day that feels lighter as much as you finished.", "relief"),
        o("Relieved, but still blaming myself", "Even finished, the lost time weighs on you.", "self-blame that stays despite relief"),
      ],
    },
    15: {
      turn: 15,
      question: "When put-off tasks pile up, what do you usually do?",
      options: [
        o("Do it all in one rush", "When they pile up, you usually do it all in one rush.", "doing it all in one rush"),
        o("Pick one and do it first", "When they pile up, you usually pick one and do it first.", "picking one to do first"),
        o("Turn to other tasks", "When they pile up, you usually turn to other tasks.", "turning to other tasks"),
      ],
    },
    16: {
      turn: 16,
      question: "Do you tell the people around you that you're putting something off?",
      options: [
        o("I tend to say so", "You're on the side that lets people know in advance.", "telling people in advance"),
        o("I try not to show it", "You tend to keep it from showing.", "hiding it"),
      ],
    },
    17: {
      turn: 17,
      question: "Does anyone know that you put things off?",
      options: [
        o("One or two close people", "One or two close people know you put things off.", "one or two close people"),
        o("Everyone around me", "The people around you all know you put things off.", "everyone around you"),
        o("Nobody", "Nobody knows you put things off.", "nobody"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "If that side of you showed up a bit more often, in what kind of task would you want it?",
      questionNoQuote: "If starting what you need to do showed up a bit more often, in what kind of task would you want it?",
      options: [
        o("In work or study", "The things you have to do come to mind first.", "work or study"),
        o("In things involving people", "Wanting it first in matters between people.", "things involving people"),
        o("In things for myself", "Wanting it first in things you spend on yourself.", "things for yourself"),
      ],
    },
    19: {
      turn: 19,
      question: "What's the smallest version of starting it?",
      options: [
        o("Opening it for just five minutes", "The start is opening it for just five minutes.", "opening it for five minutes"),
        o("Finishing just one piece first", "The start is finishing just one piece first.", "finishing just one piece first"),
        o("Telling someone about it", "The start is telling someone about it.", "telling someone about it"),
      ],
    },
    20: {
      turn: 20,
      question: "A year from now, if that task is already done, what do you look like?",
      options: [
        o("Relieved and light", "A picture of having set the load down.", "lightness"),
        o("Going about it as if it were nothing", "A picture where it's buried in an ordinary day.", "going about it as if it were nothing"),
        o("I can't picture it yet", "A picture that's still blurry is an answer too.", "a picture that's still blurry"),
      ],
    },
    21: {
      turn: 21,
      question: "If the you of a year from now could say one thing to the you of today, what would it be?",
    },
  },
  checkpoint: [
    "From what you've told me, right before starting, {g2} flashes by, your mind then is close to {g4}, and what blocks you the hardest is {g8}.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "Right before starting, {g2} flashes by, and underneath it what blocks you the hardest is {g8}.",
      "Beneath the standard sits {g11}, and what got you moving was {g13}.",
      "When things pile up it's {g15}; as for who knows, it's {g17}; and you'd like to start with {g19}.",
    ],
    perspectiveLine: "I'll also keep the words you wrote as the you of a year from now, just as you wrote them.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
