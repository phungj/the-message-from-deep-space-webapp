import {GameState} from "@/data/engine/state";
import {useState} from "react";
import {addDictionaryEntry, removeDictionaryEntry} from "@/data/transmissions/dictionary";

interface DictionaryDialogProps {
    state: GameState;
    open: boolean;
    onClose: () => void;
    onStateChange: (state: GameState) => void;
}

export default function DictionaryDialog({
                                             state,
                                             open,
                                             onClose,
                                             onStateChange
                                         }: DictionaryDialogProps) {
    const [signalInput, setSignalInput] = useState<string>("");
    const [wordInput, setWordInput] = useState<string>("");
    const [error, setError] = useState<string>("");

    if (!open) {
        return null;
    }

    const entries = Object.entries(state.dictionary);
    const canAdd = signalInput.trim() !== "" && wordInput.trim() !== "";

    function handleAdd() {
        const signal = Number(signalInput);

        if (!Number.isInteger(signal) || signal >= 0) {
            setError("OFFSET MUST BE NEGATIVE");
            return;
        }

        const word = wordInput.trim().toUpperCase();

        if (word === "") {
            setError("WORD CANNOT BE EMPTY");
            return;
        }

        if (Object.values(state.dictionary).includes(word)) {
            setError("WORD ALREADY EXISTS");
            return;
        }

        onStateChange({
            ...state,
            dictionary: addDictionaryEntry(
                state.dictionary,
                signal,
                word
            )
        });

        setSignalInput("");
        setWordInput("");
        setError("");
    }

    function handleDelete(signal: number) {
        onStateChange({
            ...state,
            dictionary: removeDictionaryEntry(
                state.dictionary,
                signal
            )
        });
    }

    function handleClose() {
        setSignalInput("");
        setWordInput("");
        setError("");
        onClose();
    }

    return (
        <div className="absolute inset-0 z-10 bg-black p-4">
            <div className="relative flex items-center justify-center">
                <h3 className="font-title text-heading text-5xl font-bold">
                    DICTIONARY
                </h3>

                <button
                    className="btn btn-sm rounded-none border-none absolute right-0"
                    onClick={handleClose}
                >
                    ×
                </button>
            </div>

            <form className="mt-6 flex gap-2"
                  onSubmit={event => {
                      event.preventDefault();
                      handleAdd();
                  }}>
                <input
                    className="input input-bordered bg-black w-1/3
                        [appearance:textfield]
                        [&::-webkit-inner-spin-button]:appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none"
                    type="text"
                    inputMode="numeric"
                    placeholder="OFFSET"
                    value={signalInput}
                    onChange={event => {
                        const value = event.target.value;

                        if (/^-?\d*$/.test(value)) {
                            setSignalInput(value);
                            setError("");
                        }
                    }}
                />

                <input
                    className="input input-bordered bg-black flex-1 uppercase"
                    type="text"
                    placeholder="WORD"
                    maxLength={16}
                    value={wordInput}
                    onChange={event => {
                        const value = event.target.value.toUpperCase();

                        if (/^[A-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]*$/.test(value)) {
                            setWordInput(value);
                            setError("");
                        }
                    }}
                />

                <button
                    className="btn btn-primary border-none rounded-none bg-white text-2xl text-black w-1/10"
                    disabled={!canAdd}
                >
                    ADD
                </button>
            </form>

            <div className="mt-2 h-6">
                {error && (
                    <p className="text-error text-white text-2xl">
                        {error}
                    </p>
                )}
            </div>

            <div className="mt-4 flex flex-col gap-2 border border-base-300 overflow-y-auto h-84/100 pt-3 pr-4">
                {entries.map(([signal, word]) => (
                    <div
                        key={signal}
                        className="flex items-center gap-2 p-2"
                    >
                        <span className="font-mono text-xl w-1/3">
                            {signal}
                        </span>

                        <span className="text-xl flex-1">
                            {word}
                        </span>

                        <button
                            className="btn btn-sm border-none rounded-none btn-error bg-white text-2xl text-black w-1/6"
                            onClick={() => handleDelete(Number(signal))}
                        >
                            DELETE
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}