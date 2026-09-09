import type { Transmission } from "@/data/transmissions/transmission";
import type { GameState} from "@/data/engine/state";
import {TRANSMISSION_GROUPS} from "@/data/transmissions/groups/groups";
import {HYDROGEN_LINE} from "@/data/transmissions/transmission";
import {
    DisplaySignal,
    parseSignalInput,
    prepareCurrentTransmissionSignals
} from "@/data/transmissions/parser";

export type SubmitResult =
    | {
    type: "correct";
    nextState: GameState;
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

    return prepareCurrentTransmissionSignals(
        transmission.signals,
        transmission,
        state
    );
}

export function submitAnswer(state: GameState, input: string): SubmitResult {
    const transmission = getCurrentTransmission(state);

    const parsed = parseSignalInput(input, getCurrentDisplayBase(transmission, state));

    if (!parsed.success) {
        return {
            type: "parse-error",
            error: parsed.error
        };
    }

    const expectedAnswer = convertFromTransmissionBasis(
        transmission.expectedAnswer,
        transmission,
        state
    );

    if (!answersEqual(parsed.signals, expectedAnswer)) {
        return {
            type: "wrong-answer"
        };
    }

    return {
        type: "correct",
        nextState: getNextState(state)
    };
}

function answersEqual(actual: number[], expected: number[]): boolean {
    return (
        actual.length === expected.length &&
        actual.every((value, index) => value === expected[index])
    );
}

function getNextState(state: GameState): GameState {
    const groupIndex = TRANSMISSION_GROUPS.findIndex(
        group => group.id === state.currentGroupID
    );

    if (groupIndex === -1) {
        throw new Error(`Unknown transmission group: ${state.currentGroupID}`);
    }

    const group = TRANSMISSION_GROUPS[groupIndex];

    const transmissionIndex = group.transmissions.findIndex(transmission => transmission.id === state.currentTransmissionID);

    if (transmissionIndex === -1) {
        throw new Error(`Unknown transmission: ${state.currentTransmissionID}`);
    }

    // There is another transmission in this group.
    if (transmissionIndex + 1 < group.transmissions.length) {
        return {
            ...state,
            currentTransmissionID:
            group.transmissions[transmissionIndex + 1].id
        };
    }

    // This was the last transmission in the group.
    if (groupIndex + 1 < TRANSMISSION_GROUPS.length) {
        const nextGroup = TRANSMISSION_GROUPS[groupIndex + 1];

        const completedHelloWorld = group.id === "hello-world";

        return {
            ...state,
            currentGroupID: nextGroup.id,
            currentTransmissionID: nextGroup.transmissions[0].id,
            hydrogenOffsetUnlocked: state.hydrogenOffsetUnlocked || completedHelloWorld
        };
    }

    // The entire game is complete.
    return {
        ...state,
        // We'll eventually want something like:
        // gameComplete: true
    };
}

export function convertFromTransmissionBasis(values: number[], transmission: Transmission, state: GameState): number[] {
    if (transmission.signalBasis === "hydrogen" && state.hydrogenOffsetUnlocked) {
        return values.map(value => value - HYDROGEN_LINE);
    }

    return values;
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

const DECIMAL_CONVERSION_UNLOCK_ID = 999;

export function getHistoricalDisplayBase(
    transmission: Transmission
): 8 | 10 {
    return transmission.id >= DECIMAL_CONVERSION_UNLOCK_ID ? 10 : 8;
}

export function getCurrentDisplayBase(
    transmission: Transmission,
    state: GameState
): 8 | 10 {
    if (
        transmission.signalBasis === "hydrogen"
    ) {
        return 10;
    }

    return getCurrentBase(state);
}

function getCurrentBase(state: GameState): 8 | 10 {
    return state.decimalConversionUnlocked ? 10 : 8;
}