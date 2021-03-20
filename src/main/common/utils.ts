
type actionFun = ((data: any) => Promise<any>) | ((data: any) => any);

interface actionOption {
  key: string,
  action: actionFun,
}

export interface groupFun<T> {
  fun: (...args: any[]) => Promise<T>,
  args: any[],
}

async function promiseGroup<T>(functionList: groupFun<T>[], countPerGroup: number): Promise<T[]> {
  let p: Promise<T>[] = [];
  const resList: T[] = [];
  for (let i = 0; i < functionList.length; ++i) {
    const { fun, args } = functionList[i];
    p.push(fun(...args));
    if ((i + 1) % countPerGroup === 0) {
      const res = await Promise.all(p);
      resList.push(...res);
      p = [];
    }
  }
  if (p.length > 0) {
    const res = await Promise.all(p);
    resList.push(...res);
  }
  return resList;
}

const blackFiles = [
  '.DS_Store',
  'img_src_list.json',
  'www_1.html',
  'page_url.json',
  'start_end.txt',
];

const blackSuffix = [
  '.zip',
  // '.json',
  '.html',
  '.txt',
];

const checkSuffix = (pathname: string) => {
  return blackSuffix.some(suffix => (new RegExp(suffix)).exec(pathname));
};


export default {
  sleep: (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  createActionsMap: (actions: actionOption[]): Map<string, actionFun> => {
    const actionMap = new Map<string, actionFun>();
    for (const item of actions) {
      actionMap.set(item.key, item.action);
    }
    return actionMap;
  },

  promiseGroup,


  /**
  * 判断是否可以返回
  */
  isWhite: (pathname: string): boolean => {
    return !(blackFiles.includes(pathname) || checkSuffix(pathname));
  },

  /**
  * 判断是否info.json
  */
  isInfo: (pathname: string): boolean => {
    return !!pathname.match(/info\.json/g);
  },


  /**
  * 判断是否文件夹
  */
  isDir: (pathname: string): boolean => {
    return !pathname.match(/\./g);
  },

};
