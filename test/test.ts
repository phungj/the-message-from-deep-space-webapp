import { INITIAL_GAME_STATE } from "@/data/engine/state";
import {
    getCurrentTransmission,
    getDisplayedSignals,
    submitAnswer
} from "@/data/engine/engine";

let state = INITIAL_GAME_STATE;

console.log("Initial state:", state);
console.log("Current transmission:", getCurrentTransmission(state));
console.log("Displayed signals:", getDisplayedSignals(state));

console.log("\n--- Answering transmission 1 ---");

let result = submitAnswer(state, "1420405752");

console.log("Result:", result);

if (result.type === "correct") {
    state = result.nextState;
}

console.log("New state:", state);
console.log("Current transmission:", getCurrentTransmission(state));
console.log("Displayed signals:", getDisplayedSignals(state));

console.log("\n--- Trying an invalid answer ---");

result = submitAnswer(state, "hello");

console.log("Result:", result);

console.log("\n--- Trying a wrong answer ---");

result = submitAnswer(state, "123");

console.log("Result:", result);

console.log("\n--- Answering correctly ---");

result = submitAnswer(state, "1420406008");

console.log("Result:", result);

if (result.type === "correct") {
    state = result.nextState;
}

console.log("New state:", state);
console.log("Current transmission:", getCurrentTransmission(state));
console.log("Displayed signals:", getDisplayedSignals(state));