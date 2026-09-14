import {Transmission, TransmissionGroup} from "@/data/transmissions/transmission";
import {DEV_SIGNALS} from "@/data/transmissions/dictionary";

const transmissions: Transmission[] = [
    {
        id: 32,
        signals: [
            0o1, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.EQUALS, 0o0, DEV_SIGNALS.OCTAL_POINT, 0o4,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.STOP,
            0o2, DEV_SIGNALS.DIVIDE, DEV_SIGNALS.EQUALS, 0o1,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.STOP,
            0o2, DEV_SIGNALS.DIVIDE, DEV_SIGNALS.EQUALS, 0o1,
            DEV_SIGNALS.OCTAL_POINT, 0o4, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            0o4, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.EQUALS, 0o2, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            0o5, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o2, DEV_SIGNALS.OCTAL_POINT, 0o4]
    },
    {
        id: 33,
        signals: [
            0o1, DEV_SIGNALS.STOP, 0o10, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.EQUALS, 0o0, DEV_SIGNALS.OCTAL_POINT, 0o1,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.STOP,
            0o10, DEV_SIGNALS.DIVIDE, DEV_SIGNALS.EQUALS, 0o0,
            DEV_SIGNALS.OCTAL_POINT, 0o2, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            0o3, DEV_SIGNALS.STOP, 0o10, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.EQUALS, 0o0, DEV_SIGNALS.OCTAL_POINT, 0o3,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.STOP,
            0o10, DEV_SIGNALS.DIVIDE, DEV_SIGNALS.EQUALS, 0o0,
            DEV_SIGNALS.OCTAL_POINT, 0o4, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            0o5, DEV_SIGNALS.STOP, 0o10, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.EQUALS, 0o0, DEV_SIGNALS.OCTAL_POINT, 0o5,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o6, DEV_SIGNALS.STOP,
            0o10, DEV_SIGNALS.DIVIDE, DEV_SIGNALS.EQUALS, 0o0,
            DEV_SIGNALS.OCTAL_POINT, 0o6, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP,
            0o7, DEV_SIGNALS.STOP, 0o10, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.EQUALS, 0o0, DEV_SIGNALS.OCTAL_POINT, 0o7,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o10, DEV_SIGNALS.STOP,
            0o10, DEV_SIGNALS.DIVIDE, DEV_SIGNALS.EQUALS, 0o1,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o11, DEV_SIGNALS.STOP,
            0o10, DEV_SIGNALS.DIVIDE, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o1, DEV_SIGNALS.OCTAL_POINT, 0o1]
    },
    {
        id: 34,
        signals: [
            0o5, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o1, DEV_SIGNALS.OCTAL_POINT, 0o2]
    },
    {
        id: 35,
        signals: [
            0o1, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.DIVIDE,
            DEV_SIGNALS.EQUALS, 0o0, DEV_SIGNALS.OCTAL_POINT, 0o2,
            DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.STOP,
            0o10, DEV_SIGNALS.DIVIDE, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o0, DEV_SIGNALS.OCTAL_POINT, 0o2]
    },
    {
        id: 36,
        signals: [
            0o5, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.OCTAL_POINT,
            0o2, DEV_SIGNALS.SUBTRACT, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o3, DEV_SIGNALS.OCTAL_POINT, 0o6]
    },
    {
        id: 37,
        signals: [
            0o1, DEV_SIGNALS.OCTAL_POINT, 0o3, DEV_SIGNALS.STOP,
            0o2, DEV_SIGNALS.MULTIPLY, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o2, DEV_SIGNALS.OCTAL_POINT, 0o6]
    },
    {
        id: 38,
        signals: [
            0o1, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.DIVIDE,
            0o0, DEV_SIGNALS.OCTAL_POINT, 0o6, DEV_SIGNALS.ADD,
            0o2, DEV_SIGNALS.MULTIPLY, 0o0, DEV_SIGNALS.OCTAL_POINT,
            0o4, DEV_SIGNALS.ADD, DEV_SIGNALS.EQUALS
        ],
        expectedAnswer: [0o2, DEV_SIGNALS.OCTAL_POINT, 0o4]
    }
];

export const fractionalNumbers: TransmissionGroup = {
    id: "fractional-numbers",
    name: "FRACTIONAL NUMBERS",
    transmissions
}