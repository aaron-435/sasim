/**
 * lib/choiceScripts/en/module4.ts — Module 4 (the mask · social self) fixed script, English. Adapted from ../module4.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE4_SCRIPT_EN: ModuleScript = {
  moduleId: "module4",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "Where does that side of you come out most often?",
      questionNoQuote: "In what kind of setting do you most often change yourself to fit the other person?",
      options: [
        o("At work or school", "It comes out most often at work or school.", "at work or school"),
        o("In groups or among friends", "It comes out most often in groups or among friends.", "in groups or among friends"),
        o("In front of family", "It comes out most often in front of family.", "in front of family"),
      ],
    },
    2: {
      turn: 2,
      question: "In that setting, what do you adjust the most?",
      options: [
        o("My expression", "The face moves to fit the situation first.", "your expression"),
        o("My tone", "Adjusting the warmth of your voice.", "your tone"),
        o("My opinion", "Putting your own thoughts a step back.", "your opinion"),
      ],
    },
    3: {
      turn: 3,
      question: "Right after that setting ends, which is closer to how your body feels?",
      options: [
        o("I want to rest right away", "Once it's over, your body wants to rest right away.", "a body that wants to rest right away"),
        o("Better than I'd expect", "Even right after, your body is better than you'd expect.", "a body that's fine"),
      ],
    },
    4: {
      turn: 4,
      question: "Right after it ends, which is closer to what stays in your heart?",
      options: [
        o("Fatigue", "The trace of spent energy sits at the center.", "fatigue"),
        o("Loneliness", "An empty space is left where the laughter passed.", "loneliness"),
        o("Relief", "Breathing out because it's over.", "relief"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Do you feel your self changes depending on who you meet?",
      options: [
        o("Quite a lot", "Your self changes quite a lot depending on who you meet.", "a self that changes a lot"),
        o("Only a little", "Even with different people, your self changes only a little.", "a self that changes only a little"),
      ],
    },
    6: {
      turn: 6,
      question: "Do you remember when you started adjusting like this?",
      options: [
        o("Since I was little", "A way that's been in your body for a long time.", "since childhood"),
        o("As I became an adult", "A habit that formed as your settings changed.", "since becoming an adult"),
        o("I'm not sure", "It has carried on without a clear starting point.", "something with no clear beginning"),
      ],
    },
    7: {
      turn: 7,
      question: "In front of whom does your mask get the thickest?",
      options: [
        o("People I've just met", "The mask is thickest in front of people you've just met.", "people you've just met"),
        o("People I've known a long time", "The mask is thickest in front of people you've known a long time.", "people you've known a long time"),
      ],
    },
    8: {
      turn: 8,
      question: "When a get-together gets scheduled, how does your mind react?",
      options: [
        o("I look forward to it", "Looking forward to the day comes first.", "looking forward to it"),
        o("I'm already tired", "Calculating that day's energy in advance.", "tiredness that arrives early"),
        o("I only know once the day comes", "Some feelings aren't decided in advance.", "a feeling that only shows up on the day"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "What do you feel would happen if you took the mask off?",
      options: [
        o("People would be disappointed", "The worry of falling short of expectations is in front.", "a worry about disappointing people"),
        o("People would drift away", "A worry that the distance in the relationship would change.", "a worry about drifting apart"),
        o("Probably nothing much", "A picture where taking it off changes little.", "the thought that nothing much would happen"),
      ],
    },
    11: {
      turn: 11,
      question: "Right now, what does the mask protect, in your sense?",
      options: [
        o("Myself", "The mask is protecting you right now.", "yourself"),
        o("The relationship", "The mask is protecting the relationship right now.", "the relationship"),
        o("My place", "The mask is protecting your place right now.", "your place"),
      ],
    },
    12: {
      turn: 12,
      question: "Which is closer to how you think you are without the mask?",
      options: [
        o("Much quieter", "Words and expressions turn down a notch.", "a much quieter self"),
        o("Much more frank", "Thoughts coming out unfiltered.", "a much more frank self"),
        o("Not much different", "The two sides are closer than you'd think.", "a self not much different"),
      ],
    },
    13: {
      turn: 13,
      question: "In front of someone you can be unmasked with, what changes?",
      options: [
        o("Words come easily", "In front of them, words come easily.", "words coming easily"),
        o("My face relaxes", "In front of them, your face relaxes.", "a relaxed face"),
        o("I don't have to do anything", "In front of them, you don't have to do anything.", "not having to do anything"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "On a day you hid how you really felt, how do you tend to recover?",
      options: [
        o("Time alone", "Recharging in the quiet.", "time alone"),
        o("One comfortable person", "One person who makes you feel at ease is the charger.", "one comfortable person"),
        o("Sleep or rest", "Setting things right by lying down.", "sleep and rest"),
      ],
    },
    15: {
      turn: 15,
      question: "Is that recovery time enough for you right now?",
      options: [
        o("It's enough", "The recovery time is enough right now.", "enough time"),
        o("It's never enough", "The recovery time is never enough right now.", "not enough time"),
        o("I'm not sure", "Not yet sure whether the recovery time is enough.", "time that's hard to gauge"),
      ],
    },
    16: {
      turn: 16,
      question: "On a day you're wearing the mask, how would it feel if someone noticed how you are?",
      options: [
        o("It'd be welcome", "There's a wish to be noticed.", "a wish to be noticed"),
        o("It'd feel like a burden", "A careful side toward being looked into.", "the burden of being looked into"),
        o("It'd feel like being found out", "Closer to the feeling of something hidden coming out.", "a feeling of being found out"),
      ],
    },
    17: {
      turn: 17,
      question: "Is there someone near you now that you can be unmasked with?",
      options: [
        o("One or two people", "There are one or two people near you you can be unmasked with.", "one or two people"),
        o("There was, but we drifted", "Someone like that was near you, but has drifted away.", "someone who used to be there"),
        o("Not yet", "There's no one yet near you to be unmasked with.", "no one yet"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "If you set the mask down a little, in which setting would you want to start?",
      options: [
        o("In front of the most comfortable person", "A wish to loosen up first in the safest setting.", "in front of the most comfortable person"),
        o("In front of family", "Wanting to put it down first with someone close.", "in front of family"),
        o("In writing or a journal", "A way that comes to mind: writing it out alone first.", "in writing or a journal"),
      ],
    },
    19: {
      turn: 19,
      question: "What's the smallest version of putting it down there?",
      options: [
        o("Fewer forced smiles", "At its smallest, it's cutting down on forced smiles.", "fewer forced smiles"),
        o("Saying one honest line", "At its smallest, it's saying one honest line.", "saying one honest line"),
        o("Saying I'm tired", "At its smallest, it's saying you're tired.", "saying you're tired"),
      ],
    },
    20: {
      turn: 20,
      question: "Someone next to you is smiling exactly the same way in the same setting. What do you think their face is like?",
      options: [
        o("Worn out", "A picture where the fatigue behind the smile catches your eye.", "a worn-out face"),
        o("At ease", "Someone for whom the setting comes naturally.", "an at-ease face"),
        o("I can't tell", "What's inside someone doesn't show on the outside.", "a face you can't read"),
      ],
    },
    21: {
      turn: 21,
      question: "Is there something you'd quietly want to say to that person?",
    },
  },
  checkpoint: [
    "From what you've told me, the mask gets thickest {g1}, what you adjust most is {g2}, after a gathering {g4} is what stays, and when plans are made {g8} comes first.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "The mask gets thickest {g1}, and after a gathering what stays is {g4}.",
      "What the mask protects is {g11}, and in front of someone you can be unmasked with, what changes is {g13}.",
      "On the days you hide, you recover through {g14}, the people beside you are {g17}, and you'd like to start with {g19}.",
    ],
    perspectiveLine: "I'll also keep what you said to the person next to you in that same setting, in your own words.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
