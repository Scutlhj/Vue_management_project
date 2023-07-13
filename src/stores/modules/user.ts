// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入登录接口
import { reqLogin } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入本地存储工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
// 引入常量路由存储在仓库中
import { constantRoute } from '@/router/routes'
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      // 仓库存储生成菜单所需的路由数组
      menuRoutes: constantRoute,
    }
  },
  actions: {
    // async返回一个promise对象
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      // 成功200,失败201
      if (result.code === 200) {
        this.token = result.data.token as string
        // 本地存储持久化存储一份
        SET_TOKEN(this.token)
        // 返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message as string))
      }
    },
  },
  getters: {},
})
export default useUserStore
