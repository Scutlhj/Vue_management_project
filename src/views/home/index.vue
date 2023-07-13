<template>
  <div class="layout_container">
    <el-row>
      <el-col :span="4" :offset="0">
        <div class="layout_slider">123</div>
      </el-col>
      <el-col :span="20" :offset="0">
        <el-row>
          <el-col :span="24" :offset="0">
            <div class="layout_tabbar">456</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" :offset="0">
            <div class="layout_main">789</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout_container {
  height: 100vh;
  width: 100%;
  background-color: aqua;

  .layout_slider {
    height: 100vh;
    background-color: $base-menu-background;
  }

  .layout_tabbar {
    height: $base-tabbar-height;
    background-color: brown;
  }

  .layout_main {
    height: calc(100vh - $base-tabbar-height);
    background-color: green;
    padding: 20px;
    overflow: auto;
  }
}
</style>
