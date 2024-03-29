export interface Path {
  /** Resolves the absolute path based on the base path */
  absolute(to: string): string;
  absolute(from: string, to: string): string;
  /** Returns the directory including a trailing slash */
  getDirectory(path: string): string;
  /**
   * Returns the file extension including the period
   * Returns an empty string if the path doesn't contain a file
   */
  getFileExtension(path: string): string;
  /**
   * Returns the file name including the extension by default.
   * Returns an empty string if the path doesn't contain a file
   */
  getFileName(path: string, includeExtension?: boolean): string;
  /** Joins multiple segments */
  join(...segments: string[]): string;
  /** Strips file protocol prefix and converts windows style paths to posix style paths */
  normalize(path: string): string;
  /** Returns the relative path from one path to the other */
  relative(from: string, to: string): string;
}
