/// <reference path="../typings/index.d.ts" />
const parser = require("tap-parser");

interface Result {
    ok: boolean;
    count: number;
    pass: number;
    fail: number;
    plan: Plan;
    failures: Failure[];
}
interface Plan {
    start: number;
    end: number;
}
interface Failure {
    ok: boolean;
    id: number;
    name: string;
    diag: Diagnostic;
}
interface Diagnostic {
    operator: string;
    expected: any;
    actual: any;
    at: string;
}

interface OutputLine {
    message: string;
    line: string;
    expected: any;
    actual: any;
}

const p = parser((result: Result) => {
    if (result.ok) {
        console.dir({});
        return;
    }

    const output: OutputLine[] = result.failures.map((failure: Failure) => {
        let message = failure.name;
        if (message.length === 0) {
            message = "<no message provided>";
        }

        return <OutputLine>{
            actual: failure.diag.actual.toString(),
            expected: failure.diag.expected.toString(),
            line: failure.diag.at,
            message: message
        };
    });
    console.log(JSON.stringify({ output: output }));
    process.exit(1);
});
process.stdin.pipe(p);
