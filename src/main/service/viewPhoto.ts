import path from 'path';
import config from '@/main/config';
import utils from '@/main/common/utils';
import { ViewPhotoOptions, File, FilesAndParent, Info, InfoAndParent } from '@/main/interface';
import { getFiles, existsFile, readFile, writeFile } from '@/main/modal/file';

const fileDir = config.fileDir;


const getInfo = async(dest: string): Promise<Info | undefined> => {
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
  const { parent } = data;

  const dest = path.join(fileDir, parent);

  const files = await getFiles(dest);
  const res: File[] = [];
  for (const filePath of files) {
    if (utils.isWhite(filePath)) {
      let info: Info | undefined;
      if (filePath.match(/info\.json/g)) {
        info = await getInfo(dest);
      }
      res.push({
        filePath: filePath,
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
