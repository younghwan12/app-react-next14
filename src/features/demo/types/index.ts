export type UserListRes = {
    id: string;
    name: string;
    email?: string;
};

export type UserListReq = {
    sp_uid?: string;
    del_yn?: string;
    id?: string;
    name?: string;
    page_startnum?: number;
    page_endnum?: number;
};
