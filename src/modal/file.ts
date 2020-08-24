import fs, { WriteFileOptions, PathLike } from 'fs';
import util from 'util';

const _access = util.promisify(fs.access);
const _writeFile = util.promisify(fs.writeFile);
const _readFile = util.promisify(fs.readFile);
const _readdir = util.promisify(fs.readdir);
const _mkdir = util.promisify(fs.mkdir);


export const writeFile = async(path:string, str: string | Buffer, option?: WriteFileOptions):Promise<void> => {
  try {
    await _writeFile(path, str, option);
    console.log(path + ',The file has been saved!');
  } catch (err) {
    console.error(err);
  }
};

export const readFile = async(path: string): Promise<Buffer> => {
  return await _readFile(path);
};

export const existsFile = async(path: PathLike): Promise<boolean> => {
  let flag = true;
  await _access(path).catch(() => {
    flag = false;
  });
  return flag;
};

export const mkdir = async(path: string, options?: WriteFileOptions): Promise<void> => {
  const flag = await existsFile(path);
  if (!flag) {
    await _mkdir(path, options).catch(e => console.error(e));
  }
};

export const getFiles = async(path: string): Promise<string[]> => {
  try {
    const files = await _readdir(path);
    return files;
  } catch (e) {
    console.error(e);
    return [];
  }
};
