// 在这里定义一个插件全局注册
import SvgIcon from '@/components/SvgIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'
// 把所有element-plus图标引入
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const globalComponents = { SvgIcon, Pagination }

export default {
  // 插件的方法必须用install
  //@ts-ignore
  install(app) {
    // 全局注册自定义组件
    Object.keys(globalComponents).forEach((key) => {
      //@ts-ignore
      app.component(key, globalComponents[key])
    })
    // 全局注册element-plus的图标,此处使用entries方法将对象转为一个键值对数组,
    // const obj = {name: 'Alice',age: 25,gender: 'female'}转换后为[["name", "Alice"], ["age", 25], ["gender", "female"]]
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
