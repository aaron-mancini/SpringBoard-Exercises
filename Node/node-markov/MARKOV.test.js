const { MarkovMachine } = require("./markov")

describe("test make chains function", function() {

    test("function should return correct map", function() {
        let chain = new Map();
        chain.set("this", ["is"]);
        chain.set("is", ["a"]);
        chain.set("a", ["test"]);
        chain.set("test", [null])
        let test = new MarkovMachine("this is a test");
        expect(test).toBeInstanceOf(MarkovMachine);
        expect(test.chains).toEqual(chain);
    })
    test("map length should be consistent with duplicate words", function() {
        let test = new MarkovMachine("this this is is a a test test");
        let mapLength = Array.from(test.chains.keys());
        expect(mapLength.length).toEqual(4);
    })
});
