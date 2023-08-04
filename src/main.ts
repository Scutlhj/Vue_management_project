import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// 使用element-plus组件库
import 'element-plus/dist/index.css'
// element-plus暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
//@ts-ignore
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// 全局注册组件,没写具体文件会找index.js
import globalComponents from '@/components'
// 使用svg图片
import 'virtual:svg-icons-register'
// 引入全局scss变量
import '@/styles/index.scss'
// 引入路由
import router from './router'
// 引入全局路由守卫
import '@/router/permission'
import pinia from './stores'

import App from '@/App.vue'
const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(globalComponents)
app.use(router)
app.use(pinia)
app.mount('#app')
