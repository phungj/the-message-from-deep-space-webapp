import {readFileSync} from "node:fs";
import {DEV_SIGNALS} from "@/data/transmissions/dictionary";

type Base = 8 | 10;

interface Options {
    base: Base;
    file?: string;
}

function parseArgs(): Options {
    const args = process.argv.slice(2);

    let base: Base = 10;
    let file: string | undefined;

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === "--base") {
            const value = args[++i];

            if (value !== "8" && value !== "10") {
                throw new Error("--base must be 8 or 10");
            }

            base = Number(value) as Base;
            continue;
        }

        if (arg.startsWith("--")) {
            throw new Error(`Unknown argument: ${arg}`);
        }

        if (file !== undefined) {
            throw new Error("Only one input file may be specified");
        }

        file = arg;
    }

    return {base, file};
}

function isDevSignal(token: string): token is keyof typeof DEV_SIGNALS {
    return token.toUpperCase() in DEV_SIGNALS;
}

function parseNumber(token: string, base: Base, line: number): string {
    const pattern = base === 8 ? /^[0-7]+$/ : /^\d+$/;

    if (!pattern.test(token)) {
        throw new Error(
            `Line ${line}: invalid base-${base} number "${token}"`
        );
    }

    const value = parseInt(token, base);

    return base === 8
        ? `0o${value.toString(8)}`
        : value.toString(10);
}

function parseToken(token: string, base: Base, line: number): string {
    const normalizedToken = token.toUpperCase();

    if (isDevSignal(normalizedToken)) {
        return `DEV_SIGNALS.${normalizedToken}`;
    }

    if (/^\d+$/.test(token)) {
        return parseNumber(token, base, line);
    }

    throw new Error(`Line ${line}: unknown signal "${token}"`);
}

function parseTransmissionSignals(
    input: string,
    base: Base
): string[] {
    const result: string[] = [];

    const lines = input.split(/\r?\n/);

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const lineNumber = lineIndex + 1;
        const line = lines[lineIndex].trim();

        if (line === "") {
            continue;
        }

        const tokens = line.split(/\s+/);

        for (const token of tokens) {
            result.push(parseToken(token, base, lineNumber));
        }
    }

    return result;
}

function formatSignals(signals: string[]): string {
    if (signals.length === 0) {
        return "signals: []";
    }

    const lines: string[] = [];

    for (let i = 0; i < signals.length; i += 4) {
        const chunk = signals.slice(i, i + 4);
        lines.push(`    ${chunk.join(", ")}`);
    }

    return `signals: [\n${lines.join(",\n")}\n]`;
}

function main(): void {
    const options = parseArgs();

    const input = options.file !== undefined
        ? readFileSync(options.file, "utf8")
        : readFileSync(0, "utf8");

    const signals = parseTransmissionSignals(
        input,
        options.base
    );

    console.log(formatSignals(signals));
}

try {
    main();
} catch (error) {
    console.error(
        error instanceof Error
            ? error.message
            : String(error)
    );

    process.exit(1);
}