// 用户管理的接口
import request from "@/utils/request";
import { User, UserPagerResponseData, UserResponseData, UserRoleParams, UserRoleResponseData } from "./type";
enum API {
    // 获取分页用户信息
    GETUSERPAGER_URL = '/admin/acl/user/',
    // 新增用户
    POSTADDUSER_URL = '/admin/acl/user/save',
    // 修改用户信息
    PUTUPDATEUSER_URL = '/admin/acl/user/update',
    // 根据id获取用户信息
    GETUSER_URL = '/admin/acl/user/get/',
    // 获取用户角色
    GETROLE_URL = '/admin/acl/user/toAssign/',
    // 设置用户角色
    SETROLE_URL = '/admin/acl/user/doAssignRole',
    // 删除单个用户
    DELETEUSER_URL = '/admin/acl/user/remove/',
    // 批量删除用户
    DELETEUSERLIST_URL = '/admin/acl/user/batchRemove'
}
// 第三个参数是过滤参数,即根据关键字传入来过滤结果,如果不需要直接传空串就行
export const reqGetUserPager = (page: number, limit: number,keyword:string) => request.get<any, UserPagerResponseData>(API.GETUSERPAGER_URL + `${page}/${limit}?username=${keyword}`)

export const reqAddOrUpdateUser = (data: User) => {
    if (data.id) {
        return request.put<any, any>(API.PUTUPDATEUSER_URL, data)
    } else {
        return request.post<any, any>(API.POSTADDUSER_URL, data)
    }
}

export const reqGetUserInfo = (userId: number) => request.get<any, UserResponseData>(API.GETUSER_URL + userId)

export const reqGetUserRole = (userId: number) => request.get<any, UserRoleResponseData>(API.GETROLE_URL + userId)

export const reqSetUserRole = (data:UserRoleParams) => request.post<any,any>(API.SETROLE_URL,data)

export const reqDeleteUser = (userId:number) => request.delete<any,any>(API.DELETEUSER_URL+userId)

export const reqDeleteUserList = (userIdList:number[])=> request.delete<any,any>(API.DELETEUSERLIST_URL,{data:userIdList})