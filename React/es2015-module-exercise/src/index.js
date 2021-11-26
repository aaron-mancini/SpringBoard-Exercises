
import fruits from "./foods";
import { choice, remove } from "./helpers";

let randFruit = choice(fruits);

console.log(`I'd like one ${randFruit}, please`);
console.log(`Here you go: ${randFruit}`);
console.log(`Delicious! May I have another?`);
let remain = remove(fruits, randFruit);
console.log(`I'm sorry, wer're all out. We have ${remain.length} left`)
