import request from "@/utils/request";
import type { PermissionData, PermissionResponseData } from "./type";
enum API{
    GETALLPERMISSION_URL = '/admin/acl/permission',
    POSTADDPERMISSION_URL = '/admin/acl/permission/save',
    PUTUPDATEPERMISSION_URL = '/admin/acl/permission/update',
    DELETEPERMISSON_URL = '/admin/acl/permission/remove/'
}

export const reqGetAllPermission = ()=> request.get<any,PermissionResponseData>(API.GETALLPERMISSION_URL)

export const reqAddOrUpdatePermission = (data:PermissionData) => {
    if(data.id){
        return request.put<any,any>(API.PUTUPDATEPERMISSION_URL,data)
    }else{
        return request.post<any,any>(API.POSTADDPERMISSION_URL,data)
    }
}

export const reqDeletePermission = (id:number)=> request.delete<any,any>(API.DELETEPERMISSON_URL+id)