import {UserDictionary} from "@/data/transmissions/dictionary";

export interface GameState {
    currentGroupID: string;
    currentTransmissionID: number;
    dictionary: UserDictionary,
}

export const INITIAL_GAME_STATE: GameState = {
    currentGroupID: "hello-world",
    currentTransmissionID: 1,
    dictionary: {},
}