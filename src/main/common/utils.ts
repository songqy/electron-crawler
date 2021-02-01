
type actionFun = ((data: any) => Promise<void>) | ((data: any) => void);

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
};
