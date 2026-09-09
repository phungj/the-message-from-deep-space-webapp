export const HYDROGEN_LINE = 1420405752;

type SignalBasis = "hydrogen" | "offset";

export interface Transmission {
    id: number;
    signals: number[];
    signalBasis?: SignalBasis;
    expectedAnswer: number[];
}

export interface TransmissionGroup {
    id: string;
    name: string;
    transmissions: Transmission[]
}