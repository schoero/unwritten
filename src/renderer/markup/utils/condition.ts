import type { ConditionalOperator } from "unwritten:renderer/markup/types-definitions/nodes";


export function evaluateCondition(func: Function, args: unknown[], operator: ConditionalOperator, value: any): boolean {
  switch (operator){
    case "!=":
      return func(...args) !== value;
    case "!==":
      return func(...args) !== value;
    case "&&":
      return func(...args) && value;
    case "<":
      return func(...args) < value;
    case "<=":
      return func(...args) <= value;
    case "==":
      // eslint-disable-next-line eqeqeq
      return func(...args) == value;
    case "===":
      return func(...args) === value;
    case ">":
      return func(...args) > value;
    case ">=":
      return func(...args) >= value;
    case "||":
      return func(...args) || value;
  }
}
