// 定义小仓库数据的类型
// 引入路由对象类型
import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}

// 定义分类仓库state对象的ts类型
export interface CategoryState {
  c1SelectedId: number | string
  c1Arr: CategoryObj[]
  c2SelectedId: number | string
  c2Arr: CategoryObj[]
  c3SelectedId: number | string
  c3Arr: CategoryObj[]
}
