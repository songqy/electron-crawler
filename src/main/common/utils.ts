
type promiseFun = (data: any) => Promise<void>;
type fun = (data: any) => void;

interface actionOption {
  key: string,
  action: promiseFun | fun,
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
};
