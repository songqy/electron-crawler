
export interface StartEndOptions {
    start1: number;
    end2: number;
}

export interface CrawlerOptions {
    s1: number,
    s2: number,
}

export enum RANK {
    RANK1 = 1,
    RANK2,
    RANK3,
    RANK4,
    RANK5,
 }
export interface ViewPhotoOptions {
    parent: string,
    rank?: RANK,
}

export interface Info {
    title: string,
    desc: string,
    rank?: RANK,
}

export interface File {
    filePath: string,
    children: File[],
    info?: Info,
    rank?: RANK,
}

export interface FilesAndParent {
    parent: string,
    files: File[],
}

export interface InfoAndParent {
    info: Info,
    parent: string,
}
