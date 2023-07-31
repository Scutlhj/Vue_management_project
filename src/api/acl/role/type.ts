interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
export interface RoleData {
    id?: number,
    createTime?: string,
    updateTime?: string,
    roleName: string,
    remark?: null
}
export interface RoleResponseData extends ResponseData {
    data: {
        records: RoleData[],
        total: number,
        size: number,
        current: number,
        pages: number
    }
}
// 定义权限数据
export interface RolePermissonData {
    id: number,
    createTime: string,
    updateTime: string,
    pid: number,
    name: string,
    code: string,
    toCode: null,
    type: number,
    status: null,
    level: number,
    children: RolePermissonData[],
    select: boolean
}
export interface RolePermissionResponseData extends ResponseData{
    data:RolePermissonData[]
}