export type ProjectListRes = {
    id: string;
    projectNo: string;
    projectName: string;
    startDt?: string;
    endDt?: string;
};

export type ProjectListReq = {
    sp_uid?: string;
    del_yn?: string;
    id?: string;
    name?: string;
    page_startnum?: number;
    page_endnum?: number;
};
