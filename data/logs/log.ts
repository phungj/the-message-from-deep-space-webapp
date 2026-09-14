import {GameState} from "@/data/engine/state";

export const HYDROGEN_OFFSET_UNLOCK_ID = 9;
export const DECIMAL_CONVERSION_UNLOCK_ID = 999;

export interface LogEntry {
    id: string;
    title: string;
    content: string;
    unlockAfterTransmissionID: number;
}

export const LOG_ENTRIES: LogEntry[] = [
    {
        id: "hydrogen-line-offset",
        title: "HYDROGEN LINE OFFSET",
        content:
            "Dr. Bautista updates the signal compiler. All signals are now offset by the hydrogen line automatically.",
        unlockAfterTransmissionID: HYDROGEN_OFFSET_UNLOCK_ID
    }
];

export function getUnlockedLogEntries(state: GameState): LogEntry[] {
    return LOG_ENTRIES.filter(
        entry => state.currentTransmissionID > entry.unlockAfterTransmissionID
    );
}

export function isHydrogenOffsetUnlocked(state: GameState): boolean {
    return state.currentTransmissionID > HYDROGEN_OFFSET_UNLOCK_ID;
}