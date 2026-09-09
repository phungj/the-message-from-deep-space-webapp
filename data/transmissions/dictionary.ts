export type UserDictionary = Record<number, string>;

export const DEV_DICTIONARY: Record<string, number> = {
    STOP: -2,
};

export function addDictionaryEntry(
    dictionary: UserDictionary,
    signal: number,
    word: string
): UserDictionary {
    if (signal >= 0) {
        throw new Error("Dictionary signals must be negative offsets from the hydrogen line.");
    }

    return {
        ...dictionary,
        [signal]: word
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