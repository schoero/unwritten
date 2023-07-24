const path = {
  absolute(from: string, to: string, cwd: string): string {

    const normalizedFrom = normalize(from);
    const normalizedTo = normalize(to);
    const normalizedCwd = normalize(cwd);

    const fromDirectory = path.getDirectory(normalizedFrom);
    const toDirectory = path.getDirectory(normalizedTo);

    const fromParts = fromDirectory
      .split("/")
      .filter(part => part !== "")
      .filter(part => part !== ".");
    const toParts = toDirectory
      .split("/")
      .filter(part => part !== "")
      .filter(part => part !== ".");
    const cwdParts = normalizedCwd
      .split("/")
      .filter(part => part !== "")
      .filter(part => part !== ".");

    const fromParentDirs = fromParts.filter(part => part === "..").length;
    const toParentDirs = toParts.filter(part => part === "..").length;

    const absoluteStartDir = [
      ...cwdParts.slice(0, cwdParts.length - fromParentDirs),
      ...fromParts.slice(fromParentDirs)
    ];

    const toDirIsRelative = !normalizedTo.startsWith("/");
    const absoluteToDir = toDirIsRelative
      ? [
        ...absoluteStartDir.slice(0, absoluteStartDir.length - toParentDirs),
        ...toParts.slice(toParentDirs)
      ]
      : [
        ...cwdParts.slice(0, cwdParts.length - toParentDirs),
        ...toParts.slice(toParentDirs)
      ];

    const toFile = path.getFileName(normalizedTo);

    return absoluteToDir.length > 0
      ? `/${absoluteToDir.join("/")}/${toFile}`
      : `/${toFile}`;

  },
  getDirectory(path: string): string {
    const normalizedPath = normalize(path);
    if(normalizedPath === "/" || normalizedPath === "./"){
      return normalizedPath;
    }
    return normalizedPath.split("/")
      .slice(0, -1)
      .join("/");
  },
  getFileExtension(path: string): string {
    const normalizedPath = normalize(path);
    if(normalizedPath.includes(".") === false){
      return "";
    }
    const extension = normalizedPath.split(/\./).pop();
    return extension ? `.${extension}` : "";
  },
  getFileName(path: string): string {
    const normalizedPath = normalize(path);
    return normalizedPath.split("/").pop() ?? "";
  },
  join(...segments: string[]): string {
    const normalizedSegments = segments.map(normalize);
    const root = normalizedSegments[0].startsWith("/") ? "/" : "";
    const cleanedSegments = normalizedSegments
      .map(
        segment => segment.replace(/^\.+\/|^\/|\/$|^\/$/g, "")
      )
      .filter(
        segment => segment !== ""
      );

    return `${root}${cleanedSegments.join("/")}`;
  },
  normalize(path: string): string {
    return path.replace("file://", "")
      .replace(/\\/g, "/");
  },
  relative(from: string, to: string, cwd: string): string {

    const absoluteStartDir = getDirectory(absolute(cwd, from, cwd)).split("/")
      .filter(part => part !== "");
    const absoluteToDir = getDirectory(absolute(from, to, cwd)).split("/")
      .filter(part => part !== "");

    const commonDirs = absoluteStartDir.filter((dir, index) => dir === absoluteToDir[index]);
    const relativeToParentDirs = absoluteStartDir.length - commonDirs.length;
    const relativeToDir = relativeToParentDirs > 0
      ? [
        ...Array(relativeToParentDirs).fill(".."),
        ...absoluteToDir.slice(commonDirs.length)
      ]
      : [
        "."
      ];

    const toFile = path.getFileName(to);

    return `${relativeToDir.join("/")}/${toFile}`;

  }
};

export const {
  absolute,
  getDirectory,
  getFileExtension,
  getFileName,
  join,
  normalize,
  relative
} = path;

export default path;
