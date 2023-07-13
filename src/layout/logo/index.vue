<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<script lang="ts" setup>
// 引入设置配置文件
import setting from '@/setting'
// 这里使用这个fold数据来动态隐藏这个文字
import useLayoutSettingStore from '@/stores/modules/setting'
let layoutSettingStore = useLayoutSettingStore()
</script>

<template>
  <div class="logo">
    <img :src="setting.logo" :alt="setting.des" v-show="setting.logoHidden" />
    <p v-show="!layoutSettingStore.fold">{{ setting.title }}</p>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
    font-weight: bold;
  }
}
</style>
