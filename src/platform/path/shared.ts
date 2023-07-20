const path = {
  getDirectory(path: string): string {
    const normalizedPath = this.normalize(path);
    if(normalizedPath === "/" || normalizedPath === "./"){
      return normalizedPath;
    }
    return normalizedPath.split("/")
      .slice(0, -1)
      .join("/");
  },
  getFileExtension(path: string): string {
    const normalizedPath = this.normalize(path);
    if(normalizedPath.includes(".") === false){
      return "";
    }
    const extension = normalizedPath.split(/\./).pop();
    return extension ? `.${extension}` : "";
  },
  getFileName(path: string): string {
    const normalizedPath = this.normalize(path);
    return normalizedPath.split("/").pop() ?? "";
  },
  normalize(path: string): string {
    return path.replace("file://", "")
      .replace(/\\/g, "/");
  },
  relative(from: string, to: string): string {

    const normalizedFrom = this.normalize(from);
    const normalizedTo = this.normalize(to);

    const fromDirectory = path.getDirectory(normalizedFrom);
    const toDirectory = path.getDirectory(normalizedTo);

    const fromParts = fromDirectory.split("/");
    const toParts = toDirectory.split("/");

    const commonParts = fromParts.filter((part, index) => part === toParts[index]);

    const fromDiff = fromParts.slice(commonParts.length);
    const toDiff = toParts.slice(commonParts.length);

    for(let i = 0; i < fromDiff.length; i++){
      toDiff.unshift("..");
    }

    const relativeDirectory = toDiff.join("/") || ".";
    const relativePath = `${relativeDirectory}/${path.getFileName(normalizedTo)}`;

    return relativePath;

  }
};

export const {
  getDirectory,
  getFileExtension,
  getFileName,
  normalize,
  relative
} = path;

export default path;
