import { nouns, colors, adjectives, loremIpsumArr } from "./_words";

const loremWords = loremIpsumArr.join(" ").split(" ");
const wordbank = [...nouns, ...colors, ...adjectives, ...loremWords];

const _config = {
  minWords: _randomInt(1, 2),
  maxWords: _randomInt(2, 100),
  words: wordbank,
  totalWords: wordbank.length,
};

function _randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const _writeMessage = () => {
  const messageLength = _randomInt(1, 150);
  const words = [];
  for (let i = 0; i < messageLength; i++) {
    const currentLength = words.join(" ").length;
    if (currentLength > messageLength) {
      break;
    }
    let word = _config.words[_randomInt(0, _config.totalWords - 1)].toLowerCase();
    if (words.length === 0) {
      word = word[0].toUpperCase() + word.slice(1);
    }
    if (words.length > 0) {
      const lastWord = words[words.length - 1].toString();
      if (lastWord.includes(".")) {
        word = word[0].toUpperCase() + word.slice(1);
      }
    }
    words.push(word);
  }
  return words.join(" ");
};

const seedMessages = (n = _randomInt(0, 10)) => {
  const messages = [];
  for (let i = 0; i < n; i++) {
    const message = { text: _writeMessage() };
    messages.push(message);
  }
  return messages;
};

export default seedMessages;
