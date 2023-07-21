<script lang="ts" setup>
import useCategoryStore from '@/stores/modules/category';
import { watch, ref, reactive, nextTick } from 'vue'
import { reqAddOrUpdateAttr, reqGetAttr, reqDeleteAttr} from '@/api/product/attr';
import type { Attr, AttrResponseData, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore()
let attrList = ref<Attr[]>([])
let inputArr = reactive<any>([])
// 展示场景切换
let scene = ref(false)
// 收集添加或修改属性的数据,其中的attrValueList即为属性值的数组
let attrParams = reactive<Attr>({
  attrName: '',
  categoryId: '',
  categoryLevel: 3,
  attrValueList: []
})
// 获取分类下属性的方法
const getAttrList = async () => {
  let result: AttrResponseData = await reqGetAttr(categoryStore.c1SelectedId as number, categoryStore.c2SelectedId as number, categoryStore.c3SelectedId as number)
  console.log(result)
  if (result.code === 200) {
    attrList.value = result.data
    return Promise.resolve('获取属性成功')
  }
  else {
    return Promise.reject('获取属性失败')
  }
}
// 添加属性的按钮回调
const addAttr = () => {
  scene.value = true
  // 在此清空原先的数据
  Object.assign(attrParams, {
    attrName: '',
    categoryId: categoryStore.c3SelectedId,
    categoryLevel: 3,
    attrValueList: []
  })
}
// 添加属性值的按钮回调
const addAttrValue = () => {
  // 点击添加属性值先帮忙在table新增一行数据
  attrParams.attrValueList.push({
    valueName: '',
    show: false
  })
  // 此行数据需要自动聚焦
  nextTick(() => {
    inputArr.at(-1).focus()
  })
}
// 删除属性值的按钮回调
const deleteAttrValue = (index: number) => {
  // 在属性值的数组中删除
  attrParams.attrValueList.splice(index, 1)
  // 在input元素的数组中删除
  inputArr.splice(index, 1)
}
// 修改属性的按钮回调
const updateAttr = (row: Attr) => {
  console.log(row)
  scene.value = true
  // Object.assign本质上是浅拷贝,即会导致attrParams与row指向同一对象,因此如果对attrParams进行操作但不点击保存发请求也会影响我们展示的row
  // 正确的做法是将row深拷贝一份,再使attrParams浅拷贝那份无关的
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  // 手动添加show
  attrParams.attrValueList.forEach(item=>{
    item.show = true
  })
}
// 删除某个属性
const deleteAttr =  async(attrId:number) =>{
  // 发删除请求
  let result:any = await reqDeleteAttr(attrId)
  if(result.code === 200){
    ElMessage.success('删除成功')
    getAttrList()
  }else{
    ElMessage.error('删除失败')
  }
}
// 取消添加或修改属性的回调
const cancel = () => {
  scene.value = false
}
// 点击tag之后变为input可以编辑属性值
const toEdit = (index: number) => {
  attrParams.attrValueList[index].show = false
  // 得先有input框后才能focus
  nextTick(() => { inputArr[index].focus() })
}
// input失去焦点后变为tag
const toShow = (row: AttrValue, index: number) => {
  // 非法情况一:输入框为空
  if (attrParams.attrValueList[index].valueName.trim() === '') {
    ElMessage.error('属性值不可为空')
    // 删除掉空的
    attrParams.attrValueList.splice(index, 1)
    return
  }
  // 非法情况二:输入有冲突
  if (attrParams.attrValueList.find(item => item !== row && item.valueName === row.valueName)) {
    ElMessage.error('属性值不可重复')
    attrParams.attrValueList.splice(index, 1)
    return
  }
  attrParams.attrValueList[index].show = true
}
// 点击保存后发送添加属性的请求
const save = async () => {
  let result: any = await reqAddOrUpdateAttr(attrParams)
  if (result.code == 200) {
    scene.value = false
    ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
    getAttrList()
  } else {
    ElMessage.error(attrParams.id ? '修改失败' : '添加失败')
  }
}
// 监控3级分类id变化以获取对应属性
watch(() => categoryStore.c3SelectedId, (newVal, oldVal) => {
  if (!newVal) {
    // 将attrList清空,这种情况是三级分类的selectedId被重置导致原先有id变为没id因此需要清空
    attrList.value = []
  } else {
    getAttrList().then(result => {
      ElMessage.success(result)
    }).catch(error => {
      ElMessage.error('获取平台属性超时!请重新选择分类!')
    })
  }
})
</script>

<template>
  <div>
    <Category style="margin-bottom: 20px;" :scene="scene"></Category>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div v-show="!scene">
        <!-- 这里disable要使用三元表达式,因为就算为空串也判定为true -->
        <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3SelectedId ? false : true"
          @click="addAttr">添加平台属性</el-button>
        <el-table style="margin-top: 20px;" border :data="attrList">
          <el-table-column width="100px" type="index" align="center" label="序号" />
          <el-table-column width="150px" label="属性名称" prop="attrName" />
          <el-table-column label="属性值名称">
            <template #="{ row, column, $index }">
              <el-tag v-for="(attrValue, index) in row.attrValueList" :key="attrValue.id" size="large"
                style="margin: 0 5px;">{{ attrValue.valueName
                }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="150px" label="操作">
            <template #="{ row, column, $index }">
              <el-button type="warning" size="default" icon="Edit" @click="updateAttr(row)"></el-button>
              <el-popconfirm width="200px" confirm-button-text="确定" cancel-button-text="取消" icon="Delete"
                icon-color="#626AEF" :title="`确认删除${row.attrName}吗?`" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="danger" size="default" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene">
        <el-form label-width="80px" :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"
              :disabled="attrParams.attrValueList.length > 0 ? true : false"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="default" icon="Plus" :disabled="attrParams.attrName ? false : true"
          @click="addAttrValue">添加属性值</el-button>
        <!-- <el-button size="default" @click="cancel">取消</el-button> -->
        <el-table border style="margin: 20px 0;" :data="attrParams.attrValueList">
          <el-table-column type="index" width="120px" label="序号" align="center" />
          <el-table-column label="属性值">
            <template #="{ row, column, $index }">
              <el-input :ref="(el: any) => inputArr[$index] = el" v-model="row.valueName" placeholder="请输入属性值"
                size="default" v-if="!row.show" @blur="toShow(row, $index)"></el-input>
              <el-tag v-if="row.show" @click="toEdit($index)" size="large">{{ row.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px" align="center">
            <template #="{ row, column, $index }">
              <el-popconfirm width="150px" confirm-button-text="确定" cancel-button-text="取消" icon="Delete"
                icon-color="#626AEF" :title="`确认删除吗?`" @confirm="deleteAttrValue($index)">
                <template #reference>
                  <el-button type="danger" size="default" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
        <el-button size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
