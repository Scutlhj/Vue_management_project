<script setup lang="ts">
import { Plus, Edit } from '@element-plus/icons-vue'
import { reqLogin } from '@/api/user'
import { onMounted } from 'vue'
onMounted(() => {
  reqLogin({
    username: 'admin',
    password: '111111',
  }).then((response) => {
    console.log(response)
  })
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped lang="scss"></style>
