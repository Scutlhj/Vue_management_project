<script lang="ts" setup>
import {
  reqGetPagerSku,
  reqGetSkuInfo,
  reqOffSaleSku,
  reqOnSaleSku,
  reqDeleteSku,
} from '@/api/product/sku'
import { SkuData, SkuInfoResponseData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let pagerSku = ref<SkuData[]>([])
let drawer = ref<boolean>(false)
let skuData = ref<SkuData>({
  id: 0,
  category3Id: 0,
  isSale: 0,
  spuId: 0,
  tmId: 0,
  skuName: '',
  skuDesc: '',
  price: '',
  weight: '',
  skuImageList: [],
  skuDefaultImg: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
})
const getPagerSku = async (pager = 1) => {
  pageNo.value = pager
  let result = await reqGetPagerSku(pageNo.value, pageSize.value)
  if (result.code === 200) {
    // 赋值
    total.value = result.data.total
    pagerSku.value = result.data.records
  } else {
    ElMessage.error('获取当前分页SKU数据失败')
  }
}
const switchSale = async (row: SkuData) => {
  let result
  if (row.isSale === 1) {
    result = await reqOffSaleSku(row.id!)
    if (result.code === 200) {
      ElMessage.success('商品下架成功')
    } else {
      ElMessage.error('商品下架失败')
    }
  } else {
    result = await reqOnSaleSku(row.id!)
    if (result.code === 200) {
      ElMessage.success('商品上架成功')
    } else {
      ElMessage.error('商品上架失败')
    }
  }
  getPagerSku(pageNo.value)
}
const editSku = () => {
  ElMessage.success('此功能尚在开发中')
}
const showSku = async (row: SkuData) => {
  let result: SkuInfoResponseData = await reqGetSkuInfo(row.id!)
  if (result.code === 200) {
    drawer.value = true
    ElMessage.success('获取商品信息成功')
    Object.assign(skuData.value, JSON.parse(JSON.stringify(result.data)))
  } else {
    ElMessage.error('获取商品信息失败')
  }
}
const deleteSku = async (row: SkuData) => {
  let result: any = await reqDeleteSku(row.id!)
  if (result.code === 200) {
    ElMessage.success('删除SKU成功')
  } else {
    ElMessage.error('系统数据，不能删除')
  }
  if (pagerSku.value.length > 1) {
    getPagerSku(pageNo.value)
  } else {
    getPagerSku(pageNo.value - 1)
  }
}
onMounted(() => {
  getPagerSku()
})
</script>

<template>
  <el-card>
    <el-table :data="pagerSku" border style="width: 100%; margin-bottom: 20px">
      <el-table-column
        type="index"
        width="80px"
        label="序号"
        align="center"
        :resizable="false"
      />
      <el-table-column
        label="名称"
        width="150px"
        :resizable="false"
        :show-overflow-tooltip="true"
        prop="skuName"
      />
      <el-table-column
        label="描述"
        width="250px"
        :resizable="false"
        :show-overflow-tooltip="true"
        prop="skuDesc"
      />
      <el-table-column
        label="图片"
        width="200px"
        :resizable="false"
        align="center"
      >
        <template #="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            :alt="row.skuName"
            style="width: 100px; height: 100px"
            v-if="row.skuDefaultImg"
          />
          <el-empty :image-size="60" style="padding: 0" v-else />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(克)"
        width="120px"
        :resizable="false"
        prop="weight"
      />
      <el-table-column
        label="价格(元)"
        width="120px"
        :resizable="false"
        prop="price"
      />
      <el-table-column
        label="操作"
        fixed="right"
        :resizable="false"
        align="center"
      >
        <template #="{ row, $index }">
          <el-button
            :type="row.isSale === 1 ? 'info' : 'success'"
            :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
            :title="row.isSale === 1 ? '下架商品' : '上架商品'"
            @click="switchSale(row)"
            v-has="'btn.Sku.updown'"
          ></el-button>
          <el-button
            type="primary"
            icon="Edit"
            title="编辑SKU"
            @click="editSku()"
            v-has="'btn.Sku.update'"
          ></el-button>
          <el-button
            type="info"
            icon="InfoFilled"
            title="查看SKU"
            @click="showSku(row)"
            v-has="'btn.Sku.detail'"
          ></el-button>
          <el-popconfirm
            width="300"
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="Delete"
            icon-color="#626AEF"
            :title="`你确认删除${row.skuName}吗?`"
            @confirm="deleteSku(row)"
          >
            <template #reference>
              <el-button
                type="danger"
                icon="Delete"
                title="删除SKU"
                v-has="'btn.Sku.remove'"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 自动补充的:page-size前要加个v-model要不然分页器不出来 -->
    <el-pagination
      v-model:currentPage="pageNo"
      :page-sizes="[5, 7, 9, 11]"
      v-model:page-size="pageSize"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      :background="true"
      :pager-count="7"
      @current-change="getPagerSku"
      @size-change="getPagerSku()"
    ></el-pagination>
    <!-- 点击查看SKU弹出抽屉 -->
    <el-drawer v-model="drawer" size="30%">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <!-- 此处为drawer内容区 -->
      <template #default>
        <el-descriptions :column="1" title="商品详情" size="large" border>
          <!-- 每个item为一个介绍,包含标题与内容,label插槽中的内容为标题,下方为内容 -->
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Goods />
                </el-icon>
                名称
              </div>
            </template>
            {{ skuData.skuName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Document />
                </el-icon>
                描述
              </div>
            </template>
            {{ skuData.skuDesc }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Money />
                </el-icon>
                价格
              </div>
            </template>
            {{ skuData.price }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <tickets />
                </el-icon>
                平台属性
              </div>
            </template>
            <el-tag
              size="small"
              v-for="(item, index) in skuData.skuAttrValueList"
              :key="item.id"
              type="danger"
            >
              {{ item.valueName }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <ShoppingCart />
                </el-icon>
                销售属性
              </div>
            </template>
            <el-tag
              size="small"
              v-for="(item, index) in skuData.skuSaleAttrValueList"
              :key="item.id"
              type="success"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Picture />
                </el-icon>
                商品图片
              </div>
            </template>
            <div
              style="
                height: 0px;
                font-size: 0;
                line-height: 0;
                color: transparent;
              "
            >
              1
            </div>
            <el-carousel
              :interval="5000"
              type="card"
              height="150px"
              indicator-position="none"
              v-if="skuData.skuImageList.length > 0"
            >
              <el-carousel-item
                v-for="item in skuData.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  :alt="item.imgName"
                  style="height: 100%; width: 100%"
                />
              </el-carousel-item>
            </el-carousel>
            <el-empty :image-size="150" style="padding: 0" v-else />
          </el-descriptions-item>
        </el-descriptions>
      </template>
    </el-drawer>
  </el-card>
</template>

<style lang="scss" scoped>
.cell-item {
  display: flex;
  align-items: center;
  width: 80px;
}
</style>
