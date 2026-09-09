import TransmissionHistoryDialog from "@/components/TransmissionHistoryDialog";
import {ReferenceDialog} from "@/components/App";
import {GameState} from "@/data/engine/state";
import DictionaryDialog from "@/components/DictionaryDialog";

type ReferencePanelProps = {
    state: GameState;
    referenceDialog: ReferenceDialog;
    onOpenHistory: () => void;
    onOpenDictionary: () => void;
    onCloseDialog: () => void;
    onStateChange: (state: GameState) => void;
}

export default function ReferencePanel({state, referenceDialog, onOpenHistory, onOpenDictionary, onCloseDialog, onStateChange}: ReferencePanelProps) {
    return (
        <section className="relative border border-base-300 p-4">
            <h2 className="font-title text-heading text-5xl font-bold">REFERENCE</h2>

            <div className="flex flex-col gap-2 mt-8">
                <button
                    className="btn btn-outline"
                    onClick={onOpenHistory}
                >
                    TRANSMISSION HISTORY
                </button>

                <button
                    className="btn btn-outline"
                    onClick={onOpenDictionary}
                >
                    DICTIONARY
                </button>
            </div>

            <TransmissionHistoryDialog
                state={state}
                open={referenceDialog === "history"}
                onClose={onCloseDialog}
            />

            <DictionaryDialog
                state={state}
                open={referenceDialog === "dictionary"}
                onClose={onCloseDialog}
                onStateChange={onStateChange}
            />
        </section>
    );
}