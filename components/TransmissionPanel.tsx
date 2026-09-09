import type { GameState } from "@/data/engine/state";
import { getDisplayedSignals } from "@/data/engine/engine";
import {formatSignals} from "@/data/transmissions/parser";

interface TransmissionPanelProps {
    state: GameState;
}

export default function TransmissionPanel({state}: TransmissionPanelProps) {
    const signals = getDisplayedSignals(state);

    return (
        <section className="border border-base-300 p-4">
            <h2 className="font-title text-heading text-5xl font-bold">
                Transmission {state.currentTransmissionID}
            </h2>

            <div className="text-left mt-8 w-[23ch] h-80/100 pl-2 pt-2 font-mono text-4xl overflow-y-auto whitespace-pre-wrap mx-auto border border-base-300">
                {formatSignals(signals)}
            </div>
        </section>
    );
}