<script lang="ts" setup>
import { ref } from 'vue';
let scene = ref<boolean>(false)
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
</script>

<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin: 20px 0;">
      <!-- card body -->
      <el-button type="primary" size="default" icon="Plus">添加SPU</el-button>
      <el-table border style="margin: 20px 0;">
        <el-table-column type="index" label="序号" width="100px" align="center" />
        <el-table-column label="SPU名称"></el-table-column>
        <el-table-column label="SPU描述"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <el-pagination
        v-model:currentPage="pageNo"
        :page-sizes="[3, 5, 7, 9]"
        v-model:page-size="pageSize"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="1000"
        :background="true"
        :pager-count="9"
      ></el-pagination>
    </el-card>

  </div>
</template>

<style lang="scss" scoped></style>
