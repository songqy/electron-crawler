import { File, Info, RANK } from '@/main/interface';

export interface RootState {
    version: string,
    viewType: 'default' | RANK,
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

export interface Menu {
    value: string,
    label: string,
    index: string,
    children: Menu[],
    hasChildren: boolean,
}

export interface Img {
    src: string,
    index: number,
}


export interface ViewPhotoState {
    /** 渲染menu的数组 */
    menus: Menu[],
    /** 原始的树形结构数据 */
    files: File[],
    /** 当前渲染的图片 */
    imgs: Img[],
    /** 当前图片信息 */
    info: Info,
    /** 当前选中项 */
    parent: string,
}


export interface StatisticsState {
    rankCount: number[],
    totalCount: number,
}
