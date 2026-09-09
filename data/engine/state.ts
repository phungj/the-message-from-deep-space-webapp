import {UserDictionary} from "@/data/transmissions/dictionary";

export interface GameState {
    currentGroupID: string;
    currentTransmissionID: number;
    dictionary: UserDictionary,
    hydrogenOffsetUnlocked: boolean;
    decimalConversionUnlocked: boolean;
}

export const INITIAL_GAME_STATE: GameState = {
    currentGroupID: "hello-world",
    currentTransmissionID: 9,
    dictionary: {},
    hydrogenOffsetUnlocked: false,
    decimalConversionUnlocked: false
}