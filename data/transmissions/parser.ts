import {HYDROGEN_LINE, Transmission} from "@/data/transmissions/transmission";
import {GameState} from "@/data/engine/state";
import {UserDictionary} from "@/data/transmissions/dictionary";
import {
    getDisplayBase,
} from "@/data/engine/engine";
import {HYDROGEN_OFFSET_UNLOCK_ID, isHydrogenOffsetUnlocked} from "@/data/logs/log";

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
    return signals.map(signal => {
        const entry = dictionary[signal];

        return {
            value: entry?.word ?? signal.toString(base),
            prefix: entry?.prefix ?? (signal < 0 ? "space" : "none"),
            postfix:
                entry?.postfix ??
                (signal < 0
                    ? "newline"
                    : hydrogenLineUnconverted
                        ? "space"
                        : "none")
        };
    });
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
        .replace(/[ \t]+/g, " ")
        .replace(/ *\n */g, "\n")
        .trim();
}

export function parseSignalInput(
    input: string,
    base: 8 | 10,
    dictionary: UserDictionary
): ParseResult {
    const dictionaryEntries = Object.entries(dictionary)
        .sort(([, a], [, b]) => b.word.length - a.word.length);

    const signals: number[] = [];
    let position = 0;

    while (position < input.length) {
        // Ignore whitespace.
        if (/\s/.test(input[position])) {
            position++;
            continue;
        }

        const remaining = input.slice(position);

        // Try to match a dictionary word.
        const dictionaryEntry = dictionaryEntries.find(
            ([, entry]) =>
                remaining.toUpperCase().startsWith(entry.word.toUpperCase())
        );

        if (dictionaryEntry) {
            signals.push(Number(dictionaryEntry[0]));
            position += dictionaryEntry[1].word.length;
            continue;
        }

        // Try to match a number.
        const numberMatch = remaining.match(/^\d+/);

        if (numberMatch) {
            const token = numberMatch[0];

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
                    position
                };
            }

            signals.push(parseInt(token, base));
            position += token.length;
            continue;
        }

        // Nothing recognized at this position.
        const token = input[position];

        return {
            success: false,
            kind: "unknown-word",
            error: `Unrecognized signal: "${token}"`,
            token,
            position
        };
    }

    return {
        success: true,
        signals
    };
}