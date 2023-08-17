import { Readable } from "stream";
import { IExecutor } from "../executor/executor.interface";

export class OutputConverter {
    public static toStream(exec: IExecutor<string>): Readable {
        const data = exec.execute();

        //TODO implement division into chunks
        return new Readable({
            read() {
                this.push(JSON.stringify(data));
                this.push(null);  // Закрытие потока
            }
        });
    }

    public static toString(exec: IExecutor<string>): string {
        const data = exec.execute();
        return data.join('');
    }
}