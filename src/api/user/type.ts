// 登录接口需要携带参数的ts类型
export interface loginForm {
  username: string
  password: string
}
interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 登录后返回的类型
export interface loginResponseData extends ResponseData {
  data: string
}

// 定义服务器返回用户信息的数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
