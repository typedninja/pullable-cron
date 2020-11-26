import CronParser from "cron-parser";
import { Transformer } from "@typedninja/pullable";

/** @ignore */
type ParserOptions = Parameters<typeof CronParser.parseExpression>[1];

export function cron<T>(expression: string, options?: ParserOptions): Transformer<T, T> {
  return function (iterable) {
    return async function * () {
      const intervals = CronParser.parseExpression(expression, options);

      while (intervals.hasNext()) {
        const nextDate = intervals.next().toDate();

        if (nextDate.getTime() < Date.now())
          continue;

        await sleepTill(nextDate);

        yield * iterable();
      }
    }
  }
}

/** @ignore */
async function sleepTill(date: Date): Promise<void> {
  const time = date.getTime() - Date.now();

  if (time > 0) {
    await new Promise(resolve => setTimeout(resolve, time));
  }
}
