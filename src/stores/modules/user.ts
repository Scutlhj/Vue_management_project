// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入登录接口,获取用户信息接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入数据类型
import type {
  loginForm,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import type { UserState } from './types/type'
// 引入本地存储工具方法
import { SET_TOKEN, GET_TOKEN, DELETE_TOKEN } from '@/utils/token'
// 引入常量路由存储在仓库中
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import { cloneDeep } from 'lodash'

const collectRouteNames = (routes: RouteRecordRaw[]) => {
  const routeNames: string[] = [];
  routes.forEach(route => {
    if (route.name) {
      routeNames.push(route.name as string);
    }
    if (route.children && route.children.length > 0) {
      const childRouteNames = collectRouteNames(route.children);
      routeNames.push(...childRouteNames);
    }
  });
  return routeNames;
}

const asyncRouteFilter = (asyncRoute: RouteRecordRaw[], filterArr: string[]) => {
  return asyncRoute.filter((item: RouteRecordRaw) => {
    if (item.children && item.children.length > 0) {
      item.children = asyncRouteFilter(item.children, filterArr)
    }
    if (filterArr.includes(item.name as string)) {
      return true
    }
  })
}

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      // 仓库存储生成菜单所需的路由数组
      menuRoutes: constantRoute,
      // 可使用的按钮字符串数组
      buttons: [],
      // 用户名,登录后调用方法获取
      username: '',
      // 头像
      avatar: '',
    }
  },
  actions: {
    // async返回一个promise对象
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      // 成功200,失败201
      if (result.code === 200) {
        this.token = result.data as string
        // 本地存储持久化存储一份
        SET_TOKEN(this.token)
        // 返回一个成功的promise
        console.log(router.getRoutes())
        return Promise.resolve('登录成功')
      } else {
        return Promise.reject(new Error(result.data as string))
      }
    },
    async getUserInfo() {
      let result: userInfoResponseData = await reqUserInfo()
      console.log(result)
      // 如果token正确
      if (result.code === 200) {
        this.username = result.data.name as string
        this.avatar = result.data.avatar as string
        this.buttons = result.data.buttons
        console.log(result.data.buttons)
        // 根据data.routes自动添加路由
        let asyncRoute_ = asyncRouteFilter(cloneDeep(asyncRoute), result.data.routes)
        this.menuRoutes = [...constantRoute, ...asyncRoute_, ...anyRoute] as RouteRecordRaw[]
        // 先移除上个账号可能留下的东西
        let constantRouteName = collectRouteNames(constantRoute)
        const routesToRemove: string[] = [];
        router.getRoutes().forEach((item) => {
          if (!constantRouteName.includes(item.name as string)) {
            routesToRemove.push(item.name as string);
          }
        });
        // console.log(constantRouteName, routesToRemove, router.getRoutes(), '哈哈哈')
        routesToRemove.forEach((routeName) => {
          router.removeRoute(routeName);
        });
        // 把router对象添加
        ;[...asyncRoute_, ...anyRoute].forEach((item: RouteRecordRaw) => {
          router.addRoute(item)
        })
        console.log(router.getRoutes())
        return Promise.resolve('获取用户信息成功')
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      let result: any = await reqLogout()
      if (result.code === 200) {
        // 数据清空
        ; (this.token = ''),
          (this.username = ''),
          (this.avatar = ''),
          DELETE_TOKEN()
        return Promise.resolve('退出成功')
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
})
export default useUserStore
