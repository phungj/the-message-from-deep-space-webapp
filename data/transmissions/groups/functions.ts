import {Transmission, TransmissionGroup} from "@/data/transmissions/transmission";
import {DEV_SIGNALS} from "@/data/transmissions/dictionary";

const transmissions: Transmission[] = [
    {
        id: 59,
        signals: [
            DEV_SIGNALS.VAR, 0, DEV_SIGNALS.STOP, 3,
            DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.EQUALS, DEV_SIGNALS.VAR, 1,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR, 0,
            DEV_SIGNALS.EQUALS, 0, DEV_SIGNALS.COMMA, DEV_SIGNALS.VAR,
            1, DEV_SIGNALS.EQUALS, 0, DEV_SIGNALS.STOP,
            DEV_SIGNALS.STOP, DEV_SIGNALS.VAR, 0, DEV_SIGNALS.EQUALS,
            1, DEV_SIGNALS.COMMA, DEV_SIGNALS.VAR, 1,
            DEV_SIGNALS.EQUALS, 3, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            DEV_SIGNALS.VAR, 0, DEV_SIGNALS.EQUALS, 2,
            DEV_SIGNALS.COMMA, DEV_SIGNALS.WHAT
        ],
        expectedAnswer: [DEV_SIGNALS.VAR, 1, DEV_SIGNALS.EQUALS, 6]
    },
    {
        id: 60,
        signals: [
            DEV_SIGNALS.VAR, 0, DEV_SIGNALS.STOP, 4,
            DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.EQUALS, DEV_SIGNALS.VAR, 1,
            DEV_SIGNALS.AS, 0, DEV_SIGNALS.COMMA, 0,
            DEV_SIGNALS.STOP, 1, DEV_SIGNALS.COMMA, 4,
            DEV_SIGNALS.STOP, 2, DEV_SIGNALS.COMMA, 8,
            DEV_SIGNALS.STOP, 3, DEV_SIGNALS.COMMA, 12,
            DEV_SIGNALS.STOP, 4, DEV_SIGNALS.COMMA, 16,
            DEV_SIGNALS.STOP, 5, DEV_SIGNALS.COMMA, 20,
            DEV_SIGNALS.STOP, 6, DEV_SIGNALS.COMMA, 24,
            DEV_SIGNALS.STOP, 7, DEV_SIGNALS.COMMA, 28,
            DEV_SIGNALS.STOP, DEV_SIGNALS.WHAT, DEV_SIGNALS.COMMA, 32
        ],
        expectedAnswer: [8]
    },
    {
        id: 61,
        signals: [
            DEV_SIGNALS.VAR, 1, DEV_SIGNALS.EQUALS, DEV_SIGNALS.VAR,
            0, DEV_SIGNALS.STOP, 3, DEV_SIGNALS.ADD,
            DEV_SIGNALS.AS, 0, DEV_SIGNALS.COMMA, 3,
            DEV_SIGNALS.STOP, 1, DEV_SIGNALS.COMMA, 4,
            DEV_SIGNALS.STOP, 2, DEV_SIGNALS.COMMA, 5,
            DEV_SIGNALS.STOP, 3, DEV_SIGNALS.COMMA, 6,
            DEV_SIGNALS.STOP, DEV_SIGNALS.WHAT
        ],
        expectedAnswer: [4, DEV_SIGNALS.COMMA, 7]
    },
    {
        id: 62,
        signals: [
            DEV_SIGNALS.VAR, 0, DEV_SIGNALS.EQUALS, DEV_SIGNALS.VAR,
            5, DEV_SIGNALS.STOP, 2, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.AS, 0, DEV_SIGNALS.COMMA, 0,
            DEV_SIGNALS.STOP, 1, DEV_SIGNALS.COMMA, 0.5,
            DEV_SIGNALS.STOP, 2, DEV_SIGNALS.COMMA, 1,
            DEV_SIGNALS.STOP, 3, DEV_SIGNALS.COMMA, 1.5,
            DEV_SIGNALS.STOP, DEV_SIGNALS.WHAT
        ],
        expectedAnswer: [4, DEV_SIGNALS.COMMA, 2]
    },
    {
        id: 63,
        signals: [
            DEV_SIGNALS.VAR, 0, DEV_SIGNALS.STOP, 2,
            DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS, DEV_SIGNALS.VAR, 1,
            DEV_SIGNALS.AS, 0, DEV_SIGNALS.COMMA, 2,
            DEV_SIGNALS.STOP, 1, DEV_SIGNALS.COMMA, 3,
            DEV_SIGNALS.STOP, 2, DEV_SIGNALS.COMMA, 4,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR, 5,
            DEV_SIGNALS.STOP, 3, DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.EQUALS,
            DEV_SIGNALS.VAR, 13, DEV_SIGNALS.AS, 0,
            DEV_SIGNALS.COMMA, 0, DEV_SIGNALS.STOP, 1,
            DEV_SIGNALS.COMMA, 3, DEV_SIGNALS.STOP, 2,
            DEV_SIGNALS.COMMA, 6, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            DEV_SIGNALS.VAR, 2, DEV_SIGNALS.EQUALS, DEV_SIGNALS.VAR,
            3, DEV_SIGNALS.AS, 0, DEV_SIGNALS.COMMA,
            0, DEV_SIGNALS.STOP, 1, DEV_SIGNALS.COMMA,
            1, DEV_SIGNALS.STOP, 2, DEV_SIGNALS.COMMA,
            2, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.VAR,
            2, DEV_SIGNALS.STOP, 2, DEV_SIGNALS.MULTIPLY,
            DEV_SIGNALS.EQUALS, DEV_SIGNALS.VAR, 7, DEV_SIGNALS.AS,
            DEV_SIGNALS.WHAT
        ],
        expectedAnswer: [
            0, DEV_SIGNALS.COMMA, 0, DEV_SIGNALS.STOP,
            1, DEV_SIGNALS.COMMA, 2, DEV_SIGNALS.STOP,
            2, DEV_SIGNALS.COMMA, 4, DEV_SIGNALS.STOP
        ]
    },
    {
        id: 64,
        signals: [
            DEV_SIGNALS.VAR, 1, DEV_SIGNALS.COMMA, DEV_SIGNALS.VAR,
            1, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.WHAT,
            DEV_SIGNALS.AS, 0, DEV_SIGNALS.COMMA, 0,
            DEV_SIGNALS.STOP, 1, DEV_SIGNALS.COMMA, 2,
            DEV_SIGNALS.STOP, 2, DEV_SIGNALS.COMMA, 4,
            DEV_SIGNALS.STOP, 3, DEV_SIGNALS.COMMA, 6,
            DEV_SIGNALS.STOP, 4, DEV_SIGNALS.COMMA, 8,
            DEV_SIGNALS.STOP, 5, DEV_SIGNALS.COMMA, 10,
            DEV_SIGNALS.STOP, 6, DEV_SIGNALS.COMMA, 12,
            DEV_SIGNALS.STOP, 7, DEV_SIGNALS.COMMA, 14,
            DEV_SIGNALS.STOP, 8, DEV_SIGNALS.COMMA, 16
        ],
        expectedAnswer:  [
            DEV_SIGNALS.VAR, 0, DEV_SIGNALS.STOP, 2,
            DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.EQUALS, DEV_SIGNALS.VAR, 1
        ]
    }
];

export const functions: TransmissionGroup = {
    id: "functions",
    name: "FUNCTIONS",
    transmissions
}