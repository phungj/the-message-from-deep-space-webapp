import {Transmission, TransmissionGroup} from "@/data/transmissions/transmission";
import {DEV_SIGNALS} from "@/data/transmissions/dictionary";

const transmissions: Transmission[] = [
    {
        id: 10,
        signals: [0o0, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.STOP, 0o5, DEV_SIGNALS.STOP, 0o6, DEV_SIGNALS.STOP, 0o7, DEV_SIGNALS.STOP, 0o10, DEV_SIGNALS.STOP, 0o11, DEV_SIGNALS.STOP, 0o12, DEV_SIGNALS.STOP, 0o13, DEV_SIGNALS.STOP, 0o14, DEV_SIGNALS.STOP, 0o15, DEV_SIGNALS.STOP, 0o16, DEV_SIGNALS.STOP, 0o17, DEV_SIGNALS.STOP],
        expectedAnswer: [0o20]
    },
    {
        id: 11,
        signals: [0o75, DEV_SIGNALS.STOP, 0o76, DEV_SIGNALS.STOP, 0o77, DEV_SIGNALS.STOP],
        expectedAnswer: [0o100]
    },
    {
        id: 12,
        signals: [0o1, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.STOP, 0o10, DEV_SIGNALS.STOP, 0o20, DEV_SIGNALS.STOP, 0o40, DEV_SIGNALS.STOP, 0o100, DEV_SIGNALS.STOP],
        expectedAnswer: [0o200]
    },
    {
        id: 13,
        signals: [0o0, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.STOP, 0o7, DEV_SIGNALS.STOP, 0o12, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o10, DEV_SIGNALS.STOP, 0o6, DEV_SIGNALS.STOP, 0o4, DEV_SIGNALS.STOP],
        expectedAnswer: [0o2]
    },
    {
        id: 14,
        signals: [0o0, DEV_SIGNALS.STOP, 0o0, DEV_SIGNALS.STOP, 0o0, DEV_SIGNALS.STOP, 0o0, DEV_SIGNALS.STOP, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.STOP, 0o5, DEV_SIGNALS.STOP],
        expectedAnswer: [0o7]
    },
    {
        id: 15,
        signals: [0o0, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.STOP, 0o1, DEV_SIGNALS.STOP, 0o2, DEV_SIGNALS.STOP, 0o3, DEV_SIGNALS.STOP, 0o5, DEV_SIGNALS.STOP, 0o10, DEV_SIGNALS.STOP],
        expectedAnswer: [0o15]
    }
];

export const formatNumbers: TransmissionGroup = {
    id: "format-numbers",
    name: "FORMAT NUMBERS",
    transmissions
}