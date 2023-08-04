// 权限相关API
import request from '@/utils/request'
import type {
  RoleData,
  RolePermissionResponseData,
  RoleResponseData,
} from './type'
enum API {
  GETROLEPAGER_URL = '/admin/acl/role/',
  POSTADDROLE_URL = '/admin/acl/role/save',
  PUTUPDATEROLE_URL = '/admin/acl/role/update',
  GETPERMISSION_URL = '/admin/acl/permission/toAssign/',
  POSTSETPERMISSION_URL = '/admin/acl/permission/doAssign',
  DELETEROLE_URL = '/admin/acl/role/remove/',
}
export const reqGetRolePager = (page: number, limit: number, keyword: string) =>
  request.get<any, RoleResponseData>(
    API.GETROLEPAGER_URL + `${page}/${limit}?roleName=${keyword}`,
  )

export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.PUTUPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.POSTADDROLE_URL, data)
  }
}
// 根据职位id获取某职位的权限
export const reqGetPermissionById = (roleID: number) =>
  request.get<any, RolePermissionResponseData>(API.GETPERMISSION_URL + roleID)

// 给职位(角色)分配权限
export const reqPostSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.POSTSETPERMISSION_URL +
      `?roleId=${roleId}&permissionId=${permissionId}`,
  )

// 删除职位(角色)
export const reqDeleteRole = (roleId: number) =>
  request.delete<any, any>(API.DELETEROLE_URL + roleId)
