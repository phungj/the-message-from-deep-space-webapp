"use client";

import ReferencePanel from "@/components/ReferencePanel";
import TransmissionPanel from "@/components/TransmissionPanel";
import ResponsePanel from "@/components/ResponsePanel";
import {GameState, INITIAL_GAME_STATE} from "@/data/engine/state";
import {useState} from "react";
import HydrogenLineOffsetUnlockDialog from "@/components/HydrogenLineOffsetUnlockDialog";

export type ReferenceDialog = "history" | "dictionary" | "";

export default function App() {
    const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
    const [referenceDialog, setReferenceDialog] = useState<ReferenceDialog>("");
    const [showHydrogenUnlock, setShowHydrogenUnlock] = useState(false);

    return (
        <div className="text-center h-screen">
            <h1 className="font-title text-heading text-5xl font-bold mt-3">The Message from Deep Space</h1>

            <div className="grid grid-cols-3 gap-4 p-6 h-9/10">
                <ReferencePanel
                    state={gameState}
                    referenceDialog={referenceDialog}
                    onOpenHistory={() => setReferenceDialog("history")}
                    onOpenDictionary={() => setReferenceDialog("dictionary")}
                    onCloseDialog={() => setReferenceDialog("")}
                />
                <TransmissionPanel state={gameState}/>
                <ResponsePanel state={gameState} onStateChange={setGameState} onHydrogenOffsetUnlocked={() => setShowHydrogenUnlock(true)}/>
            </div>
            <HydrogenLineOffsetUnlockDialog
                open={showHydrogenUnlock}
                onClose={() => setShowHydrogenUnlock(false)}
            />
        </div>
    );
}