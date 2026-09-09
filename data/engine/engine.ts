import type { Transmission } from "@/data/transmissions/transmission";
import type { GameState} from "@/data/engine/state";
import {TRANSMISSION_GROUPS} from "@/data/transmissions/groups/groups";
import {
    DisplaySignal,
    parseSignalInput,
    prepareTransmissionSignals
} from "@/data/transmissions/parser";

export type SubmitResult =
    | {
    type: "correct";
    nextState: GameState;
    completed: boolean;
    hydrogenOffsetUnlocked: boolean;
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

    if (!answersEqual(parsed.signals, transmission.expectedAnswer)) {
        return {
            type: "wrong-answer"
        };
    }

    const nextState = getNextState(state);

    return {
        type: "correct",
        nextState: nextState.state,
        completed: nextState.completed,
        hydrogenOffsetUnlocked: !isHydrogenOffsetUnlocked(state) && isHydrogenOffsetUnlocked(nextState.state)
    };
}

function answersEqual(actual: number[], expected: number[]): boolean {
    return (
        actual.length === expected.length &&
        actual.every((value, index) => value === expected[index])
    );
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
        return {
            state: {
                ...state,
                currentTransmissionID:
                group.transmissions[transmissionIndex + 1].id
            },
            completed: false
        };
    }

    // This was the last transmission in the group.
    if (groupIndex + 1 < TRANSMISSION_GROUPS.length) {
        const nextGroup = TRANSMISSION_GROUPS[groupIndex + 1];

        const completedHelloWorld = group.id === "hello-world";

        return {
            state: {
                ...state,
                currentGroupID: nextGroup.id,
                currentTransmissionID: nextGroup.transmissions[0].id,
            },
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

const DECIMAL_CONVERSION_UNLOCK_ID = 999;
export const HYDROGEN_OFFSET_UNLOCK_ID = 10;

export function isDecimalConversionUnlocked(
    transmission: Transmission
): boolean {
    return transmission.id >= DECIMAL_CONVERSION_UNLOCK_ID;
}

export function isHydrogenOffsetUnlocked(state: GameState): boolean {
    return state.currentTransmissionID >= HYDROGEN_OFFSET_UNLOCK_ID;
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