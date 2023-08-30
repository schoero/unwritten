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

    const { pathWithoutRoot: fromWithoutRoot, root: fromRoot } = extractRoot(deps, normalizedFrom);
    const { pathWithoutRoot: toWithoutRoot, root: toRoot } = extractRoot(deps, normalizedTo);
    const { pathWithoutRoot: cwdWithoutRoot, root: cwdRoot } = extractRoot(deps, normalizedCwd);
    const { pathWithoutRoot: homeWithoutRoot, root: homeRoot } = extractRoot(deps, normalizedHome);

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
  extractRoot(deps: Dependencies, path: string): { pathWithoutRoot: string; root: string; } {
    const [fullUnc, uncRoot] = path.match(/^\\?(\\\\)/) ?? [];
    const [fullDos, dosRoot] = path.match(/^\\?([A-Za-z]:\\|^\\)/) ?? [];
    const [fullPosix, posixRoot] = path.match(/^\/?(\/)/) ?? [];

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const root = uncRoot ?? dosRoot ?? posixRoot ?? "";
    const fullRoot = fullUnc ?? fullDos ?? fullPosix ?? "";

    const pathWithoutRoot = path.slice(fullRoot.length);

    return {
      pathWithoutRoot,
      root
    };

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

    const segmentsWithExtractedRoot = segments.reduce<string[]>((acc, segment) => {
      if(isAbsolute(segment) && root === ""){
        acc = [];
        const extractedRoot = extractRoot(deps, segment);
        root = extractedRoot.root;
        segment = extractedRoot.pathWithoutRoot;
      }
      acc.push(segment);
      return acc;
    }, []);

    const directorySegments = segmentsWithExtractedRoot.map((segment, index) => {
      return getFileExtension(deps, segment) !== ""
        ? getDirectory(deps, segment)
        : segment;
    });

    const fileName = segmentsWithExtractedRoot.reduce<string | undefined>((fileName, segment, index) => {
      return getFileExtension(deps, segment) !== ""
        ? getFileName(deps, segment)
        : fileName;
    }, undefined);

    const combinedSegments = [...directorySegments, fileName]
      .filter(segment => !!segment)
      .join(separator);

    const normalizedSegments = normalize(deps, combinedSegments);
    const trailingSegment = normalizedSegments.endsWith(separator)
      ? separator
      : "";
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

    return `${root}${joinedPath}${trailingSegment}`;
  },
  normalize(deps: Dependencies, path: string): string {

    const { separator } = deps;
    const dosSeparator = "\\";
    const posixSeparator = "/";

    const pathWithoutProtocols = path
      .replace(/^[A-Za-z]*:\/\//, "");

    const pathWithCorrectedSeparators = pathWithoutProtocols
      .replace(new RegExp(`\\${dosSeparator}`, "g"), separator)
      .replace(new RegExp(`${posixSeparator}`, "g"), separator);

    const { pathWithoutRoot, root } = extractRoot(deps, pathWithCorrectedSeparators);
    const correctedRoot = root
      .replace(new RegExp(`\\${dosSeparator}`, "g"), separator)
      .replace(new RegExp(`${posixSeparator}`, "g"), separator);

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
  extractRoot,
  getDirectory,
  getFileExtension,
  getFileName,
  join,
  normalize,
  relative
} = path;

export default path;
