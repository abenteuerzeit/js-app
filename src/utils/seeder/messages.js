import { nouns, colors, adjectives, loremIpsumArr } from "./_words";

const loremWords = loremIpsumArr.join(" ").split(" ");
const wordbank = [...nouns, ...colors, ...adjectives, ...loremWords];

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const Settings = {
  minWords: randomInt(1, 2),
  maxWords: randomInt(2, 100),
  totalWords: wordbank.length,
};

const _writeMessage = () => {
  const messageLength = randomInt(1, 150);
  const words = [];
  for (let i = 0; i < messageLength; i++) {
    const word = wordbank[randomInt(0, Settings.totalWords)];
    const currentLength = words.join(" ").length;
    if (currentLength < messageLength) {
      words.push(word);
    } else {
      break;
    }
  }
  return words.join(" ");

};

const seedMessages = (n = 10) => {
  const messages = [];
  for (let i = 0; i < n; i++) {
    const message = { text: _writeMessage() };
    messages.push(message);
  }
  return messages;
};

export default seedMessages;