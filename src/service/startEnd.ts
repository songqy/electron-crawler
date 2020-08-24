import config from '@/config';
import { readFile } from '@/modal/file';
import { StartEndOptions } from '@/interface';
import { writeFile } from '@/modal/file';


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
  console.log('set str:' + str);

  await writeFile(config.fileDir + '/start_end.txt', str);
};
