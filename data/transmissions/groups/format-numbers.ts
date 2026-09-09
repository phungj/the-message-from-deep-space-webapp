import {Transmission, TransmissionGroup} from "@/data/transmissions/transmission";
import {DICTIONARY} from "@/data/transmissions/dictionary";

const transmissions: Transmission[] = [
    {
        id: 10,
        signals: [0o0, DICTIONARY["STOP"], 0o1, DICTIONARY["STOP"], 0o2, DICTIONARY["STOP"], 0o3, DICTIONARY["STOP"], 0o4, DICTIONARY["STOP"], 0o5, DICTIONARY["STOP"], 0o6, DICTIONARY["STOP"], 0o7, DICTIONARY["STOP"], 0o10, DICTIONARY["STOP"], 0o11, DICTIONARY["STOP"], 0o12, DICTIONARY["STOP"], 0o13, DICTIONARY["STOP"], 0o14, DICTIONARY["STOP"], 0o15, DICTIONARY["STOP"], 0o16, DICTIONARY["STOP"], 0o17, DICTIONARY["STOP"]],
        expectedAnswer: [0o20]
    },
    {
        id: 11,
        signals: [0o75, DICTIONARY["STOP"], 0o76, DICTIONARY["STOP"], 0o77, DICTIONARY["STOP"]],
        expectedAnswer: [0o100]
    }
];

export const formatNumbers: TransmissionGroup = {
    id: "format-numbers",
    name: "FORMAT NUMBERS",
    transmissions
}