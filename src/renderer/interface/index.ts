
export interface RootState {
    version: string,
}


export interface LoggerMessagesOption {
    type: 'log' | 'error';
    message: string;
    index: number,
}


export interface LoggerState {
    loggerMessages: LoggerMessagesOption[],
}
