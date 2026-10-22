/**
 * lib/choiceScripts/en/module10.ts — Module 10 (focus · flow) fixed script, English. Adapted from ../module10.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE10_SCRIPT_EN: ModuleScript = {
  moduleId: "module10",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "When does your focus mostly scatter?",
      options: [
        o("While I'm working", "Your focus mostly scatters while you're working.", "while working"),
        o("When studying or reading", "Your focus scatters when you're studying or reading.", "studying or reading"),
        o("When I'm with people", "Your focus scatters when you're with people.", "when with people"),
      ],
    },
    2: {
      turn: 2,
      question: "At those times, what pulls your attention away first?",
      options: [
        o("Notifications", "Signals from outside are at the front.", "notifications"),
        o("Other thoughts", "You tend to drift off into other branches in your head.", "other thoughts"),
        o("Something else I'd rather do", "Attention moves toward the other task that draws you.", "another task that draws you"),
      ],
    },
    3: {
      turn: 3,
      question: "Which is harder: starting, or keeping going?",
      options: [
        o("Starting is harder", "The starting side is harder.", "starting"),
        o("Keeping going is harder", "The keeping-going side is harder.", "keeping going"),
      ],
    },
    4: {
      turn: 4,
      question: "When your focus scatters, which is closer to your mind?",
      options: [
        o("Frustration", "A feeling of being blocked sits in front.", "frustration"),
        o("Restless excitement", "Energy rising upward.", "restless excitement"),
        o("Self-blame", "Words aimed at yourself come out first.", "self-blame"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Has something new you started ever fizzled out?",
      options: [
        o("Often", "You're on the side where started things have often fizzled out.", "something that happened often"),
        o("Sometimes", "You're on the side where started things sometimes fizzle out.", "something that happened sometimes"),
        o("Hardly ever", "You're on the side where started things hardly ever fizzle out.", "something that hardly ever happened"),
      ],
    },
    6: {
      turn: 6,
      question: "At what point does it usually fizzle?",
      options: [
        o("After the first few days", "You stop around when the newness settles.", "after the first few days"),
        o("When I get stuck in the middle", "The point where the road narrows in the middle.", "when you get stuck in the middle"),
        o("Right before finishing", "Your steps slow where the end comes into view.", "right before finishing"),
      ],
    },
    7: {
      turn: 7,
      question: "Once you're absorbed, which is closer to you?",
      options: [
        o("I lose track of time", "Once absorbed, you lose track of time.", "so deeply you lose track of time"),
        o("I come back to reality now and then", "Even when absorbed, you come back to reality now and then.", "moving back and forth with reality"),
      ],
    },
    8: {
      turn: 8,
      question: "If you picked one moment when your focus switches on, what is it?",
      options: [
        o("When a deadline is close", "The closer the time limit, the more speed picks up.", "a deadline ahead"),
        o("When I learn something new", "There's a moment when curiosity catches fire.", "the moment you learn something new"),
        o("When someone is watching", "The gaze beside you acts as a switch.", "someone's gaze"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "Have you ever been called someone who \"can't focus\"?",
      options: [
        o("Often", "Words heard many times have piled up.", "words heard often"),
        o("Sometimes", "Heard only now and then, but remembered.", "words heard sometimes"),
        o("Never", "You were on the side far from such words.", "never having heard it"),
      ],
    },
    11: {
      turn: 11,
      question: "How did words like that change you?",
      options: [
        o("I started doubting myself", "Hearing that made you doubt yourself.", "doubt about yourself"),
        o("I tried harder to hide it", "Hearing that made you try harder to hide it.", "trying harder to hide it"),
        o("It didn't change much", "Even after hearing that, not much changed.", "no change"),
      ],
    },
    12: {
      turn: 12,
      question: "What was the last thing you did where you lost track of time?",
      options: [
        o("Making something with my hands", "Absorption that settles in the fingertips.", "making something with your hands"),
        o("Something that used my head", "Time disappeared while you turned thoughts over.", "using your head"),
        o("Digging into something I love", "Time spent digging deep into a topic that draws you.", "digging into something"),
      ],
    },
    13: {
      turn: 13,
      question: "How hard was that task at the time?",
      options: [
        o("Easy", "The task was on the easy side.", "an easy task"),
        o("Just hard enough", "The task was just hard enough.", "a task that's just hard enough"),
        o("Quite hard", "The task was on the quite hard side.", "a quite hard task"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "Is there a way you usually try to focus?",
      options: [
        o("I've tried several", "There's been time spent trying one thing and another.", "trying several things"),
        o("Not really", "You're on the side with no set way.", "nothing set"),
      ],
    },
    15: {
      turn: 15,
      question: "Of those, which do you use most often?",
      options: [
        o("Change my seat or surroundings", "Changing your seat or surroundings is what you use most.", "changing seat or surroundings"),
        o("Split time with a timer", "Splitting time with a timer is what you use most.", "splitting time with a timer"),
        o("I haven't settled on one yet", "You haven't settled on a method you use often.", "no set method"),
      ],
    },
    16: {
      turn: 16,
      question: "How do you think the people around you see your way of focusing?",
      options: [
        o("As scattered", "There's a reading of you from the outside.", "a view of you as scattered"),
        o("As absorbed", "The way you sink in stands out.", "a view of you as absorbed"),
        o("I'm not sure", "How you look to others is still blurry.", "a view you're unsure of"),
      ],
    },
    17: {
      turn: 17,
      question: "Is there someone near you whose rhythm fits yours well?",
      options: [
        o("One or two people", "There are one or two people near you whose rhythm fits well.", "one or two people"),
        o("I run into them now and then", "You run into people whose rhythm fits well now and then.", "someone you run into now and then"),
        o("Not yet", "Nobody whose rhythm fits well is near you yet.", "no one yet"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "If your day were built around how your attention works, what would change first?",
      options: [
        o("How I start work", "A picture where the shape of the starting line changes first.", "how you start work"),
        o("Where I work", "A scene where the place you stay changes first.", "where you work"),
        o("The breaks between tasks", "The length and use of the gaps change first.", "the breaks between tasks"),
      ],
    },
    19: {
      turn: 19,
      question: "What's the smallest version of starting that?",
      options: [
        o("Turning off one notification", "Turning off one notification is the smallest start.", "turning off one notification"),
        o("Opening only one thing at a time", "Opening only one thing at a time is the smallest start.", "opening only one thing at a time"),
        o("Blocking out one slot for flow", "Blocking out one slot for flow is the smallest start.", "blocking out one slot for flow"),
      ],
    },
    20: {
      turn: 20,
      question: "When you were lost in something and time slipped by, what was I like?",
      options: [
        o("My eyes were shining", "The light was on enough to see.", "bright, shining eyes"),
        o("Very quiet", "Going deep without a sound.", "being very quiet"),
        o("I can't remember well", "The scene has blurred, but the time remains.", "a blurry memory"),
      ],
    },
    21: {
      turn: 21,
      question: "If the you of back then could say something to the scattered you of now, what would it be?",
    },
  },
  checkpoint: [
    "From what you've told me, what pulls your attention first is {g2}, when it scatters your mind is close to {g4}, and your focus switches on at {g8}.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "What pulls your attention first is {g2}, when it scatters your mind is close to {g4}, and the point where things fizzle is {g6}.",
      "In front of the words \"can't focus\" there was {g11}, and the condition for flow is {g13}.",
      "To focus you rely on {g15}, the people whose rhythm fits are {g17}, and a start that fits your way begins with {g19}.",
    ],
    perspectiveLine: "I'll also keep what the you of back then said, in your own words.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
