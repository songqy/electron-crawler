
type promiseFun = (data: any) => Promise<void>;
type fun = (data: any) => void;

interface actionOption {
  key: string,
  action: promiseFun | fun,
}

type promiseFunction<T> = (...args: any[]) => Promise<T>;

async function promiseGroup<T>(functionList: promiseFunction<T>[], countPerGroup: number): Promise<T[]> {
  let p: Promise<T>[] = [];
  const resList: T[] = [];
  for (let i = 0; i < functionList.length; ++i) {
    p.push(functionList[i]());
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

  createActionsMap: (actions: actionOption[]): Map<string, promiseFun | fun> => {
    const actionMap = new Map<string, promiseFun | fun>();
    for (const item of actions) {
      actionMap.set(item.key, item.action);
    }
    return actionMap;
  },

  promiseGroup,
};
