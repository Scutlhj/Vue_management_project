import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import router from '.'
import pinia from '@/stores'
import useUserStore from '@/stores/modules/user'
import setting from '@/setting'
//@ts-ignore
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
// 这个文件没有pinia大仓库要手动引入
let userStore = useUserStore(pinia)
// 全局前置守卫
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    nprogress.start()
    let token = userStore.token
    let username = userStore.username
    if (token) {
      // 除了登录全部放行
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        // 每次还得检查username,放止刷新之后没了那个username和头像
        if (username) {
          next()
        } else {
          try {
            // 尝试通过token获取用户信息,获取成功后放行,每次切换路由时如果没有username都会尝试获取
            await userStore.getUserInfo()
            next(to)
          } catch (error) {
            // token过期或者手动改了token,也得添加await等到退出完再重定向
            await userStore.userLogout()
            next({ path: '/login', query: { redirect: to.path } })
          }
        }
      }
    } else {
      // 只会重定向到登录
      if (to.path === '/login') {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  },
)
// 全局后置守卫
router.afterEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    document.title = setting.title + ' - ' + to.meta.title
    nprogress.done()
  },
)
// 解决问题1:任意路由切换实现路由切换
// 解决问题2:路由授权
// 路由:login|404|Any|首页|screen|权限管理|商品管理、
// 未登录:除了login都不行(其他全部跳回login)
// 登录:不能访问login(login指回首页)
