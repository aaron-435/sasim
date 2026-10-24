/**
 * lib/choiceScripts/en/module8.ts — Module 8 (sleep · night arousal) fixed script, English. Adapted from ../module8.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE8_SCRIPT_EN: ModuleScript = {
  moduleId: "module8",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "When is it hardest to fall asleep?",
      options: [
        o("Right after the lights go out", "The hard moment comes right after the lights go out.", "right after the lights go out"),
        o("After tossing for a long while", "It gets hard after tossing for a long while.", "after a long while of tossing"),
        o("After waking in the night", "The hard moment comes after waking in the night.", "after waking in the night"),
      ],
    },
    2: {
      turn: 2,
      question: "If the first ten minutes after the lights go out played like a video, what would be on?",
      options: [
        o("What happened today", "The day hasn't closed yet.", "what happened today"),
        o("What I have to do tomorrow", "Tomorrow's schedule rolls out first.", "what you have to do tomorrow"),
        o("Something from long ago", "The past surfaces all at once.", "something from long ago"),
      ],
    },
    3: {
      turn: 3,
      question: "At that point, does your mind move first, or your body?",
      options: [
        o("My thoughts start racing", "At that point your thoughts move first.", "thoughts"),
        o("My body tenses first", "At that point your body tenses first.", "the body"),
      ],
    },
    4: {
      turn: 4,
      question: "In that moment, what's the feeling closest to?",
      options: [
        o("Restlessness", "Closer to not being able to stay still.", "restlessness"),
        o("Anxiety", "You're already leaning toward what's coming.", "anxiety"),
        o("Resentment", "Something unsettled is still left over.", "resentment"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Have nights like this been around a long time, or did they start recently?",
      questionNoQuote: "Have nights when it's hard to fall asleep been around a long time, or did they start recently?",
      options: [
        o("For a long time", "These nights have been there a long time.", "nights that go way back"),
        o("They started lately", "These nights started lately.", "nights that started lately"),
      ],
    },
    6: {
      turn: 6,
      question: "When you think back to when your sleep started to come apart, what was there?",
      options: [
        o("My work changed", "That lines up with a time when something big in your life shifted.", "a change at work"),
        o("A relationship changed", "A change in a relationship lines up with it.", "a change in a relationship"),
        o("Nothing in particular", "It began without a reason you can point to.", "nothing in particular"),
      ],
    },
    7: {
      turn: 7,
      question: "Do you feel that night is the most \"your own\" time of the day?",
      options: [
        o("Yes, night is my time", "Night is the time that feels most yours.", "night as your own time"),
        o("No, I don't feel that", "You don't feel night is your own time.", "not setting the night apart"),
      ],
    },
    8: {
      turn: 8,
      question: "If you put off sleep even after lying down, what usually keeps you up?",
      options: [
        o("Finishing leftover work", "Unfinished work follows you to the bed.", "finishing the leftover work"),
        o("Watching a bit more video", "Time on a screen stretches the night.", "watching videos"),
        o("Thoughts that start once I lie down", "You already know what opens up once you lie down.", "the thoughts that start once you lie down"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "Does the tension of the day follow you into the night?",
      options: [
        o("Almost every day", "The line between day and night is thin.", "daytime tension that carries on every day"),
        o("Only on busy days", "It follows you on the days when things pile up.", "the tension of busy days"),
      ],
    },
    11: {
      turn: 11,
      question: "Are there times when you're tired but don't want to fall asleep?",
      options: [
        o("Yes, I hate wasting the night", "There are times you don't want to sleep because you hate wasting the night.", "not wanting to waste the night"),
        o("Yes, I hate the day ending", "There are times you don't want to sleep because you hate the day ending.", "not wanting the day to end"),
        o("No, not really", "So when you're tired, you don't usually fight sleep.", "not really fighting sleep"),
      ],
    },
    12: {
      turn: 12,
      question: "On days when you slept well, what kind of day was it?",
      options: [
        o("A day I used my body a lot", "Your body gets worn out first, and then you lie down.", "a day of using the body a lot"),
        o("A day my heart felt light", "Sleep comes on days when the load on your mind is lighter.", "a day when the heart felt light"),
        o("I can't recall a special day", "There's no clear marker yet.", "no day that comes to mind"),
      ],
    },
    13: {
      turn: 13,
      question: "When do you feel a little more at ease, even now?",
      options: [
        o("After a warm shower", "After a warm shower, you feel a little more at ease.", "a warm shower"),
        o("Hearing quiet sounds", "When you hear quiet sounds, you feel a little more at ease.", "quiet sounds"),
        o("When the lights are turned low", "When the lights are turned low, you feel a little more at ease.", "low lighting"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "When sleep won't come, do you stay lying down or get up?",
      options: [
        o("I stay lying down and wait", "Holding your place and waiting it out.", "lying there waiting"),
        o("I get up and do something", "Getting up and putting the time to use.", "getting up and doing something"),
      ],
    },
    15: {
      turn: 15,
      question: "What do you usually do to try to fall asleep?",
      options: [
        o("I keep checking the clock", "When trying to sleep, you keep checking the clock.", "checking the clock"),
        o("I leave some sound on", "When trying to sleep, you leave some sound on.", "leaving some sound on"),
        o("I don't have a method yet", "You haven't settled on a way of falling asleep yet.", "having no set method yet"),
      ],
    },
    16: {
      turn: 16,
      question: "Do you live with someone, or alone?",
      options: [
        o("Alone", "An environment where the night is entirely yours.", "living alone"),
        o("With someone", "A night with someone's presence nearby.", "living with someone"),
      ],
    },
    17: {
      turn: 17,
      question: "Does anyone know about your trouble sleeping?",
      options: [
        o("One or two people", "One or two people know about your trouble sleeping.", "one or two people"),
        o("Just one person close to me", "Only one person close to you knows about your trouble sleeping.", "one close person"),
        o("Nobody", "Nobody knows about your trouble sleeping.", "nobody"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "If falling asleep came easily, what would change first?",
      options: [
        o("The time I lie down", "It starts with when the day closes.", "the time you lie down"),
        o("What's in my head when I lie down", "Your head goes quiet first once you lie down.", "what's in your head when you lie down"),
        o("How my body feels in the morning", "It starts with how you feel when you open your eyes.", "how your body feels in the morning"),
      ],
    },
    19: {
      turn: 19,
      question: "What's the smallest version of starting that?",
      options: [
        o("Lying down a little earlier", "The smallest start is lying down a little earlier.", "lying down a little earlier"),
        o("Dimming the lights one notch", "The smallest start is dimming the lights one notch.", "dimming the lights one notch"),
        o("Setting my to-dos down on paper", "The smallest start is setting your to-dos down on paper.", "setting your to-dos down on paper"),
      ],
    },
    20: {
      turn: 20,
      question: "Tonight, when you turn off the lights and lie down, what do you think you'll be like?",
      options: [
        o("Worn out", "Lying down carrying the day's weight.", "being worn out"),
        o("Full of thoughts", "It looks like a head that's still busy.", "being full of thoughts"),
        o("I hope to be at ease", "The scene you hope for came to mind first.", "hoping to be at ease"),
      ],
    },
    21: {
      turn: 21,
      question: "Is there something you'd like to tell yourself ahead of tonight?",
    },
  },
  checkpoint: [
    "From what you've told me, after the lights go out, {g2} plays first, what you feel then is closest to {g4}, and what keeps you putting off sleep is {g8}.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "After the lights go out, {g2} plays first, what you feel then is closest to {g4}, and when your sleep started to come apart, what was going on was {g6}.",
      "When you're tired, you described {g11}, and what eases you a little even now is {g13}.",
      "Your way of trying to sleep is {g15}. As for who knows about it, the answer is {g17}. And an easier night starts with {g19}.",
    ],
    perspectiveLine: "I'll also keep the words you wrote for yourself tonight, just as you wrote them.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
