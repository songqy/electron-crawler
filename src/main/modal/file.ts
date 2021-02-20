import fs, { WriteFileOptions, PathLike } from 'fs';
import logger from '@/main/common/logger';

export const writeFile = async(path:string, str: string | Buffer, option?: WriteFileOptions): Promise<void> => {
  await fs.promises.writeFile(path, str, option)
    .then(() => logger.log(path + ',The file has been saved!'))
    .catch((err) => logger.error(err));
};

export const readFile = async(path: string): Promise<Buffer> => {
  return await fs.promises.readFile(path);
};

export const existsFile = async(path: PathLike): Promise<boolean> => {
  let flag = true;
  await fs.promises.access(path).catch(() => {
    flag = false;
  });
  return flag;
};

export const mkdir = async(path: string, options?: WriteFileOptions): Promise<void> => {
  const flag = await existsFile(path);
  if (!flag) {
    await fs.promises.mkdir(path, options).catch(e => logger.error(e));
  }
};

export const readdir = async(path: string): Promise<string[]> => {
  return await fs.promises.readdir(path);
};
