<script lang="ts" setup>
// 将svg-icon封装为通用组件
defineProps({
  perfix: {
    type: String,
    default: '#icon-',
  },
  name: {
    type: String,
    require: true,
  },
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<template>
  <svg :style="{ width: width, height: height }">
    <use :xlink:href="perfix + name" :fill="color"></use>
  </svg>
</template>

<style lang="scss" scoped></style>
