import {Transmission, TransmissionGroup} from "@/data/transmissions/transmission";
import {DEV_SIGNALS} from "@/data/transmissions/dictionary";

const transmissions: Transmission[] = [
    {
        id: 16,
        signals: [0o2, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.ADD, 0o5, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o6, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.ADD, 0o7, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.ADD],
        expectedAnswer: [0o5]
    },
    {
        id: 17,
        signals: [0o5, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS, 0o7, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS, 0o5, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS],
        expectedAnswer: [0o4]
    },
    {
        id: 18,
        signals: [0o5, DEV_SIGNALS.EQUALS, 0o3, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.ADD, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS],
        expectedAnswer: [0o10]
    },
    {
        id: 19,
        signals: [0o1, DEV_SIGNALS.STOP, 0o0, DEV_SIGNALS.ADD, 0o3, DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS, 0o4, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.ADD, 0o5, DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS, 0o11, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.ADD, 0o3, DEV_SIGNALS.ADD, 0o4, DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS],
        expectedAnswer: [0o12]
    },
    {
        id: 20,
        signals: [
            0o2, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.MULTIPLY,
            DEV_SIGNALS.EQUALS, 0o6, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            0o2, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.MULTIPLY,
            DEV_SIGNALS.EQUALS, 0o2, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            0o1, DEV_SIGNALS.STOP, 0o5, DEV_SIGNALS.MULTIPLY,
            DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o5]
    },
    {
        id: 21,
        signals: [
            0o2, DEV_SIGNALS.STOP, 0o5, DEV_SIGNALS.MULTIPLY,
            DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o12]
    },
    {
        id: 22,
        signals: [
            0o2, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.ADD,
            0o2, DEV_SIGNALS.MULTIPLY, 0o1, DEV_SIGNALS.ADD,
            0o1, DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o13]
    },
    {
        id: 23,
        signals: [
            0o2, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.ADD,
            DEV_SIGNALS.EQUALS, 0o1, DEV_SIGNALS.STOP, 0o4
        ],
        expectedAnswer: [DEV_SIGNALS.ADD]
    },
    {
        id: 24,
        signals: [
            0o3, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.ADD,
            DEV_SIGNALS.EQUALS, 0o2, DEV_SIGNALS.STOP, 0o3
        ],
        expectedAnswer: [DEV_SIGNALS.MULTIPLY]
    }
];

export const mathOperations: TransmissionGroup = {
    id: "math-operations",
    name: "MATH OPERATIONS",
    transmissions
}