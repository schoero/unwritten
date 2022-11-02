
import minimatch from "minimatch";


export function isPathExcluded(path: string, excludePaths: string[]): boolean {
  return excludePaths.some(excludePath => minimatch(path, excludePath));
}
