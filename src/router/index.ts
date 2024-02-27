// vue-router实现路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
// 创建路由器
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  // 路由跳转后滚动条立马返回左上角
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
