
export interface RootState {
    version: string,
}

export type MessageType = 'log' | 'error'

export interface LoggerMessagesOptions {
    type: MessageType;
    message: string;
    index: number,
}


export interface LoggerState {
    loggerMessages: LoggerMessagesOptions[],
}


export interface MessageOptions {
    message: string,
}
