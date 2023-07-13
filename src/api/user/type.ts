// 登录接口需要携带参数的ts类型
export interface loginForm {
  username: String
  password: String
}
interface dataType {
  token?: String
  message?: String
}
// 登录后返回的类型
export interface loginResponseData {
  code: Number
  data: dataType
}
interface userInfo {
  userId: Number
  avatar: String
  username: String
  password: String
  desc: String
  roles: string[]
  buttons: string[]
  routes: string[]
  token: String
}
interface user {
  checkUser: userInfo
}
// 定义服务器返回用户信息的数据类型
export interface userResponseData {
  code: Number
  data: user
}
