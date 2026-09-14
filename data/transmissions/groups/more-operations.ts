import {Transmission, TransmissionGroup} from "@/data/transmissions/transmission";
import {DEV_SIGNALS} from "@/data/transmissions/dictionary";

const transmissions: Transmission[] = [
    {
        id: 25,
        signals: [
            0o10, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.EQUALS, 0o4, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            0o5, DEV_SIGNALS.STOP, 0o5, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.EQUALS, 0o1, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            0o6, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o2]
    },
    {
        id: 26,
        signals: [
            0o20, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o4]
    },
    {
        id: 27,
        signals: [
            0o5, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.SUBTRACT,
            DEV_SIGNALS.EQUALS, 0o2, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            0o7, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.SUBTRACT,
            DEV_SIGNALS.EQUALS, 0o3, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            0o6, DEV_SIGNALS.STOP, 0o6, DEV_SIGNALS.SUBTRACT,
            DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o0]
    },
    {
        id: 28,
        signals: [
            0o7, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.SUBTRACT,
            0o1, DEV_SIGNALS.SUBTRACT, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o3]
    },
    {
        id: 29,
        signals: [
            0o3, DEV_SIGNALS.STOP, 0o5, DEV_SIGNALS.SUBTRACT,
            DEV_SIGNALS.EQUALS, DEV_SIGNALS.NEGATIVE, 0o2, DEV_SIGNALS.STOP,
            DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.STOP, DEV_SIGNALS.NEGATIVE,
            0o3, DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS, 0o1,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.STOP,
            0o6, DEV_SIGNALS.SUBTRACT, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [DEV_SIGNALS.NEGATIVE, 0o5]
    },
    {
        id: 30,
        signals: [
            0o4, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.STOP,
            0o2, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.STOP,
            0o0, DEV_SIGNALS.STOP, DEV_SIGNALS.NEGATIVE, 0o1,
            DEV_SIGNALS.STOP, DEV_SIGNALS.NEGATIVE, 0o2, DEV_SIGNALS.STOP,
            DEV_SIGNALS.NEGATIVE, 0o3, DEV_SIGNALS.STOP
        ],
        expectedAnswer: [DEV_SIGNALS.NEGATIVE, 0o4]
    },
    {
        id: 31,
        signals: [
            0o2, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.ADD,
            0o2, DEV_SIGNALS.MULTIPLY, 0o5, DEV_SIGNALS.DIVIDE,
            0o2, DEV_SIGNALS.SUBTRACT, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o0]
    }
];

export const moreOperations: TransmissionGroup = {
    id: "more-operations",
    name: "MORE OPERATIONS",
    transmissions
}