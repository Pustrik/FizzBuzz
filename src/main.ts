import { BaseIterator } from "./iterator/base Iterator";
import { Rule } from "./rule";
import { Fizzbuzz } from "./executor/fizzbuzz";
import { OutputConverter } from "./converter/output.converter";

/* Rules allow you to set an arbitrary string configuration */
const concreteRule1: Rule[] = [{
    rule: [3, 5],
    value: 'FizzBuzz'
}, {
    rule: [3],
    value: 'Fizz'
}, {
    rule: [5],
    value: 'Buzz'
}]

const concreteRule2: Rule[] = [{
    rule: [3],
    value: 'FizzBuzz'
}, {
    rule: [5],
    value: 'FizzBuzz'
}]

const bootstrap = async () => {
    /*
        Splitting the application into submodules (interfaces) Executor and Iterator
            allows you to achieve maximum flexibility and extensibility within a given concept.
        If you need to change or replace the functionality,
            it is enough to correctly implement these interfaces.
        Thus, the application is made in compliance with the SOLID principles
    */
    const fizzBuzz = new Fizzbuzz(concreteRule1, new BaseIterator(0, 100))

    // Allows you to direct a stream split into chunks into a 'res' stream or a file
    const stream = OutputConverter.toStream(fizzBuzz);

    // Allows to concatenate output mass or other manipulations
    const string = OutputConverter.toString(fizzBuzz);

    console.log(string)
}

bootstrap();
