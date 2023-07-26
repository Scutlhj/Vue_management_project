<script lang="ts" setup>
import useCategoryStore from '@/stores/modules/category'
import { onMounted, onBeforeUnmount } from 'vue'
let categoryStore = useCategoryStore()
defineProps(['scene'])
const getCategory1 = () => {
  categoryStore.getCategory1()
}
const getCategory2 = () => {
  // 得清除C2的selectedId因为C2数组变了,C3数组也得清因为C2数组变了,C3id也得变因为C3数组已经为空
  categoryStore.c2SelectedId = ''
  categoryStore.c3Arr = []
  categoryStore.c3SelectedId = ''
  categoryStore.getCategory2()
}
const getCategory3 = () => {
  // 得清理c3的id因为c3数组变了
  categoryStore.c3SelectedId = ''
  categoryStore.getCategory3()
}
onMounted(() => {
  getCategory1()
})
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <!-- card body -->
    <el-form inline>
      <el-form-item label="一级分类" size="default" label-width="80px">
        <el-select
          v-model="categoryStore.c1SelectedId"
          @change="getCategory2"
          :disabled="scene === 0?false:true"
        >
          <!-- v-model="" value-key="" placeholder="" clearable filterable @change="" -->
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          >
            <!-- v-for="item in options" :key="item.value" :label="item.label" :value="item.value" -->
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" size="default" label-width="80px">
        <el-select
          v-model="categoryStore.c2SelectedId"
          @change="getCategory3"
          :disabled="scene === 0?false:true"
        >
          <el-option
            v-for="(c2, index) in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" size="default" label-width="80px">
        <el-select v-model="categoryStore.c3SelectedId" :disabled="scene === 0?false:true">
          <el-option
            v-for="(c3, index) in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>
