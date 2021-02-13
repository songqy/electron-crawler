
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

export interface Info {
    title: string,
    desc: string,
    rank?: string,
}

export interface File {
    filePath: string,
    children: File[],
    info?: Info,
}

export interface FilesAndParent {
    parent: string,
    files: File[],
}


export interface InfoAndParent {
    info: Info,
    parent: string,
}
