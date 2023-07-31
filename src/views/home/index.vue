<script setup lang="ts">
import useUserStore from '@/stores/modules/user';
import { getTime, getCurrentTime } from '@/utils/time';
import setting from '@/setting';
import { onMounted, onUnmounted, ref } from 'vue';
let userStore = useUserStore()
let currentTime = ref<string>(getCurrentTime())
const timer = setInterval(() => {
  currentTime.value = getCurrentTime()
}, 1000)
// 在组件销毁时清理定时器
onUnmounted(() => {
  clearInterval(timer)
})
// 组件挂载时更新一次 currentTime 的值
onMounted(() => {
  currentTime.value = getCurrentTime()
})
</script>

<template>
  <div>
    <el-card>
      <div class="card">
        <img :src="userStore.avatar" :alt="userStore.username">
        <div class="desc">
          <h3>{{ getTime() }}好呀{{ userStore.username }},当前时间为{{ currentTime }}</h3>
          <span>{{ setting.title }}</span>
        </div>
      </div>
    </el-card>
  </div>
  <div class="icon">
    <SvgIcon name="welcome" width="600px" height="480px"></SvgIcon>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;

  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .desc {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h3 {
      font-size: 25px;
      font-weight: 900;
    }

    span {
      font-size: 14px;
      color: gray;
      font-style: italic;
    }
  }
}

.icon {
  display: flex;
  justify-content: center;
}
</style>
