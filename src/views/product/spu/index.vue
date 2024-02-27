<script lang="ts" setup>
import { ref, watch } from 'vue'
import { reqDeleteSpu, reqGetSku, reqGetSpu } from '@/api/product/spu'
import type {
  SpuResponseData,
  SpuRecords,
  SpuData,
  SkuData,
} from '@/api/product/spu/type'
import useCategoryStore from '@/stores/modules/category'
import { ElMessage } from 'element-plus'
import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'
let scene = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let spuRecords = ref<SpuRecords>([])
let total = ref<number>(0)
let showDialog = ref<boolean>(false)
// 获取spuform的组件实例
let spuform = ref()
let skuform = ref()
// 存储查询sku的响应式数据
let skuList = ref<SkuData[]>([])
let categoryStore = useCategoryStore()
const getSpuList = async (pager = 1) => {
  // 修改页码
  pageNo.value = pager
  let result: SpuResponseData = await reqGetSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3SelectedId,
  )
  if (result.code === 200) {
    spuRecords.value = result.data.records
    total.value = result.data.total
  } else {
    ElMessage.error('获取SPU失败')
  }
}
// 点击添加SPU的回调
const addSpu = () => {
  scene.value = 1
  spuform.value.initAddAttr(categoryStore.c3SelectedId)
}
// 点击修改SPU的回调
const editSpu = (row: SpuData) => {
  // 获取子组件的方法调用,给其传入row,不用nexttick因为spuform只是隐藏起来而已
  spuform.value.getSpuInfo(row)
  scene.value = 1
}
// 删除SPU的回调
const deleteSpu = async (row: SpuData) => {
  let result = await reqDeleteSpu(row.id as number)
  if (result.code === 200) {
    ElMessage.success('删除成功')
    if (spuRecords.value.length <= 1) {
      await getSpuList(pageNo.value)
      return
    }
  } else {
    ElMessage.error('删除失败')
  }
  await getSpuList(pageNo.value)
}
// 添加sku回调
const addSku = (row: SpuData) => {
  skuform.value.initAddsku(
    categoryStore.c1SelectedId,
    categoryStore.c2SelectedId,
    row,
  )
  scene.value = 2
}
const getSkuList = async (row: SpuData) => {
  let result = await reqGetSku(row.id as number)
  if (result.code === 200) {
    ElMessage.success('获取SKU数据成功')
    skuList.value = result.data
    showDialog.value = true
  } else {
    ElMessage.error('获取SKU数据失败')
  }
}
const changeScene = (obj: any) => {
  scene.value = obj.num
  if (obj.action === 'update') {
    getSpuList(pageNo.value)
  } else if (obj.action === 'add') {
    getSpuList()
  }
}
watch(
  () => categoryStore.c3SelectedId,
  (newVal, oldVal) => {
    if (!newVal) {
      // 清空数组
      spuRecords.value = []
      // 分页器数量换回0
      total.value = 0
    } else {
      getSpuList()
    }
  },
)
</script>

<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card
      shadow="always"
      :body-style="{ padding: '20px' }"
      style="margin: 20px 0"
    >
      <!-- card body -->
      <div v-show="scene === 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3SelectedId ? false : true"
          @click="addSpu"
          v-has="'btn.Spu.add'"
        >
          添加SPU
        </el-button>
        <el-table border style="margin: 20px 0" :data="spuRecords">
          <el-table-column
            type="index"
            label="序号"
            width="100px"
            align="center"
            :resizable="false"
          />
          <el-table-column
            label="SPU名称"
            prop="spuName"
            width="150px"
            :resizable="false"
          ></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
            :resizable="false"
          ></el-table-column>
          <el-table-column
            label="操作"
            :resizable="false"
            width="250px"
            align="center"
          >
            <template #="{ row, $index }">
              <el-button
                type="primary"
                size="default"
                icon="Plus"
                title="添加SKU"
                @click="addSku(row)"
                v-has="'btn.Spu.addsku'"
              ></el-button>
              <el-button
                type="warning"
                size="default"
                icon="Edit"
                title="修改SPU"
                @click="editSpu(row)"
                v-has="'btn.Spu.update'"
              ></el-button>
              <el-button
                type="info"
                size="default"
                icon="View"
                title="查看SKU列表"
                @click="getSkuList(row)"
                v-has="'btn.Spu.skus'"
              ></el-button>
              <el-popconfirm
                width="220"
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="Delete"
                icon-color="#626AEF"
                :title="`你确认删除${row.spuName}吗?`"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="default"
                    icon="Delete"
                    title="删除SPU"
                    v-has="'btn.Spu.delete'"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- size-change加括号是为了防止其自动传page-size进去 -->
        <el-pagination
          v-model:currentPage="pageNo"
          :page-sizes="[3, 5, 7, 9]"
          v-model:page-size="pageSize"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          :background="true"
          :pager-count="9"
          @current-change="getSpuList"
          @size-change="getSpuList()"
        ></el-pagination>
      </div>
      <SpuForm
        ref="spuform"
        v-show="scene === 1"
        @changeScene="changeScene"
      ></SpuForm>
      <SkuForm
        ref="skuform"
        v-show="scene === 2"
        @changeScene="changeScene"
      ></SkuForm>
      <el-dialog v-model="showDialog" title="SKU展示列表" width="920px">
        <el-table :data="skuList" border>
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
            :resizable="false"
          />
          <el-table-column
            label="SKU名字"
            prop="skuName"
            width="300px"
            align="center"
            :resizable="false"
          />
          <el-table-column
            label="SKU价格"
            prop="price"
            width="150px"
            align="center"
            :resizable="false"
          />
          <el-table-column
            label="SKU重量"
            prop="weight"
            width="150px"
            align="center"
            :resizable="false"
          />
          <el-table-column
            label="SKU图片"
            width="200px"
            align="center"
            :resizable="false"
          >
            <template #="{ row, $index }">
              <img
                :src="row.skuDefaultImg"
                :alt="row.skuName"
                style="height: 100px; width: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
