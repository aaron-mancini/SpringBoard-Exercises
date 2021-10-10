/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    const chains = new Map();
    let words = this.words;
    for (let i = 0; i < words.length; i++) {
      if (chains.has(words[i])) {
        let vals = chains.get(words[i]);
        if (words[i + 1] === undefined) {
          vals.push(null)
        } else {
          vals.push(words[i + 1]);
        }
        chains.set(words[i], vals);
      } else {
        if (words[i + 1] === undefined) {
          chains.set(words[i], [null])
        } else {
          chains.set(words[i], [words[i + 1]])
        }
      }
    }
    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let words = [];
    for (let i = 0; i < numWords; i++) {
      if (i === 0) {
        let keys = Array.from(this.chains.keys());
        words.push(keys[Math.floor(Math.random() * keys.length)])
      } else {
        let prevWord = words[i - 1];
        let nextWords = this.chains.get(prevWord);
        if (nextWords === undefined) {
          return words.join(" ");
        }
        words.push(nextWords[Math.floor(Math.random() * nextWords.length)])
      }
    }
    return words.join(" ");
  }
}

module.exports = {MarkovMachine};