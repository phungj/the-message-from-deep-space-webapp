"use client";

import ReferencePanel from "@/components/ReferencePanel";
import TransmissionPanel from "@/components/TransmissionPanel";
import ResponsePanel from "@/components/ResponsePanel";
import {GameState, INITIAL_GAME_STATE} from "@/data/engine/state";
import {useEffect, useState} from "react";
import HydrogenLineOffsetUnlockDialog from "@/components/HydrogenLineOffsetUnlockDialog";
import GameCompletionDialog from "@/components/GameCompletionDialog";
import {loadGame, saveGame} from "@/data/save";
import TitleDialog from "@/components/TitleDialog";

export type ReferenceDialog = "history" | "dictionary" | "";

export default function App() {
    const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
    const [referenceDialog, setReferenceDialog] = useState<ReferenceDialog>("");
    const [showHydrogenUnlock, setShowHydrogenUnlock] = useState(false);
    const [showCompletion, setShowCompletion] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const savedState = loadGame();

        if (savedState !== null) {
            setGameState(savedState);
        }

        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated) {
            saveGame(gameState);
        }
    }, [gameState, hydrated]);

    if (!hydrated) {
        return null;
    }

    return (
        <div className="text-center h-screen">
            <h1 className="font-title text-heading text-5xl font-bold mt-3">THE MESSAGE FROM DEEP SPACE</h1>

            <div className="grid grid-cols-3 gap-4 p-6 h-9/10">
                <ReferencePanel
                    state={gameState}
                    referenceDialog={referenceDialog}
                    onOpenHistory={() => setReferenceDialog("history")}
                    onOpenDictionary={() => setReferenceDialog("dictionary")}
                    onCloseDialog={() => setReferenceDialog("")}
                    onStateChange={setGameState}
                />
                <TransmissionPanel state={gameState}/>
                <ResponsePanel state={gameState} onStateChange={setGameState} onHydrogenOffsetUnlocked={() => setShowHydrogenUnlock(true)} onGameComplete={() => setShowCompletion(true)}/>
            </div>

            <TitleDialog/>
            <HydrogenLineOffsetUnlockDialog
                open={showHydrogenUnlock}
                onClose={() => setShowHydrogenUnlock(false)}
            />
            <GameCompletionDialog open={showCompletion} onClose={() => setShowCompletion(false)}/>
        </div>
    );
}