import {Transmission, TransmissionGroup} from "@/data/transmissions/transmission";
import {DEV_DICTIONARY} from "@/data/transmissions/dictionary";

const transmissions: Transmission[] = [
    {
        id: 10,
        signals: [0o0, DEV_DICTIONARY["STOP"], 0o1, DEV_DICTIONARY["STOP"], 0o2, DEV_DICTIONARY["STOP"], 0o3, DEV_DICTIONARY["STOP"], 0o4, DEV_DICTIONARY["STOP"], 0o5, DEV_DICTIONARY["STOP"], 0o6, DEV_DICTIONARY["STOP"], 0o7, DEV_DICTIONARY["STOP"], 0o10, DEV_DICTIONARY["STOP"], 0o11, DEV_DICTIONARY["STOP"], 0o12, DEV_DICTIONARY["STOP"], 0o13, DEV_DICTIONARY["STOP"], 0o14, DEV_DICTIONARY["STOP"], 0o15, DEV_DICTIONARY["STOP"], 0o16, DEV_DICTIONARY["STOP"], 0o17, DEV_DICTIONARY["STOP"]],
        expectedAnswer: [0o20]
    },
    {
        id: 11,
        signals: [0o75, DEV_DICTIONARY["STOP"], 0o76, DEV_DICTIONARY["STOP"], 0o77, DEV_DICTIONARY["STOP"]],
        expectedAnswer: [0o100]
    }
];

export const formatNumbers: TransmissionGroup = {
    id: "format-numbers",
    name: "FORMAT NUMBERS",
    transmissions
}