import { IIterator } from "./iterator.interface";

export class BaseIterator implements IIterator {
    constructor(
        private readonly start: number,
        private readonly end: number,
    ) {}
    iterator = (i: number) => {
        return ++i;
    }
    getStart(): number {
        return this.start;
    }

    getEnd(): number {
        return this.end;
    }
}
