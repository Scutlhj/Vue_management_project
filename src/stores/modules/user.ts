// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入登录接口,获取用户信息接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponseData, userInfoResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入本地存储工具方法
import { SET_TOKEN, GET_TOKEN, DELETE_TOKEN } from '@/utils/token'
// 引入常量路由存储在仓库中
import { constantRoute } from '@/router/routes'
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      // 仓库存储生成菜单所需的路由数组
      menuRoutes: constantRoute,
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
      console.log(result)
      // 成功200,失败201
      if (result.code === 200) {
        this.token = result.data as string
        // 本地存储持久化存储一份
        SET_TOKEN(this.token)
        // 返回一个成功的promise
        return Promise.resolve('登录成功')
      } else {
        return Promise.reject(new Error(result.data as string))
      }
    },
    async getUserInfo() {
      let result: userInfoResponseData = await reqUserInfo()
      // 如果token正确
      if (result.code === 200) {
        this.username = result.data.name as string
        this.avatar = result.data.avatar as string
        return Promise.resolve('获取用户信息成功')
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      let result: any = await reqLogout()
      if (result.code === 200) {
        // 数据清空
          this.token = '',
          this.username = '',
          this.avatar = '',
          DELETE_TOKEN()
        return Promise.resolve('退出成功')
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
})
export default useUserStore
