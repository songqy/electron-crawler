
export interface RootState {
    version: string,
}

export type MessageType = 'log' | 'error'

export interface LoggerMessagesOption {
    type: MessageType;
    message: string;
    index: number,
}


export interface LoggerState {
    loggerMessages: LoggerMessagesOption[],
}
