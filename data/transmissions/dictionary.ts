import {SignalSeparator} from "@/data/transmissions/parser";

export interface DictionaryEntry {
    word: string;
    prefix: SignalSeparator;
    postfix: SignalSeparator;
    breakOnRepeat: boolean;
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
    COMMA: -3,
    VAR: -11,
    WHAT: -12,
    AS: -13
} as const;

export type UserDictionary = Record<number, DictionaryEntry>;

export function addDictionaryEntry(
    dictionary: UserDictionary,
    signal: number,
    word: string,
    prefix: SignalSeparator = "space",
    postfix: SignalSeparator = "newline",
    breakOnRepeat: boolean = false
): UserDictionary {
    if (signal >= 0) {
        throw new Error("Dictionary signals must be negative offsets.");
    }

    return {
        ...dictionary,
        [signal]: {
            word,
            prefix,
            postfix,
            breakOnRepeat
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

export function createUndefinedEntry(signal: number): DictionaryEntry {
    return {
        word: `@${signal}_UNDEF`,
        prefix: "space",
        postfix: "newline",
        breakOnRepeat: false
    };
}