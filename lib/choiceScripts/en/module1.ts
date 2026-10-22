/**
 * lib/choiceScripts/en/module1.ts — Module 1 (attachment · relationship alarm) fixed script, English.
 * Adapted from ../module1.ts: same 22-turn shape and field map.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE1_SCRIPT_EN: ModuleScript = {
  moduleId: "module1",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "In what kind of moment does that feeling rise the most?",
      questionNoQuote: "In what kind of moment do your feelings get shaken the most in close relationships?",
      options: [
        o("When a reply comes late", "It rises the most when a reply comes late.", "a late reply"),
        o("When their tone changes", "It rises the most when their tone changes.", "a change in tone"),
        o("When plans change", "It rises the most when plans change.", "changed plans"),
      ],
    },
    2: {
      turn: 2,
      question: "When a reply doesn't come, what's the first story that shows up in your head?",
      options: [
        o("They must be busy", "You tend to look for the reason in their situation first.", "the thought that they must be busy"),
        o("Did I do something wrong?", "The first arrow points back at yourself.", "the thought that you did something wrong"),
        o("Nothing really comes up", "Not having a story attach is an answer too.", "nothing really coming up"),
      ],
    },
    3: {
      turn: 3,
      question: "In that moment, which way does your heart lean?",
      options: [
        o("I want to get closer", "In that moment, it leans toward wanting to get closer.", "the urge to move closer"),
        o("I need room to breathe", "In that moment, it leans toward needing room to breathe.", "the urge to keep some distance"),
      ],
    },
    4: {
      turn: 4,
      question: "If you named that feeling in one word, which is closest?",
      options: [
        o("Anxiety", "Worry grows in the quiet gaps.", "anxiety"),
        o("Hurt", "Your heart is caught on what it didn't receive.", "hurt"),
        o("Feeling stifled", "A sense of being held in place sits at the center.", "feeling stifled"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Has this pattern shown up in past relationships, or is this the first time?",
      questionNoQuote: "Has your heart been shaken like this in close relationships before, or is this the first time?",
      options: [
        o("Yes, in past ones too", "It's a pattern that showed up in past relationships too.", "a pattern from past relationships too"),
        o("This is the first time", "It's a pattern that first appeared in this relationship.", "a pattern that first appeared this time"),
      ],
    },
    6: {
      turn: 6,
      question: "When something hurts your feelings, what do you usually do?",
      options: [
        o("Put it into words", "You're on the side that puts feelings into words.", "putting it into words"),
        o("Act like I'm fine", "Keeping the surface calm and holding it inside.", "acting like you're fine"),
        o("Go quieter", "Making distance by speaking less.", "going quieter"),
      ],
    },
    7: {
      turn: 7,
      question: "After a fight, who usually reaches out first?",
      options: [
        o("I do", "After a fight, you tend to be the one who reaches out first.", "being the first to reach out"),
        o("I wait for them", "After a fight, you tend to wait for them to reach out first.", "waiting for them to reach out"),
      ],
    },
    8: {
      turn: 8,
      question: "After a fight, which is closest to how you act?",
      options: [
        o("Reach out to check", "Checking directly instead of leaving it uncertain.", "reaching out to check"),
        o("Take time to sort it out alone", "Making room to settle the feelings first.", "taking time alone to sort it out"),
        o("Stay busy", "Pressing down the heart's voice with routine.", "staying busy"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "Where do you feel that idea of what you have to be to be loved came from?",
      questionNoQuote: "If you have an idea of what you must be to be loved, where do you feel it came from?",
      options: [
        o("From a past relationship", "Closer to a rule learned in a past relationship.", "a past relationship"),
        o("From childhood", "A rule that reaches back to old memories.", "a memory from childhood"),
        o("I'm not sure", "Following you around without a clear source.", "something with no clear source"),
      ],
    },
    11: {
      turn: 11,
      question: "To be loved, I have to ___. What's the closest way to fill in the blank?",
      options: [
        o("be good to them", "So to be loved, you have to be good to them.", "the belief that you have to be good to them"),
        o("put up with things", "So to be loved, you have to put up with things.", "the belief that you have to put up with things"),
        o("be someone they need", "So to be loved, you have to be someone they need.", "the belief that you have to be someone they need"),
      ],
    },
    12: {
      turn: 12,
      question: "When someone is really good to you, which way does your heart go?",
      options: [
        o("I feel at ease", "Taking in what you're given as it is.", "feeling at ease"),
        o("I actually get anxious", "Your guard goes up first in a good moment.", "anxiety rising when things are good"),
        o("I want some distance", "Stepping back as things get closer.", "pulling back as things get closer"),
      ],
    },
    13: {
      turn: 13,
      question: "In what kind of moment do you feel loved?",
      options: [
        o("When I hear it said", "You feel loved when you hear it in words.", "hearing it in words"),
        o("When I see it in actions", "You feel loved when you see it in actions.", "seeing it in actions"),
        o("When they're simply beside me", "You feel loved when they're simply beside you.", "being together beside each other"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "When something is bothering you, what do you tend to do?",
      options: [
        o("Work through it alone", "Giving yourself time to digest it alone first.", "working through it alone"),
        o("Tell someone", "Easing it by sharing it in words.", "telling someone"),
        o("It depends", "Moving between the two paths depending on the situation.", "it depending on the moment"),
      ],
    },
    15: {
      turn: 15,
      question: "How do you mostly soothe that uneasy feeling?",
      options: [
        o("Take time alone", "Taking time alone is mostly how you soothe it.", "time alone"),
        o("Get reassurance from them", "Getting reassurance from them is mostly how you soothe it.", "reassurance from them"),
        o("Throw myself into something else", "Throwing yourself into something else is mostly how you soothe it.", "throwing yourself into something else"),
      ],
    },
    16: {
      turn: 16,
      question: "After you do that, what happens between you and them?",
      options: [
        o("We get closer", "The distance narrows once it's worked through.", "getting closer"),
        o("We drift apart", "The feeling settles but the distance widens.", "drifting apart"),
        o("It stays the same", "Not making a big change between you.", "staying the same"),
      ],
    },
    17: {
      turn: 17,
      question: "When I'm like that, what does the other person usually do?",
      options: [
        o("Come to me first", "At those times, they usually come to you first.", "coming to you first"),
        o("Wait for me", "At those times, they usually wait for you.", "waiting for you"),
        o("Pull back too", "At those times, they usually pull back as well.", "pulling back too"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "In a steady relationship, which moment of the day comes to mind first?",
      options: [
        o("An evening spent together", "A picture with time together at its center.", "an evening spent together"),
        o("Each keeping their own time", "The picture of keeping each other's space comes first.", "each keeping their own time"),
        o("Feeling fine even when we barely talk", "A scene where no news doesn't shake you.", "feeling fine even when you barely talk"),
      ],
    },
    19: {
      turn: 19,
      question: "What's the smallest step toward that picture?",
      options: [
        o("Say my hurt in one line", "Saying the hurt in one line is the smallest step.", "saying the hurt in one line"),
        o("Wait a day even if they reply late", "Waiting a day even if they reply late is the smallest step.", "waiting a day"),
        o("Ask how they are first", "Asking how they are first is the smallest step.", "asking how they are first"),
      ],
    },
    20: {
      turn: 20,
      question: "When I start my next love and my inner alarm goes off, what do you think I'll look like?",
      options: [
        o("Taking a moment to breathe", "A picture with a beat before moving.", "taking a moment to breathe"),
        o("Still checking first", "A picture where today's way carries on.", "checking first"),
        o("I can't picture it yet", "Not having an outline yet is an answer too.", "a picture that's still blurry"),
      ],
    },
    21: {
      turn: 21,
      question: "Is there one thing the you of today really wants to say to the you of that moment?",
    },
  },
  checkpoint: [
    "From what you've told me, when a reply doesn't come your mind goes to {g2}, your feeling then is close to {g4}, and after a fight {g8} comes first.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "When a reply doesn't come, your mind goes to {g2}, and the feeling then is close to {g4}.",
      "After a fight, {g8} comes first, and to be loved you carry {g11}.",
      "You feel loved through {g13}, when you're uneasy it's {g15}, what the other person does at those times is {g17}, and you'd like to start with {g19}.",
    ],
    perspectiveLine: "I'll also keep what you said to the you who starts the next love, in your own words.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
