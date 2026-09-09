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
            <div className="w-full max-w-lg border border-base-300 bg-black p-3">
                <h2 className="text-3xl font-bold">
                    Hydrogen Line Offset Unlocked
                </h2>

                <p className="mt-4">
                    All signals are now offset by the value of the hydrogen line.
                </p>

                <button
                    className="btn btn-outline btn-primary mt-4 bg-white text-2xl text-black w-1/4"
                    onClick={onClose}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}