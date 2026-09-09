import {GameState} from "@/data/engine/state";

const SAVE_KEY = "message-from-deep-space/";

export function saveGame(state: GameState): void {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

export function loadGame(): GameState | null {
    const saved = localStorage.getItem(SAVE_KEY);

    if (saved === null) {
        return null;
    }

    try {
        return JSON.parse(saved) as GameState;
    } catch {
        return null;
    }
}

export function deleteSave(): void {
    localStorage.removeItem(SAVE_KEY);
}