import { GameState } from "@/data/engine/state";
import {
    getTransmissionHistory,
    isTransmissionGroupCompleted
} from "@/data/engine/engine";
import { TRANSMISSION_GROUPS } from "@/data/transmissions/groups/groups";
import { useState } from "react";
import {
    formatSignals,
    prepareTransmissionSignals
} from "@/data/transmissions/parser";

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
    const [selectedTransmissionID, setSelectedTransmissionID] =
        useState<number>(-1);

    if (!open) {
        return null;
    }

    const history = getTransmissionHistory(state);

    const historyIDs = new Set(
        history.map(transmission => transmission.id)
    );

    const selectedTransmission = history.find(
        transmission => transmission.id === selectedTransmissionID
    );

    return (
        <div className="absolute inset-0 z-10 border border-base-300 bg-black p-4">
            {!selectedTransmission ? (
                <>
                    <div className="relative flex items-center justify-center">
                        <h3 className="font-title text-heading text-5xl font-bold">
                            TRANSMISSIONS
                        </h3>

                        <button
                            className="btn btn-sm border-none rounded-none absolute right-0"
                            onClick={handleClose}
                        >
                            ×
                        </button>
                    </div>

                    <div className="mt-4 overflow-y-auto h-85/100">
                        {TRANSMISSION_GROUPS.map((group, groupIndex) => {
                            const completed =
                                isTransmissionGroupCompleted(
                                    state,
                                    groupIndex
                                );

                            const completedTransmissions =
                                group.transmissions.filter(transmission =>
                                    historyIDs.has(transmission.id)
                                );

                            if (completedTransmissions.length === 0) {
                                return null;
                            }

                            return (
                                <div
                                    key={group.id}
                                    className="mt-6 first:mt-0"
                                >
                                    <h2 className="font-title text-heading text-3xl font-bold">
                                        GROUP {groupIndex + 1} - {completed ? group.name : "???"}
                                    </h2>

                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {completedTransmissions.map(
                                            transmission => (
                                                <button
                                                    key={transmission.id}
                                                    className="btn btn-outline border-none rounded-none size-16 bg-white text-black"
                                                    onClick={() =>
                                                        setSelectedTransmissionID(
                                                            transmission.id
                                                        )
                                                    }
                                                >
                                                    {transmission.id}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <>
                    <div className="relative flex items-center justify-center">
                        <h1 className="font-title text-5xl font-bold text-heading">
                            TRANSMISSION {selectedTransmission.id}
                        </h1>

                        <button
                            className="btn btn-sm border-none rounded-none absolute right-0"
                            onClick={handleClose}
                        >
                            ×
                        </button>
                    </div>

                    <div className="overflow-y-auto text-left mt-8 w-[23ch] h-80/100 pl-2 pt-2 font-mono text-4xl whitespace-pre-wrap mx-auto border border-base-300">
                        <h2 className="font-bold text-3xl text-center">
                            TRANSMISSION
                        </h2>

                        <p className="font-mono text-4xl text-left whitespace-pre-wrap mt-2">
                            {formatSignals(
                                prepareTransmissionSignals(
                                    selectedTransmission.signals,
                                    selectedTransmission,
                                    state
                                )
                            )}
                        </p>

                        <div className="mt-4">
                            <h2 className="font-bold text-3xl text-center">
                                ANSWER
                            </h2>

                            <p className="font-mono text-4xl whitespace-pre-wrap mt-2">
                                {formatSignals(
                                    prepareTransmissionSignals(
                                        selectedTransmission.expectedAnswer,
                                        selectedTransmission,
                                        state
                                    )
                                )}
                            </p>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary border-none mt-10 bg-white text-5xl text-black rounded-none w-1/4 h-1/20"
                        onClick={() => setSelectedTransmissionID(-1)}
                    >
                        BACK
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