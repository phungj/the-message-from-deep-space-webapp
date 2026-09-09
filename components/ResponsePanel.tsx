import { useState } from "react";
import type { GameState } from "@/data/engine/state";
import { submitAnswer } from "@/data/engine/engine";

interface ResponsePanelProps {
    state: GameState;
    onStateChange: (state: GameState) => void;
    onHydrogenOffsetUnlocked: () => void;
}

export default function ResponsePanel({state, onStateChange, onHydrogenOffsetUnlocked}: ResponsePanelProps) {
    const [input, setInput] = useState("");

    async function handleSubmit() {
        const currentInput = input;
        const result = submitAnswer(state, input);

        if (result.type === "correct") {
            if (
                !state.hydrogenOffsetUnlocked &&
                result.nextState.hydrogenOffsetUnlocked
            ) {
                onHydrogenOffsetUnlocked();
            }

            setInput("NEW SIGNAL DETECTED!!")
            await new Promise(resolve => setTimeout(resolve, 1000));

            onStateChange(result.nextState);
            setInput("");
            return;
        }

        if (result.type === "wrong-answer") {
            setInput("NO SIGNAL CHANGE");
        } else {
            setInput(`PARSE ERROR: ${result.error}`)
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        setInput(currentInput)
    }

    return (
        <section className="border border-base-300 p-4">
            <h2 className="font-title text-heading text-5xl font-bold">
                Response
            </h2>

            <textarea
                value={input}
                onChange={event => setInput(event.target.value)}
                className="mt-8 block w-[23ch] h-80/100 resize-none overflow-y-auto font-mono mx-auto text-4xl border border-base-300 pl-2 pt-2"
                placeholder="Enter response"
            />

            <button
                onClick={handleSubmit}
                className="btn btn-primary mt-4 bg-white text-5xl text-black w-1/4"
            >
                Send
            </button>
        </section>
    );
}