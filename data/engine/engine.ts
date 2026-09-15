import type { Transmission } from "@/data/transmissions/transmission";
import type { GameState} from "@/data/engine/state";
import {TRANSMISSION_GROUPS} from "@/data/transmissions/groups/transmissionGroups";
import {
    DisplaySignal,
    parseSignalInput,
    prepareTransmissionSignals
} from "@/data/transmissions/parser";
import {
    DECIMAL_CONVERSION_UNLOCK_ID,
    isDecimalConversionUnlocked,
    isHydrogenOffsetUnlocked
} from "@/data/logs/log";
import {createUndefinedEntry} from "@/data/transmissions/dictionary";

export type SubmitResult =
    | {
    type: "correct";
    nextState: GameState;
    completed: boolean;
    hydrogenOffsetUnlocked: boolean;
    decimalConversionUnlocked: boolean;
}
    | {
    type: "wrong-answer";
}
    | {
    type: "parse-error";
    error: string;
};

export function getCurrentTransmission(state: GameState): Transmission {
    const group = TRANSMISSION_GROUPS.find(
        group => group.id === state.currentGroupID
    );

    if (!group) {
        throw new Error(`Unknown transmission group: ${state.currentGroupID}`);
    }

    const transmission = group.transmissions.find(
        transmission => transmission.id === state.currentTransmissionID
    );

    if (!transmission) {
        throw new Error(
            `Unknown transmission: ${state.currentTransmissionID}`
        );
    }

    return transmission;
}

export function getDisplayedSignals(state: GameState): DisplaySignal[] {
    const transmission = getCurrentTransmission(state);

    return prepareTransmissionSignals(
        transmission.signals,
        transmission,
        state
    );
}

export function submitAnswer(
    state: GameState,
    input: string
): SubmitResult {
    const transmission = getCurrentTransmission(state);

    const parsed = parseSignalInput(
        input,
        getDisplayBase(transmission),
        state.dictionary
    );

    if (!parsed.success) {
        if (parsed.kind === "invalid-number") {
            return {
                type: "wrong-answer"
            };
        }

        return {
            type: "parse-error",
            error: parsed.error
        };
    }

    if (!isAcceptableAnswer(parsed.signals, transmission)) {
        return {
            type: "wrong-answer"
        };
    }

    const nextState = getNextState(state);

    return {
        type: "correct",
        nextState: nextState.state,
        completed: nextState.completed,
        hydrogenOffsetUnlocked:
            !isHydrogenOffsetUnlocked(state) &&
            isHydrogenOffsetUnlocked(nextState.state),
        decimalConversionUnlocked:
            !isDecimalConversionUnlocked(state) &&
            isDecimalConversionUnlocked(nextState.state)
    };
}

function answersEqual(actual: number[], expected: number[]): boolean {
    return (
        actual.length === expected.length &&
        actual.every((value, index) => value === expected[index])
    );
}

function isAcceptableAnswer(
    actual: number[],
    transmission: Transmission
): boolean {
    if (answersEqual(actual, transmission.expectedAnswer)) {
        return true;
    }

    return transmission.otherAnswers?.some(
        answer => answersEqual(actual, answer)
    ) ?? false;
}

function getNextState(
    state: GameState
): { state: GameState; completed: boolean } {
    const groupIndex = TRANSMISSION_GROUPS.findIndex(
        group => group.id === state.currentGroupID
    );

    if (groupIndex === -1) {
        throw new Error(`Unknown transmission group: ${state.currentGroupID}`);
    }

    const group = TRANSMISSION_GROUPS[groupIndex];

    const transmissionIndex = group.transmissions.findIndex(
        transmission => transmission.id === state.currentTransmissionID
    );

    if (transmissionIndex === -1) {
        throw new Error(`Unknown transmission: ${state.currentTransmissionID}`);
    }

    // There is another transmission in this group.
    if (transmissionIndex + 1 < group.transmissions.length) {
        const nextTransmission =
            group.transmissions[transmissionIndex + 1];

        const nextState = {
            ...state,
            currentTransmissionID: nextTransmission.id
        };

        return {
            state: addUndefinedSignalsForCurrentTransmission(nextState),
            completed: false
        };
    }

    // This was the last transmission in the group.
    if (groupIndex + 1 < TRANSMISSION_GROUPS.length) {
        const nextGroup = TRANSMISSION_GROUPS[groupIndex + 1];

        const nextState = {
            ...state,
            currentGroupID: nextGroup.id,
            currentTransmissionID: nextGroup.transmissions[0].id
        };

        return {
            state: addUndefinedSignalsForCurrentTransmission(nextState),
            completed: false
        };
    }

    // The entire currently-authored game is complete.
    return {
        state,
        completed: true
    };
}

export function getTransmissionHistory(
    state: GameState
): Transmission[] {
    const history: Transmission[] = [];

    for (const group of TRANSMISSION_GROUPS) {
        for (const transmission of group.transmissions) {
            if (
                group.id === state.currentGroupID &&
                transmission.id === state.currentTransmissionID
            ) {
                return history;
            }

            history.push(transmission);
        }
    }

    return history;
}

export function getDisplayBase(
    transmission: Transmission
): 8 | 10 {
    if (transmission.signalBasis === "hydrogen") {
        return 10;
    }

    return transmission.id >= DECIMAL_CONVERSION_UNLOCK_ID
        ? 10
        : 8;
}

export function isTransmissionGroupCompleted(
    state: GameState,
    groupIndex: number
): boolean {
    const currentGroupIndex = TRANSMISSION_GROUPS.findIndex(
        group => group.id === state.currentGroupID
    );

    if (currentGroupIndex === -1) {
        throw new Error(`Unknown transmission group: ${state.currentGroupID}`);
    }

    return groupIndex < currentGroupIndex;
}

function addUndefinedSignalsToDictionary(
    state: GameState,
    signals: number[]
): GameState {
    const dictionary = { ...state.dictionary };

    for (const signal of signals) {
        if (signal < 0 && dictionary[signal] === undefined) {
            dictionary[signal] = createUndefinedEntry(signal);
        }
    }

    return {
        ...state,
        dictionary
    };
}

export function addUndefinedSignalsForCurrentTransmission(
    state: GameState
): GameState {
    const transmission = getCurrentTransmission(state);

    return addUndefinedSignalsToDictionary(
        state,
        transmission.signals
    );
}