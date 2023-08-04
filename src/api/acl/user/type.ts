interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username: string
  password: string
  name: string
  phone?: null
  roleName?: string
}
export type UserRecords = User[]

export interface UserPagerResponseData extends ResponseData {
  data: {
    records: UserRecords
    total: number
    size: number
    current: number
    pages: number
  }
}
export interface UserResponseData extends ResponseData {
  data: User
}

export interface UserRoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}

export interface UserRoleResponseData extends ResponseData {
  data: {
    assignRoles: UserRoleData[]
    allRolesList: UserRoleData[]
  }
}

export interface UserRoleParams {
  roleIdList: number[]
  userId: number
}
