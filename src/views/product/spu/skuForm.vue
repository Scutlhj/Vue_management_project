<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { reqGetAttr } from '@/api/product/attr'
import { reqGetSpuImage, reqGetSaleAttr, reqPostAddSku } from '@/api/product/spu'
import type { SpuData, SpuImage, SpuImageResponseData, SpuSaleAttr, SpuSaleAttrsResponseData, SkuData } from '@/api/product/spu/type';
import { AttrResponseData, Attr } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
defineOptions({
  name: 'SkuForm',
})
let emits = defineEmits(['changeScene'])
let skuForm = ref()
let attrData = ref<Attr[]>([])
let imgList = ref<SpuImage[]>([])
let saleAttrData = ref<SpuSaleAttr[]>([])
// 收集sku参数
let skuParams = reactive<SkuData>({
  // 三级分类id
  category3Id: 0,
  // 对应spu的id
  spuId: 0,
  // 对应品牌id
  tmId: 0,
  // sku名称
  skuName: '',
  // sku介绍
  skuDesc: '',
  // 价格
  price: '',
  // 重量
  weight: '',
  // 使用的图片
  skuDefaultImg: '',
  // sku的平台属性
  skuAttrValueList: [],
  // sku销售属性
  skuSaleAttrValueList: []
})
const initAddsku = async (c1Id: number, c2Id: number, row: SpuData) => {
  // 初始化表单数据
  Object.assign(skuParams, {
    category3Id: 0,
    spuId: 0,
    tmId: 0,
    skuName: '',
    skuDesc: '',
    price: '',
    weight: '',
    skuDefaultImg: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: []
  })
  skuParams.category3Id = row.category3Id as number
  skuParams.spuId = row.id as number
  skuParams.tmId = row.tmId as number
  skuForm.value.clearValidate()
  // 发请求获得数据
  let result1: AttrResponseData = await reqGetAttr(c1Id, c2Id, (row.category3Id as number))
  let result2: SpuImageResponseData = await reqGetSpuImage(row.id as number)
  let result3: SpuSaleAttrsResponseData = await reqGetSaleAttr(row.id as number)
  if (result1.code === 200 && result2.code === 200 && result3.code === 200) {
    ElMessage.success('获取初始化数据成功')
    attrData.value = result1.data
    imgList.value = result2.data
    saleAttrData.value = result3.data
  }
}
// 点击按钮切换图片的地址
const changeImg = (row: SpuImage, index: number) => {
  skuParams.skuDefaultImg = row.imgUrl!
  ElMessage.success(`已切换图片${index + 1}为默认图片`)
}
// 表单校验
const validatorSkuName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('SKU名称需要大于1位'))
  }
}
const validatorPriceAndWeight = (rule: any, value: any, callback: any) => {
  let checkExp = /^[1-9]\d*$/
  if (checkExp.test(value)) {
    callback()
  } else {
    callback(new Error('输入的值必须为正整数'))
  }
}
const checkrules = {
  skuName: [
    { required: true, trigger: 'blur', message: 'SKU名称不能为空' },
    { trigger: 'blur', validator: validatorSkuName }
  ],
  price: [
    { required: true, message: '价格不能为空' },
    { trigger: 'blur', validator: validatorPriceAndWeight }
  ],
  weight: [
    { required: true, message: '重量不能为空' },
    { trigger: 'blur', validator: validatorPriceAndWeight }
  ]
}
// 点击保存按钮
const addSku = async () => {
  // 整理saleAttrData与attrData
  saleAttrData.value.forEach((item) => {
    if (item.spuSaleAttrValue) {
      skuParams.skuSaleAttrValueList.push({
        saleAttrId: item.id!,
        saleAttrValueId: item.spuSaleAttrValue
      })
    }
  })
  attrData.value.forEach((item) => {
    if (item.attrValueId) {
      skuParams.skuAttrValueList.push({
        attrId: item.id!,
        valueId: item.attrValueId
      })
    }
  })
  // 发送前的校验
  try {
    await skuForm.value.validate()
  } catch (error) {
    ElMessage.error('表单校验失败,请重新填写')
    return
  }
  // 准备发送
  let result = await reqPostAddSku(skuParams)
  if (result.code === 200) {
    ElMessage.success('添加sku成功')
  } else {
    ElMessage.error('添加sku失败')
  }
  // 发送后跳回页面
  emits('changeScene', { num: 0, action: 'add' })
}
defineExpose({ initAddsku })
</script>

<template>
  <div>
    <el-form label-width="80px" :model="skuParams" :rules="checkrules" ref="skuForm">
      <el-form-item label="sku名称" prop="skuName">
        <el-input placeholder="请输入SKU名称" v-model="skuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)" prop="price">
        <el-input placeholder="请输入价格(元)" type="number" v-model.number="skuParams.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)" prop="weight">
        <el-input placeholder="请输入价格(克)" type="number" v-model.number="skuParams.weight"></el-input>
      </el-form-item>
      <el-form-item label="sku描述" prop="skuDesc">
        <el-input placeholder="请输入sku描述" v-model="skuParams.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item v-for="(item, index) in attrData" :key="item.id" :label="item.attrName">
            <el-select style="margin-bottom: 10px;" v-model="item.attrValueId">
              <el-option v-for="(attrValue, index) in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"
                :value="attrValue.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item v-for="(item, index) in saleAttrData" :key="item.id" :label="item.saleAttrName">
            <el-select v-model="item.spuSaleAttrValue">
              <el-option v-for="(saleAttrValue, index) in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName" :value="saleAttrValue.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table :data="imgList" border>
          <el-table-column type="index" width="50px" align="center" :resizable="false" />
          <el-table-column label="图片" align="center" :resizable="false">
            <template #="{ row, $index }">
              <img :src="row.imgUrl" :alt="row.imgName" style="height: 100px; width: 100px;">
            </template>
          </el-table-column>
          <el-table-column label="图片名称" width="400px" align="center" :resizable="false" prop="imgName">
          </el-table-column>
          <el-table-column label="操作" width="200px" align="center" :resizable="false">
            <template #="{ row, $index }">
              <el-button type="primary" size="default" @click="changeImg(row, $index)">切换为默认图片</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addSku">保存</el-button>
        <el-button @click="$emit('changeScene', { num: 0, action: '' })">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>