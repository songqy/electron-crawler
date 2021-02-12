
export interface StartEndOptions {
    start1: number;
    end2: number;
}

export interface CrawlerOptions {
    s1: number,
    s2: number,
}

export interface ViewPhotoOptions {
    parent: string,
}

export interface File {
    filePath: string,
    children: File[],
}

export interface FilesAndParent {
    parent: string,
    files: File[],
}
