import path from 'path';
import config from '@/main/config';
import utils from '@/main/common/utils';
import { ViewPhotoOptions, File, FilesAndParent, Info, InfoAndParent } from '@/main/interface';
import { readdir, existsFile, readFile, writeFile } from '@/main/modal/file';

const fileDir = config.fileDir;


export const getInfo = async(dest: string): Promise<Info | undefined> => {
  const infoFile = path.join(dest, '/info.json');
  if (await existsFile(infoFile)) {
    const infoBuffer = await readFile(infoFile);
    const info: Info = JSON.parse(infoBuffer.toString());
    return info;
  }
  return;
};

/**
 * 获取文件的一层结构
 */
export const getDirsByParent = async(data: ViewPhotoOptions): Promise<FilesAndParent> =>  {
  const { parent, rank } = data;

  if (rank) {
    const data = await readFile(path.join(fileDir, `rank${rank}.txt`));
    const files = JSON.parse(data.toString());
    return {
      parent,
      files: files.fileList,
    };
  }

  const dest = path.join(fileDir, parent);

  const files = await readdir(dest);
  const res: File[] = [];
  for (const filePath of files) {
    if (utils.isWhite(filePath)) {
      let info: Info | undefined;
      if (utils.isInfo(filePath)) {
        info = await getInfo(dest);
      }
      res.push({
        filePath,
        children: [],
        info,
      });
    }
  }
  return {
    parent,
    files: res,
  };
};

export const setInfo = async(data: InfoAndParent):Promise<void> => {
  const { parent, info } = data;
  const dest = path.join(fileDir, parent, '/info.json');
  await writeFile(dest, JSON.stringify(info));
};
