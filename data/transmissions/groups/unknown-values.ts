import {Transmission, TransmissionGroup} from "@/data/transmissions/transmission";
import {DEV_SIGNALS} from "@/data/transmissions/dictionary";

const transmissions: Transmission[] = [
    {
        id: 47,
        signals: [
            DEV_SIGNALS.VAR, 0, DEV_SIGNALS.EQUALS, 2,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR, 0,
            DEV_SIGNALS.STOP, 1, DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS,
            3, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR,
            0, DEV_SIGNALS.STOP, 3, DEV_SIGNALS.MULTIPLY,
            DEV_SIGNALS.EQUALS, 6, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            DEV_SIGNALS.VAR, 0, DEV_SIGNALS.STOP, 2,
            DEV_SIGNALS.DIVIDE, DEV_SIGNALS.EQUALS, 1, DEV_SIGNALS.STOP,
            DEV_SIGNALS.STOP, DEV_SIGNALS.VAR, 0, DEV_SIGNALS.STOP,
            2, DEV_SIGNALS.SUBTRACT, DEV_SIGNALS.EQUALS, 0,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR, 1,
            DEV_SIGNALS.EQUALS, 5, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            DEV_SIGNALS.VAR, 0, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR,
            1, DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [7]
    },
    {
        id: 48,
        signals: [
            DEV_SIGNALS.VAR, 0, DEV_SIGNALS.EQUALS, 0,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR, 1,
            DEV_SIGNALS.EQUALS, 3, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            DEV_SIGNALS.VAR, 2, DEV_SIGNALS.EQUALS, 2,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR, 0,
            DEV_SIGNALS.VAR, 1, DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS,
            3, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR,
            0, DEV_SIGNALS.VAR, 2, DEV_SIGNALS.ADD,
            DEV_SIGNALS.EQUALS, 2, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            DEV_SIGNALS.VAR, 1, DEV_SIGNALS.VAR, 2,
            DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS, 5, DEV_SIGNALS.STOP,
            DEV_SIGNALS.STOP, DEV_SIGNALS.VAR, 0, DEV_SIGNALS.VAR,
            1, DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.EQUALS, 0,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR, 1,
            DEV_SIGNALS.VAR, 2, DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [6]
    },
    {
        id: 49,
        signals: [
            DEV_SIGNALS.VAR, 1, DEV_SIGNALS.VAR, 0,
            DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS, 8, DEV_SIGNALS.STOP,
            DEV_SIGNALS.STOP, DEV_SIGNALS.VAR, 1, DEV_SIGNALS.EQUALS,
            5, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR,
            0, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [3]
    },
    {
        id: 50,
        signals: [
            DEV_SIGNALS.VAR, 0, DEV_SIGNALS.STOP, 2,
            DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.EQUALS, DEV_SIGNALS.VAR, 1,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR, 0,
            DEV_SIGNALS.EQUALS, 4, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            DEV_SIGNALS.VAR, 1, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [8]
    },
    {
        id: 51,
        signals: [
            DEV_SIGNALS.VAR, 0, DEV_SIGNALS.STOP, 2,
            DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.EQUALS, DEV_SIGNALS.VAR, 1,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR, 0,
            DEV_SIGNALS.EQUALS, 4, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            DEV_SIGNALS.VAR, 1, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [2]
    },
    {
        id: 52,
        signals: [
            1, DEV_SIGNALS.STOP, 2, DEV_SIGNALS.ADD,
            DEV_SIGNALS.EQUALS, 3, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            3, DEV_SIGNALS.STOP, 4, DEV_SIGNALS.ADD,
            DEV_SIGNALS.EQUALS, DEV_SIGNALS.WHAT
        ],
        expectedAnswer: [7]
    },
    {
        id: 53,
        signals: [
            DEV_SIGNALS.WHAT, DEV_SIGNALS.EQUALS, 0
        ],
        expectedAnswer: [0]
    },
    {
        id: 54,
        signals: [
            2, DEV_SIGNALS.STOP, 3, DEV_SIGNALS.ADD,
            DEV_SIGNALS.EQUALS, 5, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            DEV_SIGNALS.WHAT, DEV_SIGNALS.EQUALS, DEV_SIGNALS.NEGATIVE, 6
        ],
        expectedAnswer: [DEV_SIGNALS.NEGATIVE, 6]
    },
    {
        id: 55,
        signals: [
            DEV_SIGNALS.WHAT, 3, DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS,
            15
        ],
        expectedAnswer: [12]
    },
    {
        id: 56,
        signals: [
            3, DEV_SIGNALS.STOP, 5, DEV_SIGNALS.WHAT,
            DEV_SIGNALS.EQUALS, 2, DEV_SIGNALS.STOP, 4,
            DEV_SIGNALS.MULTIPLY
        ],
        expectedAnswer: [DEV_SIGNALS.ADD]
    },
    {
        id: 57,
        signals: [
            4, DEV_SIGNALS.EQUALS, 2, DEV_SIGNALS.STOP,
            2, DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            4, DEV_SIGNALS.EQUALS, 4, DEV_SIGNALS.STOP,
            1, DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            4, DEV_SIGNALS.EQUALS, 1, DEV_SIGNALS.STOP,
            4, DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            13, DEV_SIGNALS.EQUALS, DEV_SIGNALS.WHAT, DEV_SIGNALS.MULTIPLY
        ],
        expectedAnswer: [13, DEV_SIGNALS.STOP, 1],
        otherAnswers: [[1, DEV_SIGNALS.STOP, 13]]
    },
    {
        id: 58,
        signals: [
            3, DEV_SIGNALS.EQUALS, 2, DEV_SIGNALS.VAR,
            0, DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            DEV_SIGNALS.VAR, 0, DEV_SIGNALS.EQUALS, DEV_SIGNALS.WHAT
        ],
        expectedAnswer: [1, DEV_SIGNALS.OCTAL_POINT, 5]
    }
];

export const unknownValues: TransmissionGroup = {
    id: "unknown-values",
    name: "UNKNOWN VALUES",
    transmissions
}