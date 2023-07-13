import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import { UserConfigExport, ConfigEnv,loadEnv} from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default ({ command,mode }: ConfigEnv): UserConfigExport => {
  // process.cwd()获取项目根目录(index.html所在的位置)
  // 这个env对象包含了我们文件中的变量
  let env = loadEnv(mode,process.cwd())
  return {
    plugins: [
      vue(),
      viteMockServe({
        // 保证开发阶段可以使用mock
        localEnabled: command === 'serve',
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    server:{
      proxy:{
        // 请求路径必须带的关键字要不然识别不出是代理,配置了代理服务器后访问localhost:5173/api就相当于target
        // 中括号语法参考Array[index],要是index=1就是Array[1]
        [env.VITE_APP_BASE_API]:{
          target:env.VITE_SERVER,
          // 代理服务器在转发请求时自动修改请求头中的 Host 字段，使其与目标服务器的域名相同
          changeOrigin:true,
          rewrite: (path)=> path.replace(/\/api/g, '')
        }
      }
    }
  }
}
