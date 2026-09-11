import type {Transmission, TransmissionGroup} from "@/data/transmissions/transmission";
import {HYDROGEN_LINE} from "@/data/transmissions/transmission";
import {DEV_SIGNALS} from "@/data/transmissions/dictionary";

const transmissions: Transmission[] = [
    {
        id: 1,
        signals: [HYDROGEN_LINE],
        signalBasis: "hydrogen",
        expectedAnswer: [HYDROGEN_LINE]
    },
    {
        id: 2,
        signals: [HYDROGEN_LINE + 256],
        signalBasis: "hydrogen",
        expectedAnswer: [HYDROGEN_LINE + 256]
    },
    {
        id: 3,
        signals: [HYDROGEN_LINE],
        signalBasis: "hydrogen",
        expectedAnswer: [HYDROGEN_LINE]
    },
    {
        id: 4,
        signals: [HYDROGEN_LINE + 1],
        signalBasis: "hydrogen",
        expectedAnswer: [HYDROGEN_LINE + 1]
    },
    {
        id: 5,
        signals: [HYDROGEN_LINE, HYDROGEN_LINE + 1, HYDROGEN_LINE + 2],
        signalBasis: "hydrogen",
        expectedAnswer: [HYDROGEN_LINE + 3]
    },
    {
        id: 6,
        signals: [HYDROGEN_LINE + 2, HYDROGEN_LINE + 3, HYDROGEN_LINE + 4, HYDROGEN_LINE + 5],
        signalBasis: "hydrogen",
        expectedAnswer: [HYDROGEN_LINE + 6]
    },
    {
        id: 7,
        signals: [HYDROGEN_LINE, HYDROGEN_LINE + DEV_SIGNALS.STOP, HYDROGEN_LINE + 1, HYDROGEN_LINE + DEV_SIGNALS.STOP, HYDROGEN_LINE + 2, HYDROGEN_LINE + DEV_SIGNALS.STOP, HYDROGEN_LINE + 3, HYDROGEN_LINE + DEV_SIGNALS.STOP, HYDROGEN_LINE + 4, HYDROGEN_LINE + DEV_SIGNALS.STOP],
        signalBasis: "hydrogen",
        expectedAnswer: [HYDROGEN_LINE + 5]
    },
    {
        id: 8,
        signals: [HYDROGEN_LINE, HYDROGEN_LINE + DEV_SIGNALS.STOP, HYDROGEN_LINE + 2, HYDROGEN_LINE + DEV_SIGNALS.STOP, HYDROGEN_LINE + 4, HYDROGEN_LINE + DEV_SIGNALS.STOP],
        signalBasis: "hydrogen",
        expectedAnswer: [HYDROGEN_LINE + 6]
    },
    {
        id: 9,
        signals: [HYDROGEN_LINE + 6, HYDROGEN_LINE + DEV_SIGNALS.STOP, HYDROGEN_LINE + 5, HYDROGEN_LINE + DEV_SIGNALS.STOP, HYDROGEN_LINE + 4, HYDROGEN_LINE + DEV_SIGNALS.STOP, HYDROGEN_LINE + 3, HYDROGEN_LINE + DEV_SIGNALS.STOP],
        signalBasis: "hydrogen",
        expectedAnswer: [HYDROGEN_LINE + 2]
    },
]

export const helloWorld: TransmissionGroup = {
    id: "hello-world",
    name: "HELLO WORLD!",
    transmissions
}