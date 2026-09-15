import {TransmissionGroup} from "@/data/transmissions/transmission";
import {helloWorld} from "@/data/transmissions/groups/hello-world";
import {formatNumbers} from "@/data/transmissions/groups/format-numbers";
import {mathOperations} from "@/data/transmissions/groups/math-operations";
import {moreOperations} from "@/data/transmissions/groups/more-operations";
import {fractionalNumbers} from "@/data/transmissions/groups/fractional-numbers";
import {groups} from "@/data/transmissions/groups/groups";
import {unknownValues} from "@/data/transmissions/groups/unknown-values";

export const TRANSMISSION_GROUPS: TransmissionGroup[] = [
    helloWorld,
    formatNumbers,
    mathOperations,
    moreOperations,
    fractionalNumbers,
    groups,
    unknownValues
];