import config from '@/main/config';
import { readFile } from '@/main/modal/file';
import { StartEndOptions } from '@/main/interface';
import { writeFile } from '@/main/modal/file';
import logger from '@/main/common/logger';


export const getStartEnd = async(): Promise<StartEndOptions> => {
  const str = await readFile(`${config.fileDir}/start_end.txt`);
  const opt: StartEndOptions = JSON.parse(str.toString());
  return opt;
};


export const setStartEnd = async(start1: number, end2: number): Promise<void> => {
  const s: StartEndOptions = {
    start1,
    end2,
  };
  const str = JSON.stringify(s);
  logger.log('set str:' + str);

  await writeFile(config.fileDir + '/start_end.txt', str);
};
