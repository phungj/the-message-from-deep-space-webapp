import {Transmission, TransmissionGroup} from "@/data/transmissions/transmission";
import {DEV_SIGNALS} from "@/data/transmissions/dictionary";

const transmissions: Transmission[] = [
    {
        id: 39,
        signals: [
            0, DEV_SIGNALS.STOP, 0, DEV_SIGNALS.EQUALS,
            0, DEV_SIGNALS.COMMA, 0, DEV_SIGNALS.STOP,
            DEV_SIGNALS.STOP, 1, DEV_SIGNALS.STOP, 2,
            DEV_SIGNALS.EQUALS, 1, DEV_SIGNALS.COMMA
        ],
        expectedAnswer: [2]
    },
    {
        id: 40,
        signals: [
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0, DEV_SIGNALS.STOP,
            0, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, DEV_SIGNALS.EQUALS,
            0, DEV_SIGNALS.COMMA, 0, DEV_SIGNALS.STOP,
            DEV_SIGNALS.STOP, 5, DEV_SIGNALS.STOP, 5,
            DEV_SIGNALS.STOP, 5, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [5, DEV_SIGNALS.COMMA, 5, DEV_SIGNALS.COMMA, 5]
    },
    {
        id: 41,
        signals: [
            0, DEV_SIGNALS.COMMA, 0, DEV_SIGNALS.STOP,
            1, DEV_SIGNALS.COMMA, 1, DEV_SIGNALS.STOP,
            2, DEV_SIGNALS.COMMA, 2, DEV_SIGNALS.STOP
        ],
        expectedAnswer: [3, DEV_SIGNALS.COMMA, 3]
    },
    {
        id: 42,
        signals: [
            0, DEV_SIGNALS.COMMA, 0, DEV_SIGNALS.STOP,
            1, DEV_SIGNALS.COMMA, 0, DEV_SIGNALS.STOP,
            2, DEV_SIGNALS.COMMA, 0, DEV_SIGNALS.STOP
        ],
        expectedAnswer: [3, DEV_SIGNALS.COMMA, 0]
    },
    {
        id: 43,
        signals: [
            0, DEV_SIGNALS.COMMA, 0, DEV_SIGNALS.STOP,
            0, DEV_SIGNALS.COMMA, 1, DEV_SIGNALS.STOP,
            0, DEV_SIGNALS.COMMA, 2, DEV_SIGNALS.STOP
        ],
        expectedAnswer: [0, DEV_SIGNALS.COMMA, 3]
    },
    {
        id: 44,
        signals: [
            0, DEV_SIGNALS.COMMA, 0, DEV_SIGNALS.STOP,
            1, DEV_SIGNALS.COMMA, 1, DEV_SIGNALS.STOP,
            2, DEV_SIGNALS.COMMA, 2, DEV_SIGNALS.STOP
        ],
        expectedAnswer: [3, DEV_SIGNALS.COMMA, 3]
    },
    {
        id: 45,
        signals: [
            0, DEV_SIGNALS.COMMA, 0, DEV_SIGNALS.STOP,
            1, DEV_SIGNALS.COMMA, 2, DEV_SIGNALS.STOP,
            2, DEV_SIGNALS.COMMA, 4, DEV_SIGNALS.STOP
        ],
        expectedAnswer: [3, DEV_SIGNALS.COMMA, 6]
    },
    {
        id: 46,
        signals: [
            0, DEV_SIGNALS.COMMA, 0, DEV_SIGNALS.STOP,
            1, DEV_SIGNALS.COMMA, 0.75, DEV_SIGNALS.STOP,
            2, DEV_SIGNALS.COMMA, 1.5, DEV_SIGNALS.STOP,
            3, DEV_SIGNALS.COMMA, 2.25, DEV_SIGNALS.STOP,
            4, DEV_SIGNALS.COMMA, 3, DEV_SIGNALS.STOP,
            5, DEV_SIGNALS.COMMA
        ],
        expectedAnswer: [3, DEV_SIGNALS.OCTAL_POINT, 75]
    }
];

export const groups: TransmissionGroup = {
    id: "groups",
    name: "GROUPS",
    transmissions
}