import {SignalSeparator} from "@/data/transmissions/parser";

export interface DictionaryEntry {
    word: string;
    prefix: SignalSeparator;
    postfix: SignalSeparator;
}

export const DEV_SIGNALS = {
    STOP: -2,
    ADD: -5,
    EQUALS: -4,
    MULTIPLY: -6,
    DIVIDE: -8,
    SUBTRACT: -7,
    NEGATIVE: -1,
    OCTAL_POINT: -10,
    COMMA: -3
} as const;

export type UserDictionary = Record<number, DictionaryEntry>;

export function addDictionaryEntry(
    dictionary: UserDictionary,
    signal: number,
    word: string,
    prefix: SignalSeparator = "space",
    postfix: SignalSeparator = "newline"
): UserDictionary {
    if (signal >= 0) {
        throw new Error("Dictionary signals must be negative offsets.");
    }

    return {
        ...dictionary,
        [signal]: {
            word,
            prefix,
            postfix
        }
    };
}

export function updateDictionaryWord(
    dictionary: UserDictionary,
    signal: number,
    word: string
): UserDictionary {
    const entry = dictionary[signal];

    if (!entry) {
        throw new Error(`Unknown dictionary signal: ${signal}`);
    }

    return {
        ...dictionary,
        [signal]: {
            ...entry,
            word
        }
    };
}
export function removeDictionaryEntry(
    dictionary: UserDictionary,
    signal: number
): UserDictionary {
    const next = { ...dictionary };
    delete next[signal];
    return next;
}