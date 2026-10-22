/**
 * lib/choiceScripts/en/module6.ts — Module 6 (anger · boundaries) fixed script, English. Adapted from ../module6.ts.
 */

import type { ModuleScript, ScriptOption } from "../types";

const o = (text: string, reaction: string, gist: string): ScriptOption => ({ text, reaction, gist });

export const MODULE6_SCRIPT_EN: ModuleScript = {
  moduleId: "module6",
  turns: {
    1: {
      turn: 1,
      quote: true,
      question: "In front of what kind of person does that anger rise most often?",
      questionNoQuote: "In front of what kind of person does anger rise most often?",
      options: [
        o("People at work", "Anger rises most often in front of people at work.", "people at work"),
        o("People close to me", "Anger rises most often in front of people close to you.", "people close to you"),
        o("People I've just met", "Anger rises most often in front of people you've just met.", "strangers"),
      ],
    },
    2: {
      turn: 2,
      question: "What kind of moment does anger most often rise in?",
      options: [
        o("Their tone or attitude", "Snagging more on how it's delivered than on what's said.", "the other person's tone and attitude"),
        o("A promise being broken", "The moment something agreed on goes off track stays big.", "a broken promise"),
        o("My words being brushed off", "The scene of words not landing sits up front.", "your words being brushed off"),
      ],
    },
    3: {
      turn: 3,
      question: "In that moment, does the anger rise right then or later?",
      options: [
        o("Right there on the spot", "The anger rises right on the spot.", "right on the spot"),
        o("Much later, after the fact", "The anger only rises much later, after the fact.", "later, after the fact"),
      ],
    },
    4: {
      turn: 4,
      question: "If you peeled back one layer of that anger, what would be underneath?",
      options: [
        o("A sense of unfairness", "The feeling that it wasn't fair sits at the bottom.", "a sense of unfairness"),
        o("Hurt", "The place where what you hoped for didn't come back.", "hurt"),
        o("Feeling disrespected", "A sense that your very being was handled lightly.", "feeling disrespected"),
      ],
    },
    5: {
      turn: 5,
      quote: true,
      question: "Has the same situation happened before, or is this the first time?",
      questionNoQuote: "Has a situation that stirs up anger happened before, or is this the first time?",
      options: [
        o("It's happened before", "The same situation has happened before.", "something that has repeated"),
        o("This is the first time", "This kind of situation is a first.", "something new to you"),
      ],
    },
    6: {
      turn: 6,
      question: "Where does that anger usually go?",
      options: [
        o("I swallow it", "Keeping it inside instead of letting it out.", "swallowing it"),
        o("It bursts out", "What piled up comes out all at once.", "it bursting out"),
        o("I keep chewing on it", "Rewinding the scene even after it's over.", "chewing on it"),
      ],
    },
    7: {
      turn: 7,
      question: "In which direction does the anger point?",
      options: [
        o("At the other person", "The anger points toward them.", "toward the other person"),
        o("At myself", "The anger points toward yourself.", "toward yourself"),
      ],
    },
    8: {
      turn: 8,
      question: "How long does it usually take for the anger to settle?",
      options: [
        o("A few hours", "It eases without going past a day.", "a few hours"),
        o("A day or two", "It stays with you for a day or two.", "a day or two"),
        o("More than a few days", "There have been times it lingered long.", "more than a few days"),
      ],
    },
    10: {
      turn: 10,
      quote: true,
      question: "Which is closer to what you think inwardly about getting angry?",
      options: [
        o("You shouldn't", "The thought that anger should be held down comes first.", "the thought that anger isn't okay"),
        o("It's fine when it's warranted", "You can show it if there's a reason.", "the thought that anger is fine when warranted"),
      ],
    },
    11: {
      turn: 11,
      question: "Which line was crossed in that moment?",
      options: [
        o("Respect", "The line that was crossed was respect.", "respect"),
        o("Fairness", "The line that was crossed was fairness.", "fairness"),
        o("My time or space", "The line that was crossed was your time or space.", "your time and space"),
      ],
    },
    12: {
      turn: 12,
      question: "When you were little, what was anger like at home?",
      options: [
        o("Okay to show", "An atmosphere where expressing it was allowed.", "something okay to show"),
        o("Something to put up with", "A setting where holding it down was familiar.", "something to put up with"),
        o("Something scary", "Tension ran high when anger was nearby.", "something scary"),
      ],
    },
    13: {
      turn: 13,
      question: "Is there anyone you can vent your anger to?",
      options: [
        o("Yes, someone easy to talk to", "There's an easy person to vent to.", "someone easy to vent to"),
        o("I'm a little selective", "When venting, you choose the person a bit.", "venting to a chosen few"),
        o("Not really anyone", "There's not really anyone to vent to.", "no one to vent to"),
      ],
    },
    14: {
      turn: 14,
      quote: true,
      question: "When anger rises, what's the first thing you do?",
      options: [
        o("Step away", "A way of creating physical distance.", "stepping away"),
        o("Stay still", "Waiting for it to pass without moving.", "staying still"),
        o("Say something right away", "Letting it out in words in the moment.", "speaking up right away"),
      ],
    },
    15: {
      turn: 15,
      question: "How do you mostly calm the anger down?",
      options: [
        o("Move my body", "To calm anger, you mostly move your body.", "moving your body"),
        o("Take time alone", "To calm anger, you mostly take time alone.", "taking time alone"),
        o("Talk to someone", "To calm anger, you mostly talk to someone.", "talking to someone"),
      ],
    },
    16: {
      turn: 16,
      question: "After the anger passes, what happens to that scene?",
      options: [
        o("I replay it", "You tend to replay the scene after it's over.", "replaying it"),
        o("I put it away", "Closing it quickly.", "putting it away"),
      ],
    },
    17: {
      turn: 17,
      question: "When you put your anger into words, how did the other person respond?",
      options: [
        o("They took it in", "When you said it, they took it in.", "they took it in"),
        o("It became a bigger fight", "When you said it, it turned into a bigger fight.", "it became a bigger fight"),
        o("I've hardly ever said it", "You've hardly ever put anger into words.", "you've hardly ever said it"),
      ],
    },
    18: {
      turn: 18,
      quote: true,
      question: "Thinking of times you held your ground even when angry, which is closest?",
      options: [
        o("I said what needed saying", "An experience of what needed saying coming out.", "saying what needed saying"),
        o("I kept the relationship", "On the side that didn't let go of the person.", "keeping the relationship"),
        o("I protected myself", "A memory of holding your own line.", "protecting yourself"),
      ],
    },
    19: {
      turn: 19,
      question: "If you drew a line in words, which sentence would be closest?",
      options: [
        o("\"This makes me uncomfortable\"", "If you drew a line, you'd say this makes you uncomfortable.", "saying it makes you uncomfortable"),
        o("\"Please stop for now\"", "If you drew a line, you'd ask them to stop for now.", "asking them to stop for now"),
        o("\"I'll talk about it later\"", "If you drew a line, you'd say you'll talk about it later.", "saying you'll talk about it later"),
      ],
    },
    20: {
      turn: 20,
      question: "The morning after the anger has settled, how does that matter look?",
      options: [
        o("Smaller", "Some things change size overnight.", "it looking smaller"),
        o("Still just as big", "It was something a night couldn't shrink.", "it still feeling as big"),
        o("I can hardly recall it", "Some days leave nothing clear.", "it staying faint"),
      ],
    },
    21: {
      turn: 21,
      question: "If the you of that next morning could say one thing to the you in the heat of that moment, what would it be?",
    },
  },
  checkpoint: [
    "From what you've told me, the anger rises with {g2}, underneath it there's {g4}, and it takes {g8} to settle.",
    "If any of that sounded off, tell me as we keep talking and I'll adjust. The detailed reading comes in your report.",
    "Shall we keep talking a little more, or wrap up here?",
  ],
  closing: {
    summary: [
      "Your anger rises with {g2}, underneath it there's {g4}, and it took {g8} to settle.",
      "The line it touched was {g11}, and still {g13} remains beside you.",
      "To calm down it's {g15}, when you put it into words: {g17}, and if you drew a line it would be closer to {g19}.",
    ],
    perspectiveLine: "I'll also keep what the you of the next morning said, in your own words.",
    finalLine: "Thank you for answering so thoughtfully. Now I'll bring together your saju, your quiz and everything you shared, and write your report.",
  },
};
