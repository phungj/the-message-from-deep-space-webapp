"use client";

import ReferencePanel from "@/components/ReferencePanel";
import TransmissionPanel from "@/components/TransmissionPanel";
import ResponsePanel, {ResponsePanelHandle} from "@/components/ResponsePanel";
import {GameState, INITIAL_GAME_STATE} from "@/data/engine/state";
import {useEffect, useRef, useState} from "react";
import HydrogenLineOffsetUnlockDialog from "@/components/HydrogenLineOffsetUnlockDialog";
import DecimalConversionUnlockDialog from "@/components/DecimalConversionUnlockDialog";
import GameCompletionDialog from "@/components/GameCompletionDialog";
import {loadGame, saveGame} from "@/data/save";
import TitleDialog from "@/components/TitleDialog";
import {
    getLogEntry,
    HYDROGEN_OFFSET_LOG_ID,
    DECIMAL_CONVERSION_LOG_ID,
    LogEntry
} from "@/data/logs/log";
import {addUndefinedSignalsForCurrentTransmission} from "@/data/engine/engine";

export type ReferenceDialog = "history" | "dictionary" | "log" | "";

export default function App() {
    const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
    const [referenceDialog, setReferenceDialog] = useState<ReferenceDialog>("");

    const [hydrogenUnlockEntry, setHydrogenUnlockEntry] =
        useState<LogEntry | null>(null);

    const [decimalConversionUnlockEntry, setDecimalConversionUnlockEntry] =
        useState<LogEntry | null>(null);

    const [showCompletion, setShowCompletion] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    const responsePanelRef = useRef<ResponsePanelHandle>(null);

    useEffect(() => {
        const savedState = loadGame();

        if (savedState !== null) {
            setGameState(
                addUndefinedSignalsForCurrentTransmission(savedState)
            );
        }

        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated) {
            saveGame(gameState);
        }
    }, [gameState, hydrated]);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.ctrlKey && event.key.toLowerCase() === "e") {
                event.preventDefault();
                responsePanelRef.current?.submit();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    if (!hydrated) {
        return null;
    }

    return (
        <div className="text-center h-screen">
            <h1 className="font-title text-heading text-5xl font-bold mt-3">
                THE MESSAGE FROM DEEP SPACE
            </h1>

            <div className="grid grid-cols-3 gap-4 p-6 h-9/10">
                <ReferencePanel
                    state={gameState}
                    referenceDialog={referenceDialog}
                    onOpenHistory={() => setReferenceDialog("history")}
                    onOpenDictionary={() => setReferenceDialog("dictionary")}
                    onOpenLog={() => setReferenceDialog("log")}
                    onCloseDialog={() => setReferenceDialog("")}
                    onStateChange={setGameState}
                />

                <TransmissionPanel state={gameState}/>

                <ResponsePanel
                    ref={responsePanelRef}
                    state={gameState}
                    onStateChange={setGameState}

                    onHydrogenOffsetUnlocked={() => {
                        const entry = getLogEntry(HYDROGEN_OFFSET_LOG_ID);

                        if (entry) {
                            setHydrogenUnlockEntry(entry);
                        }
                    }}

                    onDecimalConversionUnlocked={() => {
                        const entry = getLogEntry(DECIMAL_CONVERSION_LOG_ID);

                        if (entry) {
                            setDecimalConversionUnlockEntry(entry);
                        }
                    }}

                    onGameComplete={() => setShowCompletion(true)}
                />
            </div>

            <TitleDialog/>

            <HydrogenLineOffsetUnlockDialog
                open={hydrogenUnlockEntry !== null}
                entry={hydrogenUnlockEntry!}
                onClose={() => setHydrogenUnlockEntry(null)}
            />

            <DecimalConversionUnlockDialog
                open={decimalConversionUnlockEntry !== null}
                entry={decimalConversionUnlockEntry!}
                onClose={() => setDecimalConversionUnlockEntry(null)}
            />

            <GameCompletionDialog
                open={showCompletion}
                onClose={() => setShowCompletion(false)}
            />
        </div>
    );
}