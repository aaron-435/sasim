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
        o("What happened today", "The day carries on without having closed yet.", "what happened today"),
        o("What I have to do tomorrow", "The schedule ahead unfolds first.", "what you have to do tomorrow"),
        o("Something from long ago", "A night when past times surface suddenly.", "something from long ago"),
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
        o("Restlessness", "Tilting toward not being able to stay still.", "restlessness"),
        o("Anxiety", "The heart has already gone ahead to what's coming.", "anxiety"),
        o("Resentment", "A side where an unsettled share remains.", "resentment"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Have nights like this been around a long time, or did they start recently?",
      questionNoQuote: "Have you had nights when it's hard to fall asleep before?",
      options: [
        o("For a long time", "These nights have been there a long time.", "nights that go way back"),
        o("They started lately", "These nights started lately.", "nights that started lately"),
      ],
    },
    6: {
      turn: 6,
      question: "When you think back to when your sleep started to come apart, what was there?",
      options: [
        o("My work changed", "It overlaps with a time when a big axis of life moved.", "a time when work changed"),
        o("A relationship changed", "A shift on the people side reached the night.", "a time when a relationship changed"),
        o("Nothing in particular", "The night was there before any reason.", "no trigger that comes to mind"),
      ],
    },
    7: {
      turn: 7,
      question: "Do you feel that night is the most \"your own\" time of the day?",
      options: [
        o("Yes, night is my time", "So night feels like the time that's most your own.", "night as your own time"),
        o("No, I don't feel that", "You don't feel night is your own time.", "not setting the night apart"),
      ],
    },
    8: {
      turn: 8,
      question: "Even after you lie down, what keeps you putting off sleep?",
      options: [
        o("Finishing leftover work", "Unfinished work follows you to the bed.", "finishing the leftover work"),
        o("Watching a bit more video", "Time on a screen stretches the night.", "watching videos"),
        o("Thoughts that start once I lie down", "Knowing in advance what opens once you lie down.", "the thoughts that start once you lie down"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "Does the tension of the day follow you into the night?",
      options: [
        o("Almost every day", "The line between day and night is thin.", "daytime tension that carries on every day"),
        o("Only on busy days", "A pattern that follows on days when things pile up.", "the tension of busy days"),
      ],
    },
    11: {
      turn: 11,
      question: "Are there times when you're tired but don't want to fall asleep?",
      options: [
        o("Yes, I hate wasting the night", "There are times you don't want to sleep because you hate wasting the night.", "not wanting to waste the night"),
        o("Yes, I hate the day ending", "There are times you don't want to sleep because you hate the day ending.", "not wanting the day to end"),
        o("No, not really", "So when you're tired, you don't usually fight sleep.", "no real pull to stay up"),
      ],
    },
    12: {
      turn: 12,
      question: "On days when you slept well, what kind of day was it?",
      options: [
        o("A day I used my body a lot", "The body has to wear out first before you lie down.", "a day of using the body a lot"),
        o("A day my heart felt light", "Sleep came on days when the heart's load shrank.", "a day when the heart felt light"),
        o("I can't recall a special day", "No clear marker has formed yet.", "no day that comes to mind"),
      ],
    },
    13: {
      turn: 13,
      question: "When do you feel a little more at ease, even now?",
      options: [
        o("After a warm wash", "After a warm wash, you feel a little more at ease.", "a warm wash"),
        o("Hearing quiet sounds", "When you hear quiet sounds, you feel a little more at ease.", "quiet sounds"),
        o("When the lights are turned low", "When the lights are turned low, you feel a little more at ease.", "low lighting"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "When sleep won't come, do you stay lying down or get up?",
      options: [
        o("I stay lying down and wait", "A way of holding your place and waiting.", "lying there waiting"),
        o("I get up and do something", "Stepping away from the spot and using the time.", "getting up and doing something"),
      ],
    },
    15: {
      turn: 15,
      question: "What do you use most often to fall asleep?",
      options: [
        o("I keep checking the clock", "When trying to sleep, you keep checking the clock.", "checking the clock"),
        o("I leave some sound on", "When trying to sleep, you leave some sound on.", "leaving some sound on"),
        o("I don't have a method yet", "You haven't settled on a way of falling asleep yet.", "no set method"),
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
      question: "Does anyone know your sleep has come apart?",
      options: [
        o("One or two people", "One or two people know your sleep has come apart.", "one or two people"),
        o("Just one person close to me", "Only one person close to you knows your sleep has come apart.", "one close person"),
        o("Nobody", "Nobody knows your sleep has come apart.", "nobody"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "On a night you fall asleep easily, what would change first?",
      options: [
        o("The time I lie down", "A picture that begins with when the day closes.", "the time you lie down"),
        o("What's in my head when I lie down", "A scene where the head goes quiet first once you lie down.", "what's in your head when you lie down"),
        o("How my body feels in the morning", "A picture that starts with the feeling when you open your eyes.", "how your body feels in the morning"),
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
    "From what you've told me, what plays first after the lights go out is {g2}, your heart then is close to {g4}, and what keeps you from sleep looks like {g8}.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "What plays first after the lights go out is {g2}, your heart then is close to {g4}, and what started your sleep coming apart was {g6}.",
      "The feeling that holds on to the night is {g11}, and what eases you a little even now is {g13}.",
      "When you're trying to sleep it's {g15}; as for who knows, it's {g17}; and an easier night starts with {g19}.",
    ],
    perspectiveLine: "I'll also keep the words you wrote for yourself tonight, just as you wrote them.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
