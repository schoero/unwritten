import minimatch from "minimatch";


export function isPathExcluded(path: string, excludePaths: string[]): boolean {
  return excludePaths.reduce((_, excludePath) => minimatch(path, excludePath), false);
}
