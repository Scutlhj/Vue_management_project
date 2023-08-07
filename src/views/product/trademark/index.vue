<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TrademarkResponseData,
  TrademarkData,
} from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
// 当前页码
let pageNo = ref<number>(1)
// 每页数据
let limit = ref<number>(3)
// 总数
let total = ref<number>(0)
let TrademarkForm = ref()
// 控制是否显示对话框
let dialogFormVisible = ref<boolean>(false)
// 存储当前页的品牌数据,换了页马上会马上替换
let trademarkArr = ref<Records>([])
let trademarkFormData = reactive<TrademarkData>({
  tmName: '',
  logoUrl: '',
})
const validatorTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称需要大于1位'))
  }
}
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('需要上传图片'))
  }
}
// 表单提交的规则
const checkrules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}
// 获取已有品牌的接口封装为函数，调用函数可以获得后台数据
const getHasTrademark = async (pager = 1) => {
  // 使用默认参数pager,如果没传就会使用1
  // 切换页面时current-change会自动传一个pager参数
  pageNo.value = pager
  let result: TrademarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code === 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
// 点击添加品牌按钮回调
const addTrademark = () => {
  // 清空上次数据
  trademarkFormData.id = undefined
  trademarkFormData.logoUrl = ''
  trademarkFormData.tmName = ''
  dialogFormVisible.value = true
  // 清除上次可能存在的校验错误提示信息
  nextTick(() => {
    TrademarkForm.value.clearValidate()
  })
}
// 点击编辑按钮的回调
const updateTrademark = (row: TrademarkData) => {
  Object.assign(trademarkFormData, row)
  dialogFormVisible.value = true
  nextTick(() => {
    TrademarkForm.value.clearValidate()
  })
}
const confirm = async () => {
  await TrademarkForm.value.validate()
  let result = await reqAddOrUpdateTrademark(trademarkFormData)
  if (result.code == 200) {
    // 添加品牌成功,关闭对话框,弹出成功信息,重新获取已有品牌
    dialogFormVisible.value = false
    ElMessage.success(
      `${trademarkFormData.id ? '修改品牌成功' : '添加品牌成功'}`,
    )
    // 修改的话留在当前页面
    getHasTrademark(trademarkFormData.id ? pageNo.value : 1)
  } else {
    ElMessage.error(`${trademarkFormData.id ? '修改品牌失败' : '添加品牌失败'}`)
    dialogFormVisible.value = false
  }
}
// 上传图片前的校验,防止其传其他文件或者过大的文件
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/gif'
  ) {
    ElMessage.error('上传格式必须为jpg、png或gif!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('文件大小不可超过2MB!')
    return false
  }
  return true
}
// 上传成功的函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  // response为这次post请求返回的数据,uploadFile
  // 收集上传的url到trademarkFormData中
  // 清除表单校验错误信息
  TrademarkForm.value.clearValidate(['logoUrl'])
  trademarkFormData.logoUrl = response.data
}
const deleteTrademark = async (id: number) => {
  let result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage.success('删除成功')
    // 这里的意思是如果这页只有一个就跳回上一页,超过两个就留在这页,当然会有多人同时删除的问题,该思路仅供参考,也可以直接强制跳回第一页
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage.error('删除失败')
  }
}
onMounted(() => {
  getHasTrademark()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button type="primary" icon="Plus" @click="addTrademark" v-has="'btn.Trademark.add'">
            添加品牌
          </el-button>
        </div>
      </template>
      <el-table border :data="trademarkArr" style="margin-bottom: 20px">
        <!-- prop会自动解包row,因此直接写想要的字段就行 -->
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          prop="id"
          :resizable="false"
        ></el-table-column>
        <el-table-column label="品牌名称" align="center" :resizable="false">
          <!-- table-column默认展示数据容器为div,可以使用template,三个回传参数row为该行数据,column为该列信息,$index为index -->
          <template #="{ row, column, $index }">
            <pre style="color: black; font-size: 20px; font-weight: bold">{{
              row.tmName
            }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌Logo" align="center" :resizable="false">
          <template #="{ row, column, $index }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center" :resizable="false">
          <template #="{ row, column, $index }">
            <el-button
              type="warning"
              size="default"
              icon="Edit"
              @click="updateTrademark(row)"
              v-has="'btn.Trademark.update'"
            ></el-button>
            <el-popconfirm
              width="150px"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="Delete"
              icon-color="#626AEF"
              :title="`确认删除${row.tmName}吗?`"
              @confirm="deleteTrademark(row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="default"
                  icon="Delete"
                  v-has="'btn.Trademark.remove'"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件 -->
      <!-- layout表示六个子组件布局方式 -->
      <el-pagination
        v-model:currentPage="pageNo"
        :page-sizes="[3, 5, 7, 9]"
        v-model:page-size="limit"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        :background="true"
        :pager-count="9"
        @current-change="getHasTrademark"
        @size-change="getHasTrademark()"
      ></el-pagination>
    </el-card>
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkFormData.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        :model="trademarkFormData"
        style="width: 80%"
        :rules="checkrules"
        ref="TrademarkForm"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="trademarkFormData.tmName" />
        </el-form-item>
        <el-form-item label="品牌Logo" label-width="100px" prop="logoUrl">
          <!-- action为请求url,不带/api代理服务器不帮忙 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkFormData.logoUrl"
              :src="trademarkFormData.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <UploadFilled />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
