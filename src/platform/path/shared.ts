interface Dependencies {
  cwd(): string;
  homeDirectory(): string;
  isAbsolute(path: string): boolean;
  separator: string;
}

const path = {
  absolute(deps: Dependencies, from: string, to: string): string {

    const { isAbsolute, separator } = deps;

    const normalizedFrom = normalize(deps, from);
    const normalizedTo = normalize(deps, to);
    const normalizedCwd = normalize(deps, deps.cwd());
    const normalizedHome = normalize(deps, deps.homeDirectory());

    const toFile = getFileName(deps, normalizedTo);

    const fromDirIsAbsolute = isAbsolute(normalizedFrom);
    const toDirIsAbsolute = isAbsolute(normalizedTo);

    const fromDirIsHome = normalizedFrom.startsWith("~");
    const toDirIsHome = normalizedTo.startsWith("~");

    const fromRoot = getAbsoluteRoot(deps, normalizedFrom);
    const toRoot = getAbsoluteRoot(deps, normalizedTo);
    const cwdRoot = getAbsoluteRoot(deps, normalizedCwd);
    const homeRoot = getAbsoluteRoot(deps, normalizedHome);

    const fromWithoutRoot = normalizedFrom.slice(fromRoot.length);
    const toWithoutRoot = normalizedTo.slice(toRoot.length);
    const cwdWithoutRoot = normalizedCwd.slice(cwdRoot.length);
    const homeWithoutRoot = normalizedHome.slice(homeRoot.length);

    const fromDirectory = getDirectory(deps, fromWithoutRoot);
    const toDirectory = getDirectory(deps, toWithoutRoot);
    const cwdDirectory = getDirectory(deps, cwdWithoutRoot);
    const homeDirectory = getDirectory(deps, homeWithoutRoot);

    const fromParts = fromDirectory
      .split(separator)
      .filter(part => part !== "" && part !== "." && part !== "~");
    const toParts = toDirectory
      .split(separator)
      .filter(part => part !== "" && part !== "." && part !== "~");
    const cwdParts = cwdDirectory
      .split(separator)
      .filter(part => part !== "" && part !== "." && part !== "~");
    const homeParts = homeDirectory
      .split(separator)
      .filter(part => part !== "" && part !== "." && part !== "~");

    const fromPartsWithoutUnnecessaryParentParts = fromParts.reduce<string[]>((acc, part) => {
      if(part === ".." && acc.length > 0 && acc[0] !== ".."){
        acc.pop();
      } else {
        acc.push(part);
      }
      return acc;
    }, []);

    const toPartsWithoutUnnecessaryParentParts = toParts.reduce<string[]>((acc, part) => {
      if(part === ".." && acc.length > 0 && acc[0] !== ".."){
        acc.pop();
      } else {
        acc.push(part);
      }
      return acc;
    }, []);

    const commonParts = fromDirIsAbsolute && toDirIsAbsolute || fromDirIsHome && toDirIsHome
      ? fromPartsWithoutUnnecessaryParentParts.filter((dir, index) => dir === toPartsWithoutUnnecessaryParentParts[index])
      : [];
    const commonDirs = commonParts.length;

    const absoluteFromParts = fromDirIsAbsolute
      ? fromPartsWithoutUnnecessaryParentParts
      : fromDirIsHome
        ? [
          ...homeParts,
          ...fromPartsWithoutUnnecessaryParentParts
        ]
        : [
          ...cwdParts,
          ...fromPartsWithoutUnnecessaryParentParts
        ];


    const absoluteToParts = toDirIsAbsolute
      ? toPartsWithoutUnnecessaryParentParts
      : toDirIsHome
        ? [
          ...homeParts,
          ...toPartsWithoutUnnecessaryParentParts
        ]
        : [
          ...absoluteFromParts.slice(0, absoluteFromParts.length - commonDirs),
          ...toPartsWithoutUnnecessaryParentParts
        ];

    const absoluteToPartsWithoutUnnecessaryParentParts = absoluteToParts.reduce<string[]>((acc, part) => {
      if(part === ".."){
        acc.pop();
      } else {
        acc.push(part);
      }
      return acc;
    }, []);

    const absoluteToPath = absoluteToPartsWithoutUnnecessaryParentParts.join(separator);

    const root = toRoot || fromRoot || cwdRoot || homeRoot || separator;

    return absoluteToPath.length > 0
      ? `${root}${absoluteToPath}${separator}${toFile}`
      : `${root}${toFile}`;

  },
  getAbsoluteRoot(deps: Dependencies, path: string): string {

    const [dosRoot] = path.match(/^([A-Za-z]:\\|^\\)/) ?? [];
    const [posixRoot] = path.match(/^(\/)/) ?? [];
    const [uncRoot] = path.match(/^(\\\\)/) ?? [];

    return uncRoot ?? dosRoot ?? posixRoot ?? "";

  },
  getDirectory(deps: Dependencies, path: string): string {

    const { separator } = deps;

    const normalizedPath = normalize(deps, path);

    if(normalizedPath === separator || normalizedPath === `.${separator}`){
      return normalizedPath;
    }

    return normalizedPath
      .split(separator)
      .slice(0, -1)
      .concat("")
      .join(separator);
  },
  getFileExtension(deps: Dependencies, path: string): string {

    const { separator } = deps;

    const normalizedPath = normalize(deps, path);
    if(normalizedPath.includes(".") === false){
      return "";
    }
    const extension = normalizedPath.split(/\./).pop();
    return extension ? `.${extension}` : "";
  },
  getFileName(deps: Dependencies, path: string, includeExtension: boolean = true): string {

    const { separator } = deps;

    const normalizedPath = normalize(deps, path);
    const fileNameWithExtension = normalizedPath.split(separator).pop() ?? "";

    if(includeExtension === true){
      return fileNameWithExtension;
    }

    const extension = getFileExtension(deps, fileNameWithExtension);
    return fileNameWithExtension.replace(extension, "");

  },
  join(deps: Dependencies, ...segments: string[]): string {

    const { isAbsolute, separator } = deps;

    let root: string = "";

    const maxOneAbsoluteSegment = segments.reduce<string[]>((acc, segment) => {
      if(isAbsolute(segment)){
        acc = [];
        root = getAbsoluteRoot(deps, segment);
        segment = segment.slice(root.length);
      }
      acc.push(segment);
      return acc;
    }, []);

    const directorySegments = maxOneAbsoluteSegment.map((segment, index) => {
      if(index === maxOneAbsoluteSegment.length - 1){
        return segment;
      }
      return getDirectory(deps, segment);
    });

    const combinedSegments = directorySegments.join(separator);
    const normalizedSegments = normalize(deps, combinedSegments);
    const individualSegments = normalizedSegments.split(separator)
      .filter(segment => segment !== "" && segment !== "." && segment !== "~");

    const individualSegmentWithoutUnnecessaryParentPaths = individualSegments.reduce<string[]>((acc, part) => {
      if(part === ".."){
        acc.pop();
      } else {
        acc.push(part);
      }
      return acc;
    }, []);

    const joinedPath = individualSegmentWithoutUnnecessaryParentPaths.join(separator);

    return `${root}${joinedPath}`;
  },
  normalize(deps: Dependencies, path: string): string {

    const { separator } = deps;
    const dosSeparator = "\\";
    const posixSeparator = "/";

    const pathWithoutProtocols = path
      .replace(/^[A-Za-z]*:\/\//, "");

    const pathWithoutLeadingSlashes = pathWithoutProtocols.replace(/^\/+/, "");
    const windowsRoot = getAbsoluteRoot(deps, pathWithoutLeadingSlashes);

    let preparedPath = pathWithoutProtocols;

    if(windowsRoot !== ""){
      preparedPath = pathWithoutLeadingSlashes;
    }

    const root = getAbsoluteRoot(deps, preparedPath);
    const correctedRoot = root
      .replace(new RegExp(`\\${dosSeparator}+`, "g"), separator)
      .replace(new RegExp(`${posixSeparator}+`, "g"), separator);

    const pathWithoutRoot = preparedPath.slice(correctedRoot.length);

    const pathWithNormalizedSeparators = pathWithoutRoot
      .replace(new RegExp(`\\${dosSeparator}+`, "g"), separator)
      .replace(new RegExp(`${posixSeparator}+`, "g"), separator);

    return `${correctedRoot}${pathWithNormalizedSeparators}`;

  },
  relative(deps: Dependencies, from: string, to: string): string {

    const { cwd, separator } = deps;

    const absoluteCwd = cwd();

    const absoluteStartDir = getDirectory(deps, absolute(deps, absoluteCwd, from)).split(separator)
      .filter(part => part !== "");
    const absoluteToDir = getDirectory(deps, absolute(deps, from, to)).split(separator)
      .filter(part => part !== "");

    const commonParts = absoluteStartDir.filter((dir, index) => dir === absoluteToDir[index]);
    const commonDirs = commonParts.length;

    const relativeToParentDirs = absoluteStartDir.length - commonDirs;
    const relativeToDir = relativeToParentDirs > 0
      ? [
        ...Array(relativeToParentDirs).fill(".."),
        ...absoluteToDir.slice(commonDirs)
      ]
      : [
        "."
      ];

    const toFile = path.getFileName(deps, to);

    return `${relativeToDir.join(separator)}${separator}${toFile}`;

  }
};

export const {
  absolute,
  getAbsoluteRoot,
  getDirectory,
  getFileExtension,
  getFileName,
  join,
  normalize,
  relative
} = path;

export default path;
