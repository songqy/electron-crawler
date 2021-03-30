import path from 'path';
import { writeFile, existsFile, readFile } from '@/main/modal/file';
import config from '@/main/config';
import utils from '@/main/common/utils';
import logger from '@/main/common/logger';
import { File, RANK } from '@/main/interface';
import { getDirsByParent } from './viewPhoto';

const fileDir = config.fileDir;

const getFileTree = async (parent: string): Promise<File[]> => {
  const fileList: File[] = [];
  if (!utils.isDir(parent)) return fileList;
  if (parent.split('/').length === 2) {
    logger.log(parent);
  }

  const res = await getDirsByParent({ parent: parent || '/' });
  if (res.files.length > 0) {
    for (const file of res.files) {
      const children = await getFileTree(parent + '/' + file.filePath);
      const infoFile = children.find(v => utils.isInfo(v.filePath));
      if (infoFile) {
        fileList.push({
          filePath: file.filePath,
          children: [],
          rank: infoFile.info?.rank,
        });
      } else {
        fileList.push({
          filePath: file.filePath,
          children,
          info: file.info,
        });
      }
    }
  }

  return fileList;
};

// 将树形结构拍平
const flatList = (fileList: File[], parent: string, rank1: string[], rank2: string[], rank3: string[], rank4: string[], rank5: string[]) => {
  for (const file of fileList) {
    if (file.rank === RANK.RANK1) {
      rank1.push(parent + '/' + file.filePath);
    } else if (file.rank === RANK.RANK2) {
      rank2.push(parent + '/' + file.filePath);
    } else if (file.rank === RANK.RANK3) {
      rank3.push(parent + '/' + file.filePath);
    } else if (file.rank === RANK.RANK4) {
      rank4.push(parent + '/' + file.filePath);
    } else if (file.rank === RANK.RANK5) {
      rank5.push(parent + '/' + file.filePath);
    } else {
      flatList(file.children, parent + '/' + file.filePath, rank1, rank2, rank3, rank4, rank5);
    }
  }
};

const insertTree = (fileList: File[], dirList: string[]) => {
  if (!dirList.length) return;
  let target = fileList.find(f => f.filePath === dirList[0]);
  if (!target) {
    target = {
      filePath: dirList[0],
      children: [],
    };
    fileList.push(target);
  }

  insertTree(target.children, dirList.slice(1));
};

// 还原成树形结构
const parseTree = (rankList: string[]) => {
  const fileList: File[] = [];
  for (const r of rankList) {
    const dirList = r.split('/');
    insertTree(fileList, dirList.slice(1));
  }
  return fileList;
};

const groupRanks = (fileList: File[]) => {
  const rank1: string[] = [];
  const rank2: string[] = [];
  const rank3: string[] = [];
  const rank4: string[] = [];
  const rank5: string[] = [];

  flatList(fileList, '', rank1, rank2, rank3, rank4, rank5);

  logger.log('rank1 count:', rank1.length);
  logger.log('rank2 count:', rank2.length);
  logger.log('rank3 count:', rank3.length);
  logger.log('rank4 count:', rank4.length);
  logger.log('rank5 count:', rank5.length);

  return { rank1, rank2, rank3, rank4, rank5 };
};

export const startStatistics = async (forced = true): Promise<void> => {
  const statisticsFile = path.join(fileDir, 'statistics.txt');

  let fileList: File[];
  if (!forced && await existsFile(statisticsFile)) {
    const s = await readFile(statisticsFile);
    const obj = JSON.parse(s.toString());
    fileList = obj.fileList;
  } else {
    fileList = await getFileTree('');
  }


  const { rank1, rank2, rank3, rank4, rank5 } = groupRanks(fileList);

  const str = JSON.stringify({
    fileList,
    rankCount: [rank1.length, rank2.length, rank3.length, rank4.length, rank5.length],
  });
  await writeFile(statisticsFile, str);


  const treeRank1 = parseTree(rank1);
  const treeRank2 = parseTree(rank2);
  const treeRank3 = parseTree(rank3);
  const treeRank4 = parseTree(rank4);
  const treeRank5 = parseTree(rank5);

  await writeFile(path.join(fileDir, 'rank1.txt'), JSON.stringify({ fileList: treeRank1 }));
  await writeFile(path.join(fileDir, 'rank2.txt'), JSON.stringify({ fileList: treeRank2 }));
  await writeFile(path.join(fileDir, 'rank3.txt'), JSON.stringify({ fileList: treeRank3 }));
  await writeFile(path.join(fileDir, 'rank4.txt'), JSON.stringify({ fileList: treeRank4 }));
  await writeFile(path.join(fileDir, 'rank5.txt'), JSON.stringify({ fileList: treeRank5 }));
};


export const getRankCount = async(): Promise<number[]> => {
  let rankCount = [0, 0, 0, 0, 0];
  const statisticsFile = path.join(fileDir, 'statistics.txt');
  if (await existsFile(statisticsFile)) {
    const s = await readFile(statisticsFile);
    const obj = JSON.parse(s.toString());
    rankCount = obj.rankCount;
  }
  return rankCount;
};
