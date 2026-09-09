import TransmissionHistoryDialog from "@/components/TransmissionHistoryDialog";
import {ReferenceDialog} from "@/components/App";
import {GameState} from "@/data/engine/state";

type ReferencePanelProps = {
    state: GameState;
    referenceDialog: ReferenceDialog;
    onOpenHistory: () => void;
    onOpenDictionary: () => void;
    onCloseDialog: () => void;
}

export default function ReferencePanel({state, referenceDialog, onOpenHistory, onOpenDictionary, onCloseDialog}: ReferencePanelProps) {
    return (
        <section className="relative border border-base-300 p-4">
            <h2 className="font-title text-heading text-5xl font-bold">Reference</h2>

            <div className="flex flex-col gap-2 mt-8">
                <button
                    className="btn btn-outline"
                    onClick={onOpenHistory}
                >
                    Transmission History
                </button>

                <button
                    className="btn btn-outline"
                    onClick={onOpenDictionary}
                >
                    Dictionary
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
            />
        </section>
    );
}