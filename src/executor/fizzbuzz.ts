import { IIterator } from "../iterator/iterator.interface";
import { IExecutor } from "./executor.interface";
import { Rule } from "../rule";
export class Fizzbuzz implements IExecutor<string>{
    constructor(
        private readonly rules: Rule[],
        private readonly iterator: IIterator,
    ) {}

    private check(i: number): string {
        for(let {rule, value} of this.rules)
            if(rule.every(num => i % num === 0))
                return value;
        return i.toString();
    }

    execute(): string[] {
        const answer: string[] = [];
        const start = this.iterator.getStart();
        const end = this.iterator.getEnd();
        for(let i = start; i <= end; i = this.iterator.iterator(i)) {
            answer.push(this.check(i))
            console.log(i)
        }
        return answer;
    }
}
