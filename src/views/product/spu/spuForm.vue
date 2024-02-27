<script lang="ts" setup>
import {
  reqGetTrademarks,
  reqGetSpuImage,
  reqGetSaleAttr,
  reqGetAllSaleAttr,
  reqPostAddOrUpdateSpu,
} from '@/api/product/spu'
import type {
  SaleAttrObj,
  SpuSaleAttr,
  SpuImage,
  Trademark,
  SpuData,
  TrademarkResponseData,
  SpuImageResponseData,
  SpuSaleAttrsResponseData,
  SaleAttrResponseData,
  SpuSaleAttrValue,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import type {
  UploadFile,
  UploadFiles,
  UploadRawFile,
} from 'element-plus/es/components/upload/src/upload'
import { reactive, ref, computed, nextTick } from 'vue'
import { validatorSpuName } from '@/utils/validator'
defineOptions({
  name: 'SpuForm',
})
let emits = defineEmits(['changeScene'])
// 所有品牌的变量
let TrademarkArr = ref<Trademark[]>([])
// 获取该spu的图片资源
let ImageArr = ref<SpuImage[]>([])
// 获取该spu的商品属性
let spuSaleAttr = ref<SpuSaleAttr[]>([])
// 获取能使用的属性名
let allSaleAttr = ref<SaleAttrObj[]>([])
// 输入框对应DOM,不需要每个spuSaleAttr数组中的都弄一个,因为按照正常情况下只会有一个输入框是focus状态
let attrValueInput = ref()
// 表单元素
let spuForm = ref()
// 控制对话框展示
let dialogVisible = ref<boolean>(false)
// 对话框中图片的url,用于在对话框中展示图片
let dialogImageUrl = ref<string>('')
// 计算出还未添加的属性
let unselectAttr = computed(() => {
  return allSaleAttr.value.filter((item: SaleAttrObj) => {
    return spuSaleAttr.value.every((item1: SpuSaleAttr) => {
      return item.name !== item1.saleAttrName
    })
  })
})
// 记录被选中的属性
let selectedAttr = ref<string>('')
// 表单数据收集于此
let SpuParams = reactive<SpuData>({
  // 新增不带id
  // id: "",
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})
// 表单校验规则,必须要有SPU名称与品牌
const checkrules = {
  spuName: [{ required: true, trigger: 'blur', validator: validatorSpuName }],
  tmId: [{ required: true, message: 'SPU品牌不能为空' }],
}
// 表单加载时获取数据
const getSpuInfo = async (row: SpuData) => {
  Object.assign(SpuParams, JSON.parse(JSON.stringify(row)))
  spuForm.value.clearValidate()
  let result1: TrademarkResponseData = await reqGetTrademarks()
  let result2: SpuImageResponseData = await reqGetSpuImage(row.id as number)
  let result3: SpuSaleAttrsResponseData = await reqGetSaleAttr(row.id as number)
  let result4: SaleAttrResponseData = await reqGetAllSaleAttr()
  if (
    result1.code === 200 &&
    result2.code === 200 &&
    result3.code === 200 &&
    result4.code === 200
  ) {
    ElMessage.success('获取原始数据成功')
    TrademarkArr.value = result1.data
    // 这里的处理属于是没办法,服务器用的叫imgName,imgUrl,但我们这个Upload需要name,url
    ImageArr.value = result2.data.map((item) => {
      return {
        name: item.imgName,
        url: item.imgUrl,
      }
    })
    spuSaleAttr.value = result3.data
    allSaleAttr.value = result4.data
  }
}
// 添加属性的初始化函数
const initAddAttr = async (c3SelectedId: number) => {
  // 清空数据
  ImageArr.value = []
  Object.assign(SpuParams, {
    id: undefined,
    category3Id: c3SelectedId,
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
  })
  selectedAttr.value = ''
  spuSaleAttr.value = []
  spuForm.value.clearValidate()
  // 发两个请求获取TrademarkArr与allSaleAttr
  let result = await reqGetTrademarks()
  let result1 = await reqGetAllSaleAttr()
  if (result.code === 200 && result1.code === 200) {
    ElMessage.success('初始化成功')
    TrademarkArr.value = result.data
    allSaleAttr.value = result1.data
  } else {
    ElMessage.error('初始化失败')
  }
}
// 预览前的钩子
const handlePictureCardPreview = (file: UploadFile) => {
  dialogVisible.value = true
  dialogImageUrl.value = file.url!
}
// 处理删除图片,其实没什么好处理的
const handleRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  // 被删除的图片
  console.log(uploadFile)
  // 删除后的数组
  console.log(uploadFiles)
}
// 上传前的校验
const handleUpload = (rawFile: UploadRawFile) => {
  /* 
        uid: 1690163093062
        lastModified: 1673018407521
        lastModifiedDate: Fri Jan 06 2023 23:20:07 GMT+0800 (中国标准时间) {}
        name: "4.png"
        size: 71608
        type: "image/png"
        webkitRelativePath: ""
     */
  if (
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/gif'
  ) {
    ElMessage.error('上传文件格式错误!')
    return false
  } else {
    if (rawFile.size / 1048576 > 2) {
      ElMessage.error('上传文件大小不可超过2MB!')
      return false
    } else {
      ElMessage.success('上传文件成功')
      return true
    }
  }
}
// 点击添加属性按钮的回调
const addAttr = () => {
  // 解构单选框中的string
  const [baseSaleAttrId, saleAttrName] = selectedAttr.value.split(':')
  // 新增一个SpuSaleAttr对象
  const newAttr: SpuSaleAttr = {
    baseSaleAttrId: parseInt(baseSaleAttrId, 10),
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  // 将这个新对象放进数组中
  spuSaleAttr.value.push(newAttr)
  // 清除选中对象
  selectedAttr.value = ''
}
// 点击添加属性值按钮的回调
const toEdit = (row: SpuSaleAttr) => {
  // 开启编辑框
  row.flag = true
  // 清空之前的内容
  row.spuSaleAttrValue = ''
  // 自动获取焦点
  nextTick(() => {
    attrValueInput.value.focus()
  })
}
const toShow = (row: SpuSaleAttr) => {
  // 关闭编辑框
  row.flag = false
  // 将row的spuSaleAttrValue收集创建一个新SpuSaleAttrValue对象
  const { baseSaleAttrId, saleAttrName } = row
  const saleAttrValueName = row.spuSaleAttrValue!
  // 有一些判定条件
  if (saleAttrValueName.trim() === '') {
    ElMessage.error('输入的属性值不可为空')
    return
  }
  if (
    !row.spuSaleAttrValueList.every(
      (item) => saleAttrValueName.trim() !== item.saleAttrValueName,
    )
  ) {
    ElMessage.error('输入的属性值不可重复')
    return
  }
  // 创建新对象
  const newSpuSaleAttrValue: SpuSaleAttrValue = {
    baseSaleAttrId,
    saleAttrName,
    saleAttrValueName,
  }
  // 将这个对象添加进数组中
  row.spuSaleAttrValueList.push(newSpuSaleAttrValue)
}
// 点击保存回调
const saveAttr = async () => {
  // 判断是否符合表单验证规则
  try {
    await spuForm.value.validate()
  } catch (error) {
    ElMessage.error('表单校验通过失败,请重新填写')
    return
  }
  // 整理图片数据
  SpuParams.spuImageList = ImageArr.value.map((item: any) => {
    return {
      imgName: item.name,
      // 自己上传的数据的url要在response中找,之前有的直接拿url
      imgUrl: item.response ? item.response.data : item.url,
    }
  })
  // 整理属性参数
  SpuParams.spuSaleAttrList = spuSaleAttr.value
  let result = await reqPostAddOrUpdateSpu(SpuParams)
  if (result.code === 200) {
    ElMessage.success(SpuParams.id ? '修改成功' : '添加成功')
  } else {
    ElMessage.error(SpuParams.id ? '修改失败' : '添加失败')
  }
  emits('changeScene', { num: 0, action: SpuParams.id ? 'update' : 'add' })
}
defineExpose({ getSpuInfo, initAddAttr })
</script>

<template>
  <el-form
    label-width="80px"
    :rules="checkrules"
    ref="spuForm"
    :model="SpuParams"
  >
    <el-form-item label="SPU名称" size="default" prop="spuName">
      <el-input
        placeholder="请输入SPU名称"
        size="default"
        v-model="SpuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌" prop="tmId">
      <el-select v-model="SpuParams.tmId">
        <el-option
          v-for="(item, index) in TrademarkArr"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述" size="default">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        size="default"
        v-model="SpuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片" size="default">
      <!-- v-model:file-list默认展示图片,action上传地址,list-type展示图片的方式,on-preview点击预览的回调,on-remove点击删除回调 -->
      <el-upload
        v-model:file-list="ImageArr"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handleUpload"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU属性" size="default">
      <el-select
        v-model="selectedAttr"
        :placeholder="
          unselectAttr.length > 0
            ? `还有${unselectAttr.length}个未选择属性`
            : '没有可选择的属性'
        "
      >
        <el-option
          v-for="(item, index) in unselectAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        style="margin-left: 18px"
        :disabled="selectedAttr ? false : true"
        @click="addAttr"
      >
        添加属性
      </el-button>
      <el-table border style="margin-top: 18px" :data="spuSaleAttr">
        <el-table-column
          type="index"
          label="序号"
          width="80px"
          align="center"
          :resizable="false"
        />
        <el-table-column
          label="属性名"
          width="150px"
          :resizable="false"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="属性值" :resizable="false">
          <template #="{ row, $index }">
            <el-tag
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="item.id"
              class="mx-1"
              closable
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              placeholder="请输入属性值"
              size="small"
              clearable
              @change=""
              style="width: 100px"
              v-if="row.flag"
              @blur="toShow(row)"
              v-model="row.spuSaleAttrValue"
              ref="attrValueInput"
            ></el-input>
            <el-button
              type="success"
              size="small"
              icon="Plus"
              @click="toEdit(row)"
              v-else
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80px" :resizable="false">
          <template #="{ row, $index }">
            <el-button
              type="danger"
              size="default"
              @click="spuSaleAttr.splice($index, 1)"
              icon="Delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item size="default">
      <el-button
        type="primary"
        size="default"
        @click="saveAttr"
        :disabled="spuSaleAttr.length > 0 ? false : true"
      >
        保存
      </el-button>
      <el-button
        size="default"
        @click="
          $emit('changeScene', {
            num: 0,
            action: SpuParams.id ? 'update' : 'add',
          })
        "
      >
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.mx-1 {
  margin-right: 10px;
}
</style>
