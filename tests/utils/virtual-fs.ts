export interface VirtualFS {
  [path: string]: VirtualFS | string;
}

const VIRTUAL_FS: VirtualFS = {};

/**
 * Removes all files and directories from the virtual file system.
 */
export function clearVirtualFS() {
  Object.keys(VIRTUAL_FS).forEach(key => delete VIRTUAL_FS[key]);
}

export function existsSync(path: string) {
  const containingDirectory = getContainingDirectoryByPath(path);
  const fileName = getFileNameByPath(path);
  return !!containingDirectory && (fileName === "" || fileName in containingDirectory);
}

export function mkdirSync(path: string, options?: { recursive?: boolean; }) {

  const directories = path.split("/")
    .filter(directory => !!directory);

  let currentDirectory = VIRTUAL_FS;

  for(let i = 0; i < directories.length; i++){
    const directory = directories[i];
    const didExist = directory in currentDirectory;
    currentDirectory[directory] ||= {};
    currentDirectory = currentDirectory[directory] as VirtualFS;
    if(!didExist && !options?.recursive && i < directories.length - 1){
      throw new Error(`ENOENT: no such file or directory, mkdir '${path}'`);
    }
  }

}


export function readFileSync(path: string, options?: any): never | string {
  const containingDirectory = getContainingDirectoryByPath(path);
  const fileName = getFileNameByPath(path);
  const content = containingDirectory?.[fileName];
  if(content && isFile(content)){
    return content;
  } else {
    throw new Error(`ENOENT: no such file or directory, open '${path}'`);
  }
}

export function readdirSync(path: string, options?: { recursive?: boolean; }) {
  const containingDirectory = getContainingDirectoryByPath(path);
  const fileName = getFileNameByPath(path);

  if(!containingDirectory){
    throw new Error(`ENOENT: no such file or directory, scandir '${path}'`);
  }

  if(fileName !== "" && !isDirectory(containingDirectory[fileName])){
    throw new Error(`ENOTDIR: not a directory, scandir '${path}'`);
  }

  const directory: VirtualFS = fileName === ""
    ? containingDirectory
    : containingDirectory[fileName] as VirtualFS;

  if(!options?.recursive){
    return Object.keys(directory);
  } else {
    const readObject = (object: VirtualFS): string[] => {
      return Object.keys(object).map(key => {
        if(isFile(object[key])){
          return [key];
        } else {
          const subDirectory = object[key] as VirtualFS;
          const subDirectoryContent = readObject(subDirectory)
            .map(subDirectoryKey => `${key}/${subDirectoryKey}`);
          return [
            key,
            ...subDirectoryContent
          ];
        }
      })
        .flat();
    };
    return readObject(directory);
  }
}

export function rmSync(path: string, options?: { force?: boolean; recursive?: boolean; }) {

  const containingDirectory = getContainingDirectoryByPath(path);
  const fileName = getFileNameByPath(path);

  if(typeof containingDirectory !== "object" || !(fileName in containingDirectory)){
    throw new Error(`ENOENT: no such file or directory, open '${path}'`);
  }

  if(isFile(containingDirectory[fileName]) ||
    isDirectory(containingDirectory[fileName]) && (Object.keys(containingDirectory[fileName]).length === 0 || options?.recursive)){
    delete containingDirectory[fileName];
  } else {
    throw new Error(`ENOTEMPTY: directory not empty, rmdir '${path}'`);
  }

}

export function writeFileSync(path: string, data: string, options?: any) {
  const containingDirectory = getContainingDirectoryByPath(path);
  const fileName = getFileNameByPath(path);

  if(!containingDirectory || !isDirectory(containingDirectory) || fileName === ""){
    throw new Error(`ENOENT: no such file or directory, open '${path}'`);
  }

  containingDirectory[fileName] = data;
}

function isDirectory(object: VirtualFS | string): object is VirtualFS {
  return typeof object === "object";
}

function isFile(object: VirtualFS | string): object is string {
  return typeof object === "string";
}

/**
 * Get the containing virtual directory of a file by path.
 *
 * @param path The posix path to the file.
 * @returns The containing virtual directory of the file.
 */
function getContainingDirectoryByPath(path: string) {

  const directories = path.split("/")
    .slice(0, -1)
    .filter(directory => !!directory);

  let currentFile = VIRTUAL_FS;

  for(let i = 0; i < directories.length; i++){
    const directory = directories[i];
    const newFile: VirtualFS | string = currentFile[directory];
    if(!newFile){
      return;
    }
    if(isFile(newFile)){
      return currentFile;
    }
    currentFile = newFile;
  }

  return currentFile;

}

function getFileNameByPath(path: string) {
  const directories = path.split("/");
  return directories[directories.length - 1];
}
