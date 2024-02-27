// 进行axios的二次封装，使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 很有意思的一个设定,就是登录后会将通过相应拦截器将response中的data中的token拿出来放在仓库中
// 而仓库使用getUserInfo方法时请求用户名与头像时也会经过这个请求拦截器,而这个拦截器本身又使用仓库中的token字段来包装请求头才能获取用户数据
import useUserStore from '@/stores/modules/user'
// 创建axios实例
const request = axios.create({
  // 基础路径会携带/api
  //@ts-expect-error typeErr
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 设置超时时间
  timeout: 2000,
})
// 实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // 在config中的headers属性给服务器携带公共参数
  // 不返回config的话请求发不出去
  const userStore = useUserStore()
  // 有token将将其放在请求头中
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})

// 配置响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功回调
    return response.data
  },
  (error) => {
    // 失败回调
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    // 返回一个promise失败对象
    return Promise.reject(error)
  },
)

export default request
