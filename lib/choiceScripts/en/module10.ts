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
        o("Notifications", "Outside signals are what grab you first.", "notifications"),
        o("Other thoughts", "Your mind tends to wander off down other threads.", "other thoughts"),
        o("Something else I'd rather do", "Your attention slides toward the other task that draws you.", "another task that draws you"),
      ],
    },
    3: {
      turn: 3,
      question: "Which is harder: starting, or keeping going?",
      options: [
        o("Starting is harder", "Starting is the harder part for you.", "starting"),
        o("Keeping going is harder", "Keeping going is the harder part for you.", "keeping going"),
      ],
    },
    4: {
      turn: 4,
      question: "When your focus scatters, which of these is closest to what you feel?",
      options: [
        o("Frustration", "A blocked feeling comes up first.", "frustration"),
        o("Restless excitement", "An energy that speeds up rather than slows.", "restless excitement"),
        o("Self-blame", "The first words are aimed at yourself.", "self-blame"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Has something new you started ever fizzled out?",
      options: [
        o("Often", "Things you start have often fizzled out.", "something that happened often"),
        o("Sometimes", "Things you start sometimes fizzle out.", "something that happened sometimes"),
        o("Hardly ever", "Things you start hardly ever fizzle out.", "something that hardly ever happened"),
      ],
    },
    6: {
      turn: 6,
      question: "When things do fizzle out, at what point does it usually happen?",
      options: [
        o("After the first few days", "You tend to stop once the newness settles.", "after the first few days"),
        o("When I get stuck in the middle", "Somewhere in the middle, where the road narrows.", "when you get stuck in the middle"),
        o("Right before finishing", "Your steps slow once the end comes into view.", "right before finishing"),
      ],
    },
    7: {
      turn: 7,
      question: "Once you're absorbed, which is closer to you?",
      options: [
        o("I lose track of time", "Once absorbed, you lose track of time.", "losing track of time"),
        o("I come back to reality now and then", "Even when absorbed, you come back to reality now and then.", "coming back to reality now and then"),
      ],
    },
    8: {
      turn: 8,
      question: "If you had to pick one moment when your focus switches on, what would it be?",
      options: [
        o("When a deadline is close", "The closer the deadline, the faster you move.", "a deadline closing in"),
        o("When I learn something new", "Curiosity is what sets it going.", "learning something new"),
        o("When someone is watching", "Someone else's eyes act as the switch.", "someone watching"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "Have you ever been called someone who \"can't focus\"?",
      options: [
        o("Often", "Those words have piled up over time.", "words heard often"),
        o("Sometimes", "Heard only now and then, but remembered.", "words heard sometimes"),
        o("Never", "Those words have never been aimed at you.", "never having heard it"),
      ],
    },
    11: {
      turn: 11,
      question: "If you have heard words like that, how did they affect you?",
      options: [
        o("I started doubting myself", "Those words led you to doubt yourself.", "starting to doubt yourself"),
        o("I tried harder to hide it", "Those words made you try harder to hide it.", "trying harder to hide it"),
        o("It didn't change much", "Those words didn't change much for you.", "not much changing"),
      ],
    },
    12: {
      turn: 12,
      question: "Think of the last time you lost track of time. What were you doing?",
      options: [
        o("Making something with my hands", "The kind of absorption that settles into your hands.", "making something with your hands"),
        o("Something that used my head", "Time slipped away while you turned ideas over.", "using your head"),
        o("Digging into something I love", "Time spent digging deep into a topic you love.", "digging into something"),
      ],
    },
    13: {
      turn: 13,
      question: "How hard did that task feel at the time?",
      options: [
        o("Easy", "That task felt on the easy side.", "easy"),
        o("Just hard enough", "That task felt just hard enough.", "just hard enough"),
        o("Quite hard", "That task felt quite hard.", "quite hard"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "Is there a way you usually try to focus?",
      options: [
        o("I've tried several", "You've spent time trying one thing and then another.", "trying several things"),
        o("Not really", "You don't have a set way.", "nothing set"),
      ],
    },
    15: {
      turn: 15,
      question: "If you had to pick, which do you reach for most often?",
      options: [
        o("Change my seat or surroundings", "Changing your seat or surroundings is what you reach for most.", "changing your seat or surroundings"),
        o("Split time with a timer", "Splitting time with a timer is what you reach for most.", "splitting time with a timer"),
        o("I haven't settled on one yet", "You haven't settled on one method yet.", "still unsettled"),
      ],
    },
    16: {
      turn: 16,
      question: "How do you think the people around you see your way of focusing?",
      options: [
        o("As scattered", "That is how others read you from the outside.", "a view of you as scattered"),
        o("As absorbed", "The way you sink into things stands out to them.", "a view of you as absorbed"),
        o("I'm not sure", "How others see you is still unclear to you.", "a view you're unsure of"),
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
        o("How I start work", "The starting line is where things would shift first.", "how you start work"),
        o("Where I work", "The place you work is where things would shift first.", "where you work"),
        o("The breaks between tasks", "The gaps between tasks are where things would shift first.", "the breaks between tasks"),
      ],
    },
    19: {
      turn: 19,
      question: "What's the smallest first step you could take toward building your day that way?",
      options: [
        o("Turning off one notification", "Turning off one notification is the smallest start.", "turning off one notification"),
        o("Opening only one thing at a time", "Opening only one thing at a time is the smallest start.", "opening only one thing at a time"),
        o("Blocking out one slot for flow", "Blocking out one slot for flow is the smallest start.", "blocking out one slot for flow"),
      ],
    },
    20: {
      turn: 20,
      question: "When you were lost in something and time slipped by, what were you like?",
      options: [
        o("My eyes were shining", "A brightness that others could see.", "bright, shining eyes"),
        o("Very quiet", "Going deep without making a sound.", "being very quiet"),
        o("I can't remember well", "The scene has blurred, though the lost time stays with you.", "a blurry memory"),
      ],
    },
    21: {
      turn: 21,
      question: "If the you from those absorbed moments could say something to the you of today, what would it be?",
    },
  },
  checkpoint: [
    "From what you've told me, your attention gets pulled away first by {g2}, when it scatters, what you feel is closest to {g4}, and what switches your focus on is {g8}.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "Your attention gets pulled away first by {g2}, when it scatters, what you feel is closest to {g4}, and things tend to fizzle out {g6}.",
      "What those \"can't focus\" words did to you: {g11}. The last task that absorbed you felt {g13}.",
      "Your usual way of focusing is {g15}. When it comes to people whose rhythm fits yours, you have {g17}. The smallest start you picked is {g19}.",
    ],
    perspectiveLine: "I'll also keep the words you wrote from the you of those absorbed moments, just as you wrote them.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
