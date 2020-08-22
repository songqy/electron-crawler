import fs from 'fs';
import util from 'util';


const writeFile = util.promisify(fs.writeFile);


export const write = async(path:string, str:string):Promise<void> => {
  await writeFile(path, str);
};
