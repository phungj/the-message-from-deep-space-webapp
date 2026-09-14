import {useEffect, useState} from "react";
import {GameState} from "@/data/engine/state";
import {getUnlockedLogEntries, LogEntry} from "@/data/logs/log";

interface LogDialogProps {
    state: GameState;
    open: boolean;
    onClose: () => void;
}

export default function LogDialog({
                                      state,
                                      open,
                                      onClose
                                  }: LogDialogProps) {
    const entries: LogEntry[] = getUnlockedLogEntries(state);
    const [selectedLogID, setSelectedLogID] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            setSelectedLogID(null);
        }
    }, [open]);

    if (!open) {
        return null;
    }

    const selectedEntry: LogEntry | undefined = entries.find(
        entry => entry.id === selectedLogID
    );

    if (selectedEntry) {
        return (
            <div className="absolute inset-0 z-10 bg-black p-4">
                <div className="relative flex items-center justify-center">
                    <h3 className="font-title text-heading text-5xl font-bold">
                        LOG
                    </h3>

                    <button
                        className="btn btn-sm rounded-none border-none absolute right-0"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="mt-8 mx-auto w-4/5 h-8/10 flex flex-col">
                    <div className="border border-base-300 font-mono text-3xl px-6 py-6 overflow-y-auto flex-1">
                        <h4 className="font-title text-3xl font-bold uppercase text-center">
                            {selectedEntry.title}
                        </h4>

                        <p className="mt-8 text-3xl text-left uppercase font-mono whitespace-pre-line">
                            {selectedEntry.content}
                        </p>
                    </div>

                    <button
                        className="btn btn-outline border-none rounded-none btn-primary mt-6 bg-white text-4xl text-black w-1/4 font-mono mx-auto"
                        onClick={() => setSelectedLogID(null)}
                    >
                        BACK
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 z-10 bg-black p-4">
            <div className="relative flex items-center justify-center">
                <h3 className="font-title text-heading text-5xl font-bold">
                    LOG
                </h3>

                <button
                    className="btn btn-sm rounded-none border-none absolute right-0"
                    onClick={onClose}
                >
                    ×
                </button>
            </div>

            <div className="flex flex-col gap-2 mt-8 items-center justify-center border border-base-300 mx-auto text-5xl font-mono w-[23ch] h-8/10 overflow-y-auto">
                {entries.map((entry: LogEntry) => (
                    <button
                        key={entry.id}
                        className="btn btn-outline border-none rounded-none btn-primary mt-5 bg-white text-4xl text-black w-4/5 font-mono"
                        onClick={() => setSelectedLogID(entry.id)}
                    >
                        {entry.title}
                    </button>
                ))}
            </div>
        </div>
    );
}