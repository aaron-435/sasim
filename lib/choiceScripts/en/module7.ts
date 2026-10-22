/**
 * lib/choiceScripts/en/module7.ts — Module 7 (sensitivity · senses) fixed script, English. Adapted from ../module7.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE7_SCRIPT_EN: ModuleScript = {
  moduleId: "module7",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "Where do those sensations come on the strongest?",
      questionNoQuote: "Where do your sharp sensitivities come on the strongest?",
      options: [
        o("Crowded places", "The sensations come on strongest in crowded places.", "crowded places"),
        o("Where I work", "The sensations come on strongest in the space where you work.", "the workspace"),
        o("Even somewhere comfortable like home", "The sensations come on strong even in somewhere comfortable like home.", "comfortable places"),
      ],
    },
    2: {
      turn: 2,
      question: "At those times, what comes in first?",
      options: [
        o("Sound or light", "The stimulation coming through the senses is at the front.", "sound or light"),
        o("Smell or touch", "What touches the body comes first.", "smell or touch"),
        o("The mood of the people", "Reading the energy carried in the air first.", "the mood of the people"),
      ],
    },
    3: {
      turn: 3,
      question: "Where does that stimulation linger more?",
      options: [
        o("In my body", "The stimulation lingers more in the body.", "the body"),
        o("In my head", "The stimulation lingers more in the head.", "the head"),
      ],
    },
    4: {
      turn: 4,
      question: "As you near your limit, which is closer to how you show up?",
      options: [
        o("Overwhelmed and blank", "Input overflows and you switch off for a moment.", "going blank"),
        o("Irritable", "The reaction comes out edgy.", "irritability"),
        o("Wanting to get out of there", "The wish to put distance in front.", "the urge to get away"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Have these sensations been there since you were young, or did they appear as you grew up?",
      questionNoQuote: "Have your sharp sensitivities been there since you were young, or did they appear as you grew up?",
      options: [
        o("Since I was young", "These sensations have been there since you were young.", "a sensitivity from childhood"),
        o("They appeared as I grew up", "These sensations appeared as you grew up.", "a sensitivity that came with growing up"),
      ],
    },
    6: {
      turn: 6,
      question: "After a heavily stimulating day, how long does it take to feel like yourself again?",
      options: [
        o("A few hours", "You settle back relatively quickly.", "a few hours"),
        o("About a day", "It takes getting through a night to settle.", "about a day"),
        o("More than two days", "A body that needs plenty of time to recover.", "more than two days"),
      ],
    },
    7: {
      turn: 7,
      question: "In a hard setting, what do you usually do?",
      options: [
        o("I hold out to the end", "In a hard setting, you tend to hold out to the end.", "holding out to the end"),
        o("I slip out and rest", "In a hard setting, you tend to slip out and rest.", "slipping out to rest"),
      ],
    },
    8: {
      turn: 8,
      question: "What kind of day tends to bring on the overload?",
      options: [
        o("A day with lots of people", "It hits hard after a day full of people.", "a day with lots of people"),
        o("A day when work piled up", "It comes after a day when tasks overlapped.", "a day when work piled up"),
        o("A day when plans suddenly changed", "A day thrown off without warning tends to stay big.", "a day when plans suddenly changed"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "When was the first time you heard the word \"sensitive\"?",
      options: [
        o("When I was little", "You've lived with that word from early on.", "when you were little"),
        o("When I was grown", "It was something you heard after growing up.", "after you were grown"),
      ],
    },
    11: {
      turn: 11,
      question: "When you heard that, which way did your heart lean?",
      options: [
        o("It hurt", "It hurt when you heard it.", "hurt"),
        o("I just thought, maybe so", "You heard it and just thought, maybe so.", "taking it calmly"),
        o("I'm not sure", "You're not sure how you felt back then.", "something not yet put into words"),
      ],
    },
    12: {
      turn: 12,
      question: "What do you notice before other people do?",
      options: [
        o("Shifts in the mood", "Feeling the moment the air changes first.", "shifts in the mood"),
        o("People's expressions", "There's something you read from faces first.", "people's expressions"),
        o("Small details", "Small differences catch your eye first.", "small details"),
      ],
    },
    13: {
      turn: 13,
      question: "When do you feel recharged?",
      options: [
        o("When I'm in nature", "You get recharged when you're in nature.", "nature"),
        o("When I'm listening to music", "You get recharged when you're listening to music.", "music"),
        o("When I'm in a space of my own", "You get recharged when you're in a space of your own.", "a space of your own"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "When you know a setting will be too much, what do you do?",
      options: [
        o("I tend to avoid it ahead of time", "Picking out heavy settings in advance.", "avoiding it ahead of time"),
        o("I go and get through it", "Going and adjusting as you go.", "going and getting through it"),
      ],
    },
    15: {
      turn: 15,
      question: "What do you usually do to reduce the stimulation?",
      options: [
        o("Step away for a moment", "To reduce stimulation, you step away for a moment.", "stepping away for a moment"),
        o("Use something like earbuds", "To reduce stimulation, you use something like earbuds.", "using a tool"),
        o("Nothing in particular", "There's nothing in particular for reducing stimulation.", "no set method"),
      ],
    },
    16: {
      turn: 16,
      question: "Do you explain your sensitivities to the people around you?",
      options: [
        o("I explain if needed", "Putting it into words when it's needed.", "explaining when needed"),
        o("I've given up explaining", "There was a time you chose silence over explaining.", "giving up on explaining"),
      ],
    },
    17: {
      turn: 17,
      question: "Is there someone who understands your sensitivities?",
      options: [
        o("One or two people", "There are one or two people who understand your sensitivities.", "one or two people"),
        o("Only my family", "Only your family knows your sensitivities.", "only family"),
        o("Not yet", "Nobody understands your sensitivities yet.", "no one yet"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "If your day fit your sensitivities, what would change first?",
      options: [
        o("How the morning starts", "A picture where the way the day opens changes first.", "how the morning starts"),
        o("The space I stay in", "The shape of where you stay changes first.", "the space you stay in"),
        o("How I meet people", "How you meet people is the first thing that comes to mind.", "how you meet people"),
      ],
    },
    19: {
      turn: 19,
      question: "What's the smallest version of starting that?",
      options: [
        o("Turning the sound down a little", "The smallest start is turning the sound down a little.", "turning the sound down a little"),
        o("Setting aside time to rest alone", "The smallest start is setting aside time to rest alone.", "setting aside time to rest alone"),
        o("Leaving a little room in the schedule", "The smallest start is leaving a little room in the schedule.", "leaving a little room in the schedule"),
      ],
    },
    20: {
      turn: 20,
      question: "On the day that child first heard \"you're too sensitive,\" what do you think they looked like?",
      options: [
        o("Quiet", "A child who took the words in without a sound.", "being quiet"),
        o("Hurt", "A scene where you can see where the words landed.", "looking hurt"),
        o("I can't remember", "As far as the memory has moved, that's how much time has passed.", "a memory that has faded"),
      ],
    },
    21: {
      turn: 21,
      question: "Is there something the you of today would like to say to that child?",
    },
  },
  checkpoint: [
    "From what you've told me, what comes in first is {g2}, near your limit {g4} shows up, and overload comes after {g8}.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "What comes in first is {g2}, near your limit {g4} shows up, and coming back takes {g6}.",
      "In front of the word \"sensitive\" there was {g11}, and what refills you now is {g13}.",
      "In a hard setting it's {g15}, the people who understand are {g17}, and you'd like to start with {g19}.",
    ],
    perspectiveLine: "I'll also keep what you said to that child, in your own words.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
