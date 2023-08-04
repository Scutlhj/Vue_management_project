<script lang="ts">
export default {
  name: 'Main',
}
</script>
<script lang="ts" setup>
// 使用setting这个store的refresh监控其是否刷新
import useLayoutSettingStore from '@/stores/modules/setting'
import { ref, watch, nextTick } from 'vue'
let layoutSettingStore = useLayoutSettingStore()
// 通过这个watcher控制组件是否显示
let watcher = ref(true)
watch(
  () => layoutSettingStore.refresh,
  () => {
    // 改成false将组件销毁
    watcher.value = false
    // 渲染完DoM后再改回true重新挂载
    nextTick(() => {
      watcher.value = true
    })
  },
)
</script>

<template>
  <!-- 渲染二级路由之位置 v-slot的应用使得其可以添加动画 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="watcher" />
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
