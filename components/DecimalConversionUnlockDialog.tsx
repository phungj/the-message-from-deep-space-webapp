import {LogEntry} from "@/data/logs/log";

interface DecimalConversionUnlockDialogProps {
    open: boolean;
    entry: LogEntry;
    onClose: () => void;
}

export default function DecimalConversionUnlockDialog({
                                                           open,
                                                           entry,
                                                           onClose
                                                       }: DecimalConversionUnlockDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-3xl border border-base-300 bg-black p-4">
                <h2 className="text-4xl font-bold">
                    {entry.title}
                </h2>

                <p className="mt-4 text-justify text-2xl">
                    {entry.content}
                </p>

                <button
                    className="btn btn-outline border-none rounded-none btn-primary mt-5 bg-white text-2xl text-black w-1/6"
                    onClick={onClose}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}