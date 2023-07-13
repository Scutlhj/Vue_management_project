// 进行axios的二次封装，使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 创建axios实例
let request = axios.create({
  // 基础路径会携带/api
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 设置超时时间
  timeout: 5000,
})
// 实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // 在config中的headers属性给服务器携带公共参数
  // 不返回config的话请求发不出去
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
    let status = error.response.status
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
