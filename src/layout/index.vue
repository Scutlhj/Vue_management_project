<template>
  <div class="layout_container">
    <el-row>
      <!-- 左边导航部分 -->
      <el-col
        :span="layoutSettingStore.fold ? 1 : 4"
        :offset="0"
        class="left_col"
      >
        <div class="layout_slider">
          <Logo></Logo>
          <el-scrollbar class="scrollbar">
            <el-menu
              background-color="#001529"
              text-color="white"
              class="menu"
              :default-active="$route.path"
              :collapse="layoutSettingStore.fold"
            >
              <Menu :menuList="userStore.menuRoutes"></Menu>
            </el-menu>
          </el-scrollbar>
        </div>
      </el-col>
      <!-- 右边内容部分 -->
      <el-col
        :span="layoutSettingStore.fold ? 23 : 20"
        :offset="0"
        class="right_col"
      >
        <el-row>
          <!-- 右边上方的菜单部分 -->
          <el-col :span="24" :offset="0">
            <div class="layout_tabbar">
              <Tabbar></Tabbar>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <!-- 右边下方的内容部分 -->
          <el-col :span="24" :offset="0">
            <div class="layout_main">
              <Main></Main>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<script setup lang="ts">
// 获取当前路由对象
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
// 引入路由仓库
import useUserStore from '@/stores/modules/user'
// 引入设置仓库来读取这个fold
import useLayoutSettingStore from '@/stores/modules/setting'
let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
// 获取$route.path获取当前路径,使用default-active设置默认激活使得刷新后菜单显示正常
let $route = useRoute()
</script>

<style lang="scss" scoped>
.layout_container {
  height: 100vh;
  width: 100%;

  .layout_slider {
    height: 100vh;
    background-color: $base-menu-background;

    // 设置logo下方导航菜单的高度
    .scrollbar {
      height: calc(100vh - $base-menu-logo-height);

      .menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    height: $base-tabbar-height;
  }

  .layout_main {
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    overflow: auto;
  }

  .left_col,
  .right_col {
    transition: all 0.5s;
  }
}
</style>
