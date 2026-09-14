import {GameState} from "@/data/engine/state";

export const INTRODUCTION_UNLOCK_ID = -1;
export const INTRODUCTION_LOG_ID = "introduction";

export const HYDROGEN_OFFSET_UNLOCK_ID = 9;
export const HYDROGEN_OFFSET_LOG_ID = "hydrogen-line-offset";

export const DECIMAL_CONVERSION_UNLOCK_ID = 38;
export const DECIMAL_CONVERSION_LOG_ID = "decimal-conversion";

export interface LogEntry {
    id: string;
    title: string;
    content: string;
    unlockAfterTransmissionID: number;
}

export const LOG_ENTRIES: LogEntry[] = [
    {
        id: INTRODUCTION_LOG_ID,
        title: "INTRODUCTION",
        content: `This morning, May 13th, 1973, marks the beginning of the investigation of the world's first extraterrestrial contact.

Ten days ago, a meteor landed in Cape Espenberg, Alaska. This meteor has an antenna and has been broadcasting a radio transmission. A 1.42 million kHz signal lasting 0.8066 seconds, pausing for just as long, and repeating. Geoseismic stations detected the meteor's landing, and immediately after, a naval boat picked up the signal. There is no doubt it is extraterrestrial.

A translation team has been assembled as follows:

Dr. Douglass Doppler - Materials Scientist and Team Lead
Dr. Alan Akers - Astronomer
Dr. Bryan Bautista - Computer Programmer
Dr. Carrie Collins - Linguist
Dr. Your Name - Translator

After hearing the frequency, Dr. Akers remarks that the number is the hydrogen line. It is a universal constant describing the frequency of the radiation emitted when a hydrogen atom's electron changes spin: 1,420,405 kHz.

Now, it is up to you to figure out what to send back.`,
        unlockAfterTransmissionID: INTRODUCTION_UNLOCK_ID
    },
    {
        id: HYDROGEN_OFFSET_LOG_ID,
        title: "HYDROGEN LINE OFFSET",
        content:
            "Dr. Bautista updates the signal compiler. All signals are now offset by the hydrogen line automatically.",
        unlockAfterTransmissionID: HYDROGEN_OFFSET_UNLOCK_ID
    },
    {
        id: DECIMAL_CONVERSION_LOG_ID,
        title: "DECIMAL CONVERSION",
        content: "Dr. Bautista updates the signal compiler.  All numeric signals are now represented in base ten  automatically.  All previous transmissions will be kept in base eight for reference.",
        unlockAfterTransmissionID: DECIMAL_CONVERSION_UNLOCK_ID
    }
];

export function getUnlockedLogEntries(state: GameState): LogEntry[] {
    return LOG_ENTRIES.filter(
        entry => state.currentTransmissionID > entry.unlockAfterTransmissionID
    );
}

export function getLogEntry(id: string): LogEntry | undefined {
    return LOG_ENTRIES.find(entry => entry.id === id);
}

export function isHydrogenOffsetUnlocked(state: GameState): boolean {
    return state.currentTransmissionID > HYDROGEN_OFFSET_UNLOCK_ID;
}

export function isDecimalConversionUnlocked(state: GameState): boolean {
    return state.currentTransmissionID > DECIMAL_CONVERSION_UNLOCK_ID;
}
