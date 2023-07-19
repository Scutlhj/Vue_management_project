<script lang="ts" setup>
// 获取refresh对象将其修改
import useLayoutSettingStore from '@/stores/modules/setting'
// 获取用户信息
import useUserStore from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'
let userStore = useUserStore()
let layoutSettingStore = useLayoutSettingStore()
let $route = useRoute()
let $router = useRouter()
const switchFullScreen = () => {
  // 没全屏为null或false,全屏为true
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const logout = async () => {
  // 清空仓库信息
  await userStore.userLogout()
  // 跳转登录页面,这里有一个小功能就是保存退出时的path然后登录后重新跳回此处而不是首页
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<template>
  <el-button
    icon="Refresh"
    circle
    @click="layoutSettingStore.changeRefresh()"
  />
  <el-button icon="FullScreen" circle @click="switchFullScreen" />
  <el-button icon="Setting" circle />
  <img
    :src="userStore.avatar"
    style="width: 32px; height: 32px; border-radius: 50%"
  />
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
