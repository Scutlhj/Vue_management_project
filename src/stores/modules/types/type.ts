// 定义小仓库数据的类型
// 引入路由对象类型
import type { RouteRecordRaw } from 'vue-router'
export interface UserState {
  token: string | null,
  menuRoutes: RouteRecordRaw[],
  username:string,
  avatar:string
}
