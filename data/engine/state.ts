export interface GameState {
    currentGroupID: string;
    currentTransmissionID: number;
    hydrogenOffsetUnlocked: boolean;
    decimalConversionUnlocked: boolean;
}

export const INITIAL_GAME_STATE: GameState = {
    currentGroupID: "hello-world",
    currentTransmissionID: 9,
    hydrogenOffsetUnlocked: false,
    decimalConversionUnlocked: false
}