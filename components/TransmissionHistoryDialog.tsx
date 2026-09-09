import {GameState} from "@/data/engine/state";
import {getTransmissionHistory} from "@/data/engine/engine";
import {useState} from "react";
import {formatSignals, prepareCurrentTransmissionSignals} from "@/data/transmissions/parser";

interface TransmissionHistoryDialogProps {
    state: GameState;
    open: boolean;
    onClose: () => void;
}

export default function TransmissionHistoryDialog({
                                                      state,
                                                      open,
                                                      onClose
                                                  }: TransmissionHistoryDialogProps) {
    const [selectedTransmissionID, setSelectedTransmissionID] = useState<number>(-1);


    if (!open) {
        return null;
    }

    const history = getTransmissionHistory(state);
    const selectedTransmission = history.find(
        transmission => transmission.id === selectedTransmissionID
    );

    return (
        <div className="absolute inset-0 z-10 border border-base-300 bg-black p-4">
            {!selectedTransmission ? (
                <>
                    <div className="relative flex items-center justify-center">
                        <h3 className="font-title text-3xl font-bold">
                            Transmission History
                        </h3>

                        <button
                            className="btn btn-sm absolute right-0"
                            onClick={handleClose}
                        >
                            ×
                        </button>
                    </div>

                    <div className="grid grid-cols-12 gap-1 mt-4">
                        {history.map(transmission => (
                            <button
                                key={transmission.id}
                                className="btn btn-outline aspect-square bg-white text-black"
                                onClick={() => setSelectedTransmissionID(transmission.id)}
                            >
                                {transmission.id}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="relative flex items-center justify-center">
                        <h1 className="font-title text-5xl font-bold text-heading">
                            Transmission {selectedTransmission.id}
                        </h1>

                        <button
                            className="btn btn-sm absolute right-0"
                            onClick={handleClose}
                        >
                            ×
                        </button>
                    </div>

                    <div className="overflow-y-auto text-left mt-8 w-[23ch] h-80/100 pl-2 pt-2 font-mono text-4xl whitespace-pre-wrap mx-auto border border-base-300">
                        <h2 className="font-bold text-3xl text-center">Transmission</h2>
                        <p className="font-mono text-4xl text-left whitespace-pre-wrap mt-2">
                            {formatSignals(
                                prepareCurrentTransmissionSignals(
                                    selectedTransmission.signals,
                                    selectedTransmission,
                                    state
                                )
                            )}
                        </p>

                        <div className="mt-4">
                            <h2 className="font-bold text-3xl text-center">Answer</h2>
                            <p className="font-mono text-4xl whitespace-pre-wrap mt-2">
                                {formatSignals(
                                    prepareCurrentTransmissionSignals(
                                        selectedTransmission.expectedAnswer,
                                        selectedTransmission,
                                        state
                                    )
                                )}
                            </p>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary mt-4 bg-white text-5xl text-black w-1/4"
                        onClick={() => setSelectedTransmissionID(-1)}
                    >
                        Back
                    </button>
                </>
            )}
        </div>
    );

    function handleClose() {
        setSelectedTransmissionID(-1);
        onClose();
    }
}