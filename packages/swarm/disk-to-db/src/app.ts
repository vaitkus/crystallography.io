import { Db } from 'mongodb';
import { ExecOptions, ShellString } from 'shelljs';
import { CodFileRecord, processMessage } from './process';

export interface AppContext {
  log: (message: string) => void;
  getChanel: () => any;
  QUEUE_NAME: string;
  db: Db;
  exec: (command: string, options?: ExecOptions & { async?: false }) => ShellString;
}

export const app = async(context: AppContext) => {
    const { log, getChanel, QUEUE_NAME } = context;
    const chanel = context.getChanel();

    chanel.consume(QUEUE_NAME, async (originalMessage: any) => {
        const messages: CodFileRecord[] = JSON.parse(originalMessage.content.toString());
        for (const message of messages) {
            await processMessage({ ...message, context });
        }
        chanel.ack(originalMessage);
    }, { noAck: false });

    log('---------------------------------------------------');
}
