import {AnyFunction} from "./types";

export function debounce(fn: AnyFunction, delay: number, combine: boolean = false): AnyFunction {
    let timeout: number | undefined;
    let args: any[] = [];

    const onComplete = () => {
        if (!combine) {
            fn(...args);
        } else {
            fn(args);
        }

        args = [];

        if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
        }
    };

    return (...rest: any[]) => {
        if (!combine) {
            args = rest;
        } else {
            args.push(rest);
        }

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(onComplete, delay);
    };
}
