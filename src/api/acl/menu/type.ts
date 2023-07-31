interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}
// 添加的时候需要pid,name,code,level,修改多加一个id
export interface PermissionData{
    id?: number,
    createTime?: string,
    updateTime?: string,
    pid: number,
    name: string,
    code: string,
    toCode?: null,
    type?: number,
    status?: null,
    level: number,
    children?: PermissionData[],
    select?: boolean
}
export interface PermissionResponseData extends ResponseData{
    data:PermissionData[]
}