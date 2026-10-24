/**
 * lib/choiceScripts/en/module12.ts — Module 12 (new beginnings) fixed script, English. Adapted from ../module12.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE12_SCRIPT_EN: ModuleScript = {
  moduleId: "module12",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "Which is closest to the big change in your life lately?",
      options: [
        o("Parting from someone", "The big change lately is parting from someone.", "parting from someone"),
        o("My work or school changed", "The big change lately is in your work or school.", "a change in work or school"),
        o("Where I live changed", "The big change lately is where you live.", "a change in where you live"),
      ],
    },
    2: {
      turn: 2,
      question: "Was that change something you chose?",
      options: [
        o("I chose it", "You set the direction yourself.", "one you chose"),
        o("It just happened to me", "You walked it in response to what arrived first.", "one that just happened to you"),
        o("A bit of both", "Some of it you chose and some of it simply arrived.", "partly chosen and partly arrived"),
      ],
    },
    3: {
      turn: 3,
      question: "When did that change feel most real?",
      options: [
        o("When I was sorting through my things", "The change felt most real while sorting through your things.", "sorting through your things"),
        o("When I felt the gap in my routine", "It felt most real when you felt the gap in your routine.", "feeling the gap in your routine"),
        o("The first day of my new everyday life", "It felt most real the first day of your new everyday life.", "the first day of the new everyday life"),
      ],
    },
    4: {
      turn: 4,
      question: "After the change, what was the first feeling to arrive?",
      options: [
        o("Lightness", "Lightness was the first to arrive.", "lightness"),
        o("Emptiness", "Emptiness was the first thing you felt.", "emptiness"),
        o("Being lost", "A blurring sense of direction came first.", "a sense of being lost"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "How often do thoughts of how things used to be come up?",
      options: [
        o("Often", "Thoughts of how things used to be come up often.", "thoughts that come often"),
        o("Sometimes", "Thoughts of how things used to be come up sometimes.", "thoughts that come sometimes"),
        o("They settled faster than I expected", "Thoughts of how things used to be settled faster than you expected.", "a feeling that settled quickly"),
      ],
    },
    6: {
      turn: 6,
      question: "If thoughts of the past do come up, when do they mostly come?",
      options: [
        o("When I'm alone", "They come up when a quiet gap opens.", "when you're alone"),
        o("When the new place feels off", "When the present feels off, the past comes to mind.", "when the new place feels off"),
        o("Out of nowhere", "They cut in without warning.", "out of nowhere, at no particular time"),
      ],
    },
    7: {
      turn: 7,
      question: "If those thoughts do come up, what happens?",
      options: [
        o("I stay with them a while", "When those thoughts come up, you stay with them a while.", "staying with them for a while"),
        o("I come back quickly", "Even when those thoughts come up, you come back to now quickly.", "coming back quickly"),
      ],
    },
    8: {
      turn: 8,
      question: "When you have empty time, how do you usually spend it?",
      options: [
        o("I fill it with something", "You fill the blank rather than leave it.", "filling it with something"),
        o("I just leave it empty", "You leave that time empty, as it is.", "just leaving it empty"),
        o("I look back at the past", "You unfold the traces of where you've come from, again.", "looking back at the past"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "Do you ever think, \"By now I should have settled in\"?",
      options: [
        o("Often", "There's always a baseline drawn in your head.", "a thought that comes often"),
        o("Sometimes", "Now and then that standard suddenly shows up.", "a thought that comes sometimes"),
        o("Hardly ever", "A yardstick for speed isn't a big part of your thinking.", "a thought that hardly ever comes"),
      ],
    },
    11: {
      turn: 11,
      question: "If there is a timeline for settling in, whose standard is it closer to?",
      options: [
        o("Mine", "That standard is closer to your own.", "your own"),
        o("Other people's", "That standard is closer to other people's.", "other people's"),
        o("A mix of both", "That standard mixes yours with other people's.", "a mix of yours and other people's"),
      ],
    },
    12: {
      turn: 12,
      question: "How did you get through other changes in the past?",
      options: [
        o("I adapted slowly", "You took time to get used to it.", "an experience of adapting slowly"),
        o("I adapted quickly", "You found your place quickly.", "an experience of adapting quickly"),
        o("I don't remember well", "The pace back then is blurry.", "a blurry memory"),
      ],
    },
    13: {
      turn: 13,
      question: "How does holding on to something that's over for a long time seem to you?",
      options: [
        o("Like it's weakness", "To you, holding on for so long looks like weakness.", "weakness"),
        o("Like it mattered that much", "To you, holding on for so long means it mattered that much.", "a sign it mattered that much"),
        o("I'm not sure", "You're not sure yet what holding on for so long means.", "something you can't name yet"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "How do you tend to spend time when what comes next isn't decided yet?",
      options: [
        o("I try to decide quickly", "You fill in the blank before it grows long.", "trying to decide quickly"),
        o("I pause for now", "You catch your breath before moving.", "pausing for now"),
        o("Day by day", "The time passes one day at a time.", "letting the days pass"),
      ],
    },
    15: {
      turn: 15,
      question: "In that undecided time, what do you do most often?",
      options: [
        o("Pack my schedule tight", "In that time, you pack your schedule tight.", "packing your schedule tight"),
        o("Go back to the old place", "In that time, you go back to the old place.", "going back to the old place"),
        o("Just watch", "In that time, what you do most often is just watch.", "just watching"),
      ],
    },
    16: {
      turn: 16,
      question: "Is there someone going through this period with you?",
      options: [
        o("Yes", "Someone beside you is walking the same road.", "having someone going through it with you"),
        o("Mostly I'm alone", "You're walking most of the road alone.", "mostly going through it alone"),
      ],
    },
    17: {
      turn: 17,
      question: "Where does the most strength come from right now?",
      options: [
        o("People who stayed at the old place", "Right now, people who stayed at the old place give you the most strength.", "people who stayed at the old place"),
        o("People I met at the new place", "Right now, people you met at the new place give you the most strength.", "people you met at the new place"),
        o("People going through the same period", "People going through the same period give you the most strength right now.", "people going through the same period"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "Has even one spot in the new place started to feel familiar?",
      options: [
        o("Yes", "There's one place your feet head to often.", "a familiar place has appeared"),
        o("One is starting to", "The strangeness is thinning, little by little.", "a familiar place is forming"),
        o("Not yet", "You're still in a guest-like stretch.", "no familiar place yet"),
      ],
    },
    19: {
      turn: 19,
      question: "What one scene would make you feel \"this is my place\"?",
      options: [
        o("A regular spot", "It would be enough to have one regular spot.", "one regular spot"),
        o("One comfortable person", "It would be enough to have one comfortable person.", "one comfortable person"),
        o("A routine of my own", "It would be enough to have one routine of your own.", "one routine of your own"),
      ],
    },
    20: {
      turn: 20,
      question: "On the day that scene appears, how do you picture yourself?",
      options: [
        o("Breathing a little easier", "Your chest opens up a little.", "breathing a little easier"),
        o("Still unfamiliar", "The strangeness stays close for a while.", "still feeling unfamiliar"),
        o("I can't picture it yet", "The outline of that picture is still blurry.", "a picture that's still blurry"),
      ],
    },
    21: {
      turn: 21,
      question: "Is there something you'd like to say to the you of the last day before the change?",
    },
  },
  checkpoint: [
    "From what you've told me, the change was {g2}, the first feeling after it was closest to {g4}, and when you have empty time, your habit is {g8}.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "The first feeling after the change was closest to {g4}, and thoughts of the past mostly come {g6}.",
      "The standard for how quickly you settle in is {g11}, and holding on to what ended seems to you like {g13}.",
      "In the undecided time, what you most often do is {g15}, your strength right now comes from {g17}, and you'd like to start putting down roots in the new place with {g19}.",
    ],
    perspectiveLine: "I'll also keep the words you wrote to the you of the last day before the change, just as you wrote them.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
