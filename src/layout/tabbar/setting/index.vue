<script lang="ts" setup>
// 获取refresh对象将其修改
import useLayoutSettingStore from '@/stores/modules/setting'
// 获取用户信息
import useUserStore from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
defineOptions({
  name: 'Setting',
})
let userStore = useUserStore()
let layoutSettingStore = useLayoutSettingStore()
let $route = useRoute()
let $router = useRouter()
let dark = ref<boolean>(false)
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const switchFullScreen = () => {
  // 没全屏为null或false,全屏为true
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const changeDark = () => {
  let html = document.documentElement
  if (dark.value) {
    html.className = 'dark'
  } else {
    html.className = ''
  }
}
const changeTheme = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
  html.style.setProperty('--el-color-info', color.value)
  html.style.setProperty('--el-color-danger', color.value)
  html.style.setProperty('--el-color-warning', color.value)
  html.style.setProperty('--el-color-success', color.value)
}
const logout = async () => {
  // 清空仓库信息
  await userStore.userLogout()
  // 跳转登录页面,这里有一个小功能就是保存退出时的path然后登录后重新跳回此处而不是首页
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<template>
  <el-button icon="Refresh" circle @click="layoutSettingStore.changeRefresh()" />
  <el-button icon="FullScreen" circle @click="switchFullScreen" />
  <el-popover placement="bottom" title="主题设置" :width="300" trigger="click">
    <el-form label-width="70px" :inline="false" size="default">
      <el-form-item label="主题颜色">
        <el-color-picker size="default" v-model="color" show-alpha :predefine="predefineColors"
          @change="changeTheme"></el-color-picker>
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch size="default" active-icon="Moon" inactive-icon="Sunny" v-model="dark" inline-prompt
          @change="changeDark" />
      </el-form-item>
    </el-form>

    <template #reference>
      <el-button icon="Setting" circle />
    </template>
  </el-popover>
  <img :src="userStore.avatar" style="width: 32px; height: 32px; border-radius: 50%" />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
img {
  margin: 0 15px;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 20px;
}
</style>
