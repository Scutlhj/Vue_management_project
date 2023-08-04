<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>
<script lang="ts" setup>
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabbar {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  // background-image: linear-gradient(
  //   to right,
  //   #ffffff 0%,
  //   #eeeeee 50%,
  //   #ffffff 100%
  // );

  .tabbar_left,
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
