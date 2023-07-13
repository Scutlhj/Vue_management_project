<script lang="ts" setup>
import useLayoutSettingStore from '@/stores/modules/setting'
let layoutSettingStore = useLayoutSettingStore()
const switchFullScreen = () => {
  // 没全屏为null或false,全屏为true
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
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
  <img src="/logo.png" style="width: 32px; height: 32px" />
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
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
