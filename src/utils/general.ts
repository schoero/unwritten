export function sortKeys(_: string, value: any) {

  if(!(value instanceof Object) || value instanceof Array){
    return value;
  }

  return Object.keys(value)
    .sort()
    .reduce<{ [key: string]: any; }>((sorted, key) => {
    sorted[key] = value[key];
    return sorted;
  }, {});

}


export function assert(expression: any, message?: string): asserts expression {
  if(!expression){
    throw new Error(message ?? "Assertion failed.");
  }
}
