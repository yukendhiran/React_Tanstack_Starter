/* eslint-disable no-console */
type NonEmptyArray<T> = T[] & { 0: T };
type LogId = string;
type LogArgs = NonEmptyArray<unknown>;

function log(id: LogId, ...args: LogArgs) {
  if (args.length === 0) {
    console.error("Error: Please use id for log message");
    console.log(id);
    return;
  }
  console.log("=======================");
  console.log(id);
  console.log("-----------------------");
  console.log(...args);
  console.log("-----------------------");
  console.log("=======================");
}

function error(id: string, ...args: unknown[]) {
  if (args.length === 0) {
    console.error("Error: Please use id for log message");
    console.log(id);
    return;
  }
  console.log("=======================");
  console.log(id);
  console.log("-----------------------");
  console.error(...args);
  console.log("-----------------------");
  console.log("=======================");
}

function warn(id: string, ...args: unknown[]) {
  if (args.length === 0) {
    console.error("Error: Please use id for log message");
    console.log(id);
    return;
  }
  console.log("=======================");
  console.log(id);
  console.log("-----------------------");
  console.warn(...args);
  console.log("-----------------------");
  console.log("=======================");
}
function debug(id: string, ...args: unknown[]) {
  if (args.length === 0) {
    console.error("Error: Please use id for log message");
    console.log(id);
    return;
  }
  console.log("=======================");
  console.log(id);
  console.log("-----------------------");
  console.debug(...args);
  console.log("-----------------------");
  console.log("=======================");
}

function info(id: string, ...args: unknown[]) {
  if (args.length === 0) {
    console.error("Error: Please use id for log message");
    console.log(id);
    return;
  }
  console.log("=======================");
  console.log(id);
  console.log("-----------------------");
  console.info(...args);
  console.log("-----------------------");
  console.log("=======================");
}

function trace(id: string, ...args: unknown[]) {
  if (args.length === 0) {
    console.error("Error: Please use id for log message");
    console.log(id);
    return;
  }
  console.log("=======================");
  console.log(id);
  console.log("-----------------------");
  console.trace(...args);
  console.log("-----------------------");
  console.log("=======================");
}

function table(id: string, ...args: unknown[]) {
  if (args.length === 0) {
    console.error("Error: Please use id for log message");
    console.log(id);
    return;
  }
  console.log("=======================");
  console.log(id);
  console.log("-----------------------");
  console.table(...args);
  console.log("-----------------------");
  console.log("=======================");
}

export const logger = { log, error, warn, debug, info, trace, table };
