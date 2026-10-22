/**
 * lib/choiceScripts/en/module9.ts — Module 9 (family of origin) fixed script, English. Adapted from ../module9.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE9_SCRIPT_EN: ModuleScript = {
  moduleId: "module9",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "After you talk with your family, how long does the feeling usually last?",
      options: [
        o("It settles in a few hours", "The feeling after talking with family settles in a few hours.", "a few hours"),
        o("A few days", "The feeling after talking with family lasts a few days.", "a few days"),
        o("It stays a long time", "The feeling after talking with family stays a long time.", "a long time"),
      ],
    },
    2: {
      turn: 2,
      question: "In those moments, which side are you mostly on?",
      options: [
        o("The talking side", "Leading the conversation is your share.", "the talking side"),
        o("The listening side", "Standing where the ears stay open.", "the listening side"),
        o("The one smoothing things in between", "A spot where you go back and forth coordinating.", "the one smoothing things in between"),
      ],
    },
    3: {
      turn: 3,
      question: "Who usually reaches out first with your family?",
      options: [
        o("I do", "With family, you're the one who reaches out first.", "you reaching out first"),
        o("They do", "Mostly your family reaches out first.", "family reaching out first"),
        o("About equally", "With family, contact goes about equally both ways.", "about equal give and take"),
      ],
    },
    4: {
      turn: 4,
      question: "After the conversation ends, what's closest to what's left?",
      options: [
        o("Guilt", "A sense of owing something stays in a corner of the heart.", "guilt"),
        o("Hurt", "Words that didn't reach stay behind.", "hurt"),
        o("A heavy sense of responsibility", "The share you carry feels heavy.", "a heavy sense of responsibility"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Has your place in your family now been the same since you were young, or did it come as you grew up?",
      options: [
        o("Since I was young", "Your place in the family now has been the same since you were young.", "since childhood"),
        o("It came as I grew up", "Your place in the family now came as you grew up.", "since growing up"),
      ],
    },
    6: {
      turn: 6,
      question: "If you named your place in the family, which is closest?",
      options: [
        o("The mediator", "The name of the one who stood between the fights.", "the mediator"),
        o("The protector", "The name attached to the one who keeps someone safe.", "the protector"),
        o("The quiet child", "You can see the time spent keeping your voice down.", "the quiet child"),
      ],
    },
    7: {
      turn: 7,
      question: "Did you take on that place yourself, or did you just end up in it?",
      options: [
        o("I took it on myself", "You took on that place yourself.", "taking it on yourself"),
        o("I just ended up in it", "You just ended up in that place.", "just ending up in it"),
      ],
    },
    8: {
      turn: 8,
      question: "When conflict came up in the family, where were you?",
      options: [
        o("In the middle, passing messages", "In the spot going between both sides' words.", "right in the middle"),
        o("Beside one person, listening", "Where one person's story gathers.", "beside one person"),
        o("A step away", "On the side watching from a distance.", "a step outside"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "Was the share you carried more about caretaking, or about receiving feelings?",
      options: [
        o("Housework and caretaking", "You've taken on a lot of the hands-on work.", "caretaking and housework"),
        o("Receiving their feelings", "You were in the role of receiving feelings for a long time.", "receiving feelings"),
        o("Neither", "Your share was somewhere else.", "a different share"),
      ],
    },
    11: {
      turn: 11,
      question: "How do you think it would feel to put that place down?",
      options: [
        o("The family would get shaky", "If you put the place down, the family might get shaky.", "a feeling that the family would get shaky"),
        o("I'd stop being needed", "If you put the place down, you might stop being needed.", "a feeling that you'd stop being needed"),
        o("I'm not sure", "You're not sure how it would feel to put it down.", "something you don't know yet"),
      ],
    },
    12: {
      turn: 12,
      question: "Of what you've done in that place, what has had meaning for you?",
      options: [
        o("Seeing my family at ease", "You drew strength from seeing the people beside you at ease.", "seeing your family at ease"),
        o("Feeling dependable", "A sense of having met the expectation remains.", "feeling dependable"),
        o("I've never felt it was meaningful", "The share came before any meaning could be attached.", "not feeling any meaning"),
      ],
    },
    13: {
      turn: 13,
      question: "Even now, when are you a little at ease with your family?",
      options: [
        o("When we eat together", "Eating together with family is a moment of ease.", "eating together"),
        o("When we're laughing and talking", "When laughing conversation goes back and forth, being with family is a little easier.", "laughing conversation"),
        o("Only with one person", "Only with one person in the family are you a little at ease.", "time with one particular person"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "Where is the distance between you and your family right now?",
      options: [
        o("Too close, and it's hard", "The closer it is, the wider the reach of your feelings.", "too close a distance"),
        o("Too far, and it's hard", "The distance that opened weighs on you.", "too far a distance"),
        o("It feels about right", "There's a sense that the current gap fits.", "a fitting distance"),
      ],
    },
    15: {
      turn: 15,
      question: "How do you adjust that distance?",
      options: [
        o("I adjust how often we contact", "To adjust the distance, you adjust how often you reach out.", "adjusting how often you contact"),
        o("I cut down the time we meet", "To adjust the distance, you cut down the time you meet.", "cutting down the time you meet"),
        o("It's hard to adjust", "Adjusting the distance with family is hard.", "finding it hard to adjust"),
      ],
    },
    16: {
      turn: 16,
      question: "Does that place in the family show up in other relationships too?",
      options: [
        o("With friends or a partner too", "You stand in the same place in front of close people.", "relationships with friends or a partner"),
        o("At work too", "The same shape shows up at work.", "work"),
        o("No, not elsewhere", "It's a place you use only within the family.", "only within the family"),
      ],
    },
    17: {
      turn: 17,
      question: "Has anyone recognized the you in that place?",
      options: [
        o("One or two people", "One or two people have recognized the you in that place.", "one or two people"),
        o("Someone in my family", "Someone in your family has recognized the you in that place.", "one person in the family"),
        o("Not yet", "No one has recognized the you in that place yet.", "no one yet"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "If you could be yourself while staying connected to your family, what would change first?",
      options: [
        o("How I stay in touch", "A picture where the way you stay connected changes first.", "how you stay in touch"),
        o("The share I carry", "A scene where the size of the share changes first.", "the share you carry"),
        o("The weight on my heart", "A picture where the weight on the heart eases first.", "the weight on your heart"),
      ],
    },
    19: {
      turn: 19,
      question: "What's the smallest version of starting that?",
      options: [
        o("Not answering right away", "The smallest start is not answering right away.", "not answering right away"),
        o("Choosing my own contact times", "The smallest start is choosing your own contact times.", "choosing your own contact times"),
        o("Handing off one task I carry", "The smallest start is handing off one task you carry.", "handing off one task you carry"),
      ],
    },
    20: {
      turn: 20,
      question: "What do you think I was like in that place as a child?",
      options: [
        o("Standing dignified", "A child standing like a grown-up.", "standing dignified"),
        o("Quietly watching moods", "You can see the time spent reading the air.", "quietly watching moods"),
        o("I can't remember well", "As far as the memory has moved, that's how much time has passed.", "a memory that has faded"),
      ],
    },
    21: {
      turn: 21,
      question: "Is there something the you of today would like to say to the you of back then?",
    },
  },
  checkpoint: [
    "From what you've told me, in family moments you stand as {g2}, what's left afterward is mostly {g4}, and when conflict came up you were {g8}.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "Your place in the family has been {g6}, when conflict came up you were {g8}, and what was left afterward was {g4}.",
      "Putting that place down brings {g11}, and still {g13} eases you a little.",
      "To adjust the distance you rely on {g15}, those who recognized you are {g17}, and if you could stay connected and be yourself, you'd like to start with {g19}.",
    ],
    perspectiveLine: "I'll also keep what you said to the child you were, in your own words.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
