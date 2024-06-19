export function assert(expression: any, message?: string): asserts expression {
  if(!expression){
    const error = new Error(message ?? "Assertion failed.");

    // fix stack trace
    if(error.stack){
      const stack = error.stack.split("\n");
      stack.splice(1, 1);
      error.stack = stack.join("\n");
    }

    throw error;

  }
}


export function sortKeys(_: string, value: any) {

  if(!(typeof value === "object") || Array.isArray(value)){
    return value;
  }

  return Object.keys(value)
    .sort()
    .reduce<{ [key: string]: any; }>((sorted, key) => {
      sorted[key] = value[key];
      return sorted;
    }, {});

}
