<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
const props = defineProps(['menuList'])
let $router = useRouter()
// 这个menu-item会传一个对象进来，其中的index给出了调整的path
const goRoute = (vc: any) => {
  $router.push(vc.index)
}
</script>

<template>
  <template v-for="(item, index) in props.menuList" :key="item.path">
    <!-- 判断是否需要渲染 -->
    <template v-if="item.meta.show">
      <!-- 判断条件没孩子的直接渲染 -->
      <el-menu-item :index="item.path" v-if="!item.children" @click="goRoute">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <!-- 一个孩子直接渲染其孩子节点 -->
      <el-menu-item
        :index="item.children[0].path"
        v-else-if="item.children.length === 1"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
      <!-- 有孩子节点且数量大于等于2 -->
      <el-sub-menu :index="item.path" v-else-if="item.children.length >= 2">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<style lang="scss" scoped></style>
