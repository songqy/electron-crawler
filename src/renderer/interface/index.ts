
export interface RootState {
    version: string,
}


export interface LoggerMessagesOption {
    type: 'log' | 'error';
    message: string;
}


export interface LoggerState {
    loggerMessages: LoggerMessagesOption[],
}
