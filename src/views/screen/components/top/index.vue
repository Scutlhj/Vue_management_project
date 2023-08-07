<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import router from '@/router'
import { getCurrentTime } from '@/utils/time'
let currentTime = ref<string>(getCurrentTime())
const timer = setInterval(() => {
  currentTime.value = getCurrentTime()
}, 1000)
// 在组件销毁时清理定时器
onBeforeUnmount(() => {
  clearInterval(timer)
})
// 组件挂载时更新一次 currentTime 的值
onMounted(() => {
  currentTime.value = getCurrentTime()
})
defineOptions({
  name: 'Top',
})
</script>

<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="router.push('/')">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据展示平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间:{{ currentTime }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  display: flex;

  .left {
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: 100% 100%;
    height: 100%;

    .lbtn {
      float: right;
      height: 100%;
      width: 150px;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fbff;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .center {
    flex: 2;
    height: 74px;
    .title {
      width: 100%;
      height: 100%;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
      letter-spacing: 4px;
    }
  }

  .right {
    height: 100%;
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: 100% 100%;
    color: #29fcff;
    font-size: 20px;
    display: flex;
    align-items: center;
    text-align: center;
    line-height: 40px;

    .rbtn {
      height: 100%;
      width: 150px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }

    .time {
      flex: auto;
    }
  }
}
</style>
