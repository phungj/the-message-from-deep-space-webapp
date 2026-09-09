interface HydrogenLineOffsetUnlockDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function HydrogenLineOffsetUnlockDialog({
                                                 open,
                                                 onClose
                                             }: HydrogenLineOffsetUnlockDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-3xl border border-base-300 bg-black p-4">
                <h2 className="text-4xl font-bold">
                    Hydrogen Line Offset Unlocked
                </h2>

                <p className="mt-4 text-justify text-2xl">
                    Dr. Akers notices that all of the signals are relative to the hydrogen line.  Dr. Bautista updates the compiler so all signals are now offset by that value automatically.
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