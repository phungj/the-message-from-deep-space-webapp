import {HYDROGEN_LINE, Transmission} from "@/data/transmissions/transmission";
import {GameState} from "@/data/engine/state";
import {UserDictionary} from "@/data/transmissions/dictionary";
import {
    getDisplayBase,
    HYDROGEN_OFFSET_UNLOCK_ID,
    isHydrogenOffsetUnlocked
} from "@/data/engine/engine";

export type ParseResult =
    | {
    success: true;
    signals: number[];
}
    | {
    success: false;
    kind: "invalid-number" | "unknown-word";
    error: string;
    token: string;
    position: number;
};

export type SignalSeparator = "space" | "newline" | "two-newlines" | "none";

export interface DisplaySignal {
    value: string;
    prefix: SignalSeparator;
    postfix: SignalSeparator;
}

function prepareSignals(
    signals: number[],
    base: 8 | 10,
    hydrogenLineUnconverted: boolean,
    dictionary: UserDictionary
): DisplaySignal[] {
    return signals.map(signal => ({
        value: dictionary[signal] ?? signal.toString(base),
        prefix: signal < 0 ? "space" : "none",
        postfix:
            signal < 0 || hydrogenLineUnconverted
                ? "newline"
                : "none"
    }));
}

export function prepareTransmissionSignals(
    signals: number[],
    transmission: Transmission,
    state: GameState
): DisplaySignal[] {
    const isHydrogenTransmission =
        transmission.signalBasis === "hydrogen";

    const isPreOffsetTransmission =
        transmission.id < HYDROGEN_OFFSET_UNLOCK_ID;

    const hydrogenOffsetUnlocked =
        isHydrogenOffsetUnlocked(state);

    const shouldConvertHydrogen =
        isHydrogenTransmission &&
        isPreOffsetTransmission &&
        hydrogenOffsetUnlocked;

    const converted = shouldConvertHydrogen
        ? signals.map(signal => signal - HYDROGEN_LINE)
        : signals;

    const hydrogenLineUnconverted =
        isHydrogenTransmission &&
        isPreOffsetTransmission &&
        !hydrogenOffsetUnlocked;

    return prepareSignals(
        converted,
        getDisplayBase(transmission),
        hydrogenLineUnconverted,
        state.dictionary
    );
}
function separatorToString(separator: SignalSeparator): string {
    switch (separator) {
        case "space":
            return " ";
        case "newline":
            return "\n";
        case "two-newlines":
            return "\n\n";
        case "none":
            return "";
    }
}

export function formatSignals(signals: DisplaySignal[]): string {
    return signals
        .map(signal =>
            `${separatorToString(signal.prefix)}${signal.value}${separatorToString(signal.postfix)}`
        )
        .join("")
        .trim();
}

export function parseSignalInput(
    input: string,
    base: 8 | 10,
    dictionary: UserDictionary
): ParseResult {
    const tokens = input.trim().split(/\s+/);

    if (tokens.length === 1 && tokens[0] === "") {
        return {success: true, signals: []};
    }

    const signals: number[] = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        // Try dictionary words first.
        const dictionaryEntry = Object.entries(dictionary).find(
            ([, word]) => word === token.toUpperCase()
        );

        if (dictionaryEntry) {
            signals.push(Number(dictionaryEntry[0]));
            continue;
        }

        // Is this a numeric input?
        const isNumber = /^\d+$/.test(token);

        if (isNumber) {
            const valid =
                base === 8
                    ? /^[0-7]+$/.test(token)
                    : true;

            if (!valid) {
                return {
                    success: false,
                    kind: "invalid-number",
                    error: `Invalid number: "${token}"`,
                    token,
                    position: i
                };
            }

            signals.push(parseInt(token, base));
            continue;
        }

        // It's a word that isn't in the dictionary.
        return {
            success: false,
            kind: "unknown-word",
            error: `Unrecognized signal: "${token}"`,
            token,
            position: i
        };
    }

    return {success: true, signals};
}