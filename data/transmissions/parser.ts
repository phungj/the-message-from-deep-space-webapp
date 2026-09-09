import {Transmission} from "@/data/transmissions/transmission";
import {GameState} from "@/data/engine/state";
import {
    convertFromTransmissionBasis,
    getCurrentDisplayBase,
    getHistoricalDisplayBase
} from "@/data/engine/engine";

export type ParseResult =
    | {
    success: true;
    signals: number[];
}
    | {
    success: false;
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
    hydrogenLineUnconverted: boolean
): DisplaySignal[] {
    return signals.map(signal => ({
        value: signal.toString(base),
        prefix: signal < 0 ? "space" : "none",
        postfix: signal < 0 || hydrogenLineUnconverted ? "newline" : "none"
    }));
}

export function prepareCurrentTransmissionSignals(
    signals: number[],
    transmission: Transmission,
    state: GameState
): DisplaySignal[] {
    const converted = convertFromTransmissionBasis(
        signals,
        transmission,
        state
    );

    const hydrogenLineUnconverted =
        transmission.signalBasis === "hydrogen" &&
        !state.hydrogenOffsetUnlocked;

    return prepareSignals(
        converted,
        getCurrentDisplayBase(transmission, state),
        hydrogenLineUnconverted
    );
}

export function prepareHistoricalTransmissionSignals(
    signals: number[],
    transmission: Transmission,
    state: GameState
): DisplaySignal[] {
    const converted = convertFromTransmissionBasis(
        signals,
        transmission,
        state
    );

    return prepareSignals(
        converted,
        getHistoricalDisplayBase(transmission)
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
    base: 8 | 10
): ParseResult {
    const tokens = input.trim().split(/\s+/);

    if (tokens.length === 1 && tokens[0] === "") {
        return { success: true, signals: [] };
    }

    const signals: number[] = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        const valid =
            base === 8
                ? /^[0-7]+$/.test(token)
                : /^\d+$/.test(token);

        if (!valid) {
            return {
                success: false,
                error: `Unrecognized signal: "${token}"`,
                token,
                position: i
            };
        }

        signals.push(parseInt(token, base));
    }

    return { success: true, signals };
}