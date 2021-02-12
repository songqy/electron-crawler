import path from 'path';
import config from '@/main/config';
import utils from '@/main/common/utils';
import { ViewPhotoOptions, File, FilesAndParent } from '@/main/interface';
import { getFiles } from '@/main/modal/file';

const fileDir = config.fileDir;


/**
 * 获取文件的一层结构
 */
export const getDirsByParent = async(data: ViewPhotoOptions): Promise<FilesAndParent> =>  {
  const { parent } = data;

  const dest = path.join(fileDir, parent);
  console.log('dest', dest);

  const files = await getFiles(dest);
  const res: File[] = [];
  for (const filePath of files) {
    if (utils.isWhite(filePath)) {
      res.push({
        filePath: filePath,
        children: [],
      });
    }
  }
  return {
    parent,
    files: res,
  };
};
