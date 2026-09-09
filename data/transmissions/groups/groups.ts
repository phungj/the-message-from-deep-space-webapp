import {TransmissionGroup} from "@/data/transmissions/transmission";
import {helloWorld} from "@/data/transmissions/groups/hello-world";
import {formatNumbers} from "@/data/transmissions/groups/format-numbers";

export const TRANSMISSION_GROUPS: TransmissionGroup[] = [
    helloWorld,
    formatNumbers
];