<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<script lang="ts" setup>
// 获取路由对象
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/stores/modules/setting'
let layoutSettingStore = useLayoutSettingStore()
let $route = useRoute()
</script>

<template>
  <el-icon class="fold_icon" @click="layoutSettingStore.changeFold">
    <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      :to="item.path"
    >
      <el-icon class="route_icon">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.fold_icon {
  margin: 0 15px;
}

.route_icon {
  vertical-align: top;
  margin-right: 3px;
}
</style>
