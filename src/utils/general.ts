export function assert(expression: any, message?: string): asserts expression {
  if(!expression){
    throw new Error(message ?? "Assertion failed.");
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
