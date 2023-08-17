export type IteratorType = (i: number, ...args: number[]) => number;
export interface IIterator {
    iterator: IteratorType;
    getStart(): number;
    getEnd(): number;
}
