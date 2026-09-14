import {GameState} from "@/data/engine/state";
import {useState} from "react";
import {
    addDictionaryEntry,
    removeDictionaryEntry,
    UserDictionary
} from "@/data/transmissions/dictionary";
import {SignalSeparator} from "@/data/transmissions/parser";

interface DictionaryDialogProps {
    state: GameState;
    open: boolean;
    onClose: () => void;
    onStateChange: (state: GameState) => void;
}

const SEPARATOR_OPTIONS: SignalSeparator[] = [
    "none",
    "space",
    "newline",
    "two-newlines"
];

function separatorLabel(separator: SignalSeparator): string {
    switch (separator) {
        case "none":
            return "NONE";
        case "space":
            return "SPACE";
        case "newline":
            return "NEWLINE";
        case "two-newlines":
            return "TWO NEWLINES";
    }
}

export default function DictionaryDialog({
                                             state,
                                             open,
                                             onClose,
                                             onStateChange
                                         }: DictionaryDialogProps) {
    const [signalInput, setSignalInput] = useState<string>("");
    const [editWordInput, setEditWordInput] = useState<string>("");
    const [addWordInput, setAddWordInput] = useState<string>("");
    const [editingSignal, setEditingSignal] = useState<number | null>(null);
    const [error, setError] = useState<string>("");

    if (!open) {
        return null;
    }

    const entries = Object.entries(state.dictionary);

    function handleAdd() {
        if (signalInput.trim() === "") {
            setError("SIGNAL CANNOT BE EMPTY");
            return;
        }

        const signal = Number(signalInput);

        if (!Number.isInteger(signal) || signal >= 0) {
            setError("SIGNAL MUST BE NEGATIVE");
            return;
        }

        const wordError = validateWord(
            addWordInput,
            state.dictionary
        );

        if (wordError) {
            setError(wordError);
            return;
        }

        const word = addWordInput.trim().toUpperCase();

        onStateChange({
            ...state,
            dictionary: addDictionaryEntry(
                state.dictionary,
                signal,
                word
            )
        });

        setSignalInput("");
        setAddWordInput("");
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

    function handleWordSubmit(signal: number) {
        const wordError = validateWord(
            editWordInput,
            state.dictionary,
            signal
        );

        if (wordError) {
            setError(wordError);
            return;
        }

        const word = editWordInput.trim().toUpperCase();

        onStateChange({
            ...state,
            dictionary: {
                ...state.dictionary,
                [signal]: {
                    ...state.dictionary[signal],
                    word
                }
            }
        });

        setEditingSignal(null);
        setEditWordInput("");
        setError("");
    }

    function handleSeparatorChange(
        signal: number,
        type: "prefix" | "postfix",
        value: SignalSeparator
    ) {
        const entry = state.dictionary[signal];

        if (!entry) {
            return;
        }

        onStateChange({
            ...state,
            dictionary: {
                ...state.dictionary,
                [signal]: {
                    ...entry,
                    [type]: value
                }
            }
        });
    }

    function handleClose() {
        setSignalInput("");
        setEditWordInput("");
        setEditingSignal(null);
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

            <form
                className="mt-6 flex gap-2"
                onSubmit={event => {
                    event.preventDefault();
                    handleAdd();
                }}
            >
                <input
                    className="input input-bordered bg-black w-1/3
                        [appearance:textfield]
                        [&::-webkit-inner-spin-button]:appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none"
                    type="text"
                    inputMode="numeric"
                    placeholder="SIGNAL"
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
                    value={addWordInput}
                    onChange={event => {
                        const value = event.target.value.toUpperCase();

                        if (
                            /^[A-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]*$/.test(value)
                        ) {
                            setAddWordInput(value);
                            setError("");
                        }
                    }}
                />

                <button
                    className="btn btn-primary border-none rounded-none bg-white text-2xl text-black w-1/10"
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

            <div className="mt-4 border border-base-300 h-84/100 overflow-y-auto">
                <table className="table-fixed w-full font-mono">
                    <colgroup>
                        <col className="w-[10%]" />
                        <col className="w-[25%]" />
                        <col className="w-[25%]" />
                        <col className="w-[25%]" />
                        <col className="w-[15%]" />
                    </colgroup>

                    <thead>
                    <tr className="border-b border-base-300">
                        <th className="font-title text-lg font-normal py-2 px-2 text-center">
                            SIGNAL
                        </th>

                        <th className="font-title text-lg font-normal py-2 px-2 text-center">
                            WORD
                        </th>

                        <th className="font-title text-lg font-normal py-2 px-2 text-center">
                            PREFIX
                        </th>

                        <th className="font-title text-lg font-normal py-2 px-2 text-center">
                            POSTFIX
                        </th>

                        <th className="py-2 px-2" />
                    </tr>
                    </thead>

                    <tbody>
                    {entries.map(([signal, entry]) => (
                        <tr key={signal}>
                            <td className="font-mono text-xl py-2 px-2 text-center">
                                {signal}
                            </td>

                            <td className="py-2 px-2">
                                <input
                                    className="input input-bordered bg-black w-full text-xl text-center font-mono px-0"
                                    maxLength={16}
                                    value={
                                        editingSignal === Number(signal)
                                            ? editWordInput
                                            : entry.word
                                    }
                                    onFocus={() => {
                                        setEditingSignal(Number(signal));
                                        setEditWordInput(entry.word);
                                    }}
                                    onChange={event => {
                                        setEditWordInput(
                                            event.target.value
                                                .replace(/\s/g, "")
                                                .toUpperCase()
                                        );
                                    }}
                                    onKeyDown={event => {
                                        if (event.key === "Enter") {
                                            event.currentTarget.blur();
                                        }
                                    }}
                                    onBlur={() => {
                                        if (editingSignal === Number(signal)) {
                                            handleWordSubmit(Number(signal));
                                        }
                                    }}
                                />
                            </td>

                            <td className="py-2 px-2">
                                <select
                                    className="select select-lg select-bordered bg-black w-full text-center appearance-none bg-none"
                                    value={entry.prefix}
                                    onChange={event =>
                                        handleSeparatorChange(
                                            Number(signal),
                                            "prefix",
                                            event.target.value as SignalSeparator
                                        )
                                    }
                                >
                                    {SEPARATOR_OPTIONS.map(option => (
                                        <option key={option} value={option}>
                                            {separatorLabel(option)}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            <td className="py-2 px-2">
                                <select
                                    className="select select-lg select-bordered bg-black w-full text-center appearance-none bg-none"
                                    value={entry.postfix}
                                    onChange={event =>
                                        handleSeparatorChange(
                                            Number(signal),
                                            "postfix",
                                            event.target.value as SignalSeparator
                                        )
                                    }
                                >
                                    {SEPARATOR_OPTIONS.map(option => (
                                        <option key={option} value={option}>
                                            {separatorLabel(option)}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            <td className="py-2 px-2 text-center">
                                <button
                                    className="btn btn-sm border-none rounded-none btn-error bg-white text-xl text-black w-24"
                                    onClick={() => handleDelete(Number(signal))}
                                >
                                    DELETE
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function validateWord(
    wordInput: string,
    dictionary: UserDictionary,
    signal?: number
): string | null {
    const word = wordInput.trim().toUpperCase();

    if (word === "") {
        return "WORD CANNOT BE EMPTY";
    }

    if (word.length > 16) {
        return "WORD CANNOT EXCEED 16 CHARACTERS";
    }

    if (
        Object.entries(dictionary).some(([entrySignal, entry]) =>
            entrySignal !== String(signal) &&
            entry.word === word
        )
    ) {
        return "WORD ALREADY EXISTS";
    }

    return null;
}