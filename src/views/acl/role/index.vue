<script lang="ts" setup>
import { reqAddOrUpdateRole, reqGetPermissionById, reqGetRolePager, reqPostSetPermission, reqDeleteRole } from '@/api/acl/role';
import type { RoleData, RolePermissionResponseData, RolePermissonData, RoleResponseData } from '@/api/acl/role/type';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, ref } from 'vue';
import { getCurrentTime } from '@/utils/time';
import useLayoutSettingStore from '@/stores/modules/setting'
let layoutSettingStore = useLayoutSettingStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
// 搜索框用来筛选的关键词
let keyword = ref<string>('')
// 存储分页的角色数据
let rolePager = ref<RoleData[]>([])
// 存储获取的角色权限数据
let rolePermissions = ref<RolePermissonData[]>([])
// 获取初始选中的权限的ID
let selectedPermissionId = ref<number[]>([])
// 搜索框是否可用
let lockInput = ref<boolean>(false)
// 对话框组件是否显示
let dialogFormVisible = ref<boolean>(false)
// 抽屉组件是否显示
let drawer = ref<boolean>(false)
let form = ref()
let tree = ref()
// 表单收集角色数据的变量
let roleParams = ref<RoleData>({
  roleName: ''
})
const getRolePager = async (pager = 1) => {
  pageNo.value = pager
  let result: RoleResponseData
  if (lockInput.value) {
    result = await reqGetRolePager(pageNo.value, pageSize.value, keyword.value)
  } else {
    result = await reqGetRolePager(pageNo.value, pageSize.value, '')
  }
  if (result.code === 200) {
    total.value = result.data.total
    rolePager.value = result.data.records
  } else {
    ElMessage.error('获取角色分页失败')
  }
}
const searchRolePager = async () => {
  lockInput.value = true
  getRolePager()
}
const validatorRoleName = (rule: any, value: string, callback: Function) => {
  if (value.trim().length < 2) {
    callback(new Error('职位名称长度需要大于2位'))
  } else {
    callback()
  }
}
const checkRules = {
  roleName: [
    { required: true, trigger: 'blur', message: '职位名称不能为空' },
    { trigger: 'blur', validator: validatorRoleName }
  ]
}
const addRole = () => {
  dialogFormVisible.value = true
  roleParams.value.roleName = ''
  roleParams.value.createTime = undefined
  roleParams.value.updateTime = undefined
  roleParams.value.id = undefined
  nextTick(() => {
    form.value.clearValidate()
  })
}
const editRole = (row: RoleData) => {
  dialogFormVisible.value = true
  nextTick(() => {
    form.value.clearValidate()
  })
  Object.assign(roleParams.value, JSON.parse(JSON.stringify(row)))
}
// 递归获取选中状态的ID数组方法
const getCheckedPermissonId = (data: RolePermissonData, result: number[]) => {
  if (!data.children || data.children.length === 0) {
    if (data.select) {
      result.push(data.id)
    }
  } else {
    for (const child of data.children) {
      getCheckedPermissonId(child, result);
    }
  }
}
const getAllCheckedPermissonId = (roots: RolePermissonData[]) => {
  const result: number[] = [];
  for (const root of roots) {
    getCheckedPermissonId(root, result);
  }
  return result;
}
const editPermissions = async (row: RoleData) => {
  drawer.value = true
  // 获取rowID
  Object.assign(roleParams.value, JSON.parse(JSON.stringify(row)))
  // 发请求获取对应的permission
  let result: RolePermissionResponseData = await reqGetPermissionById(roleParams.value.id!)
  if (result.code === 200) {
    rolePermissions.value = result.data
    console.log(result.data)
    selectedPermissionId.value = getAllCheckedPermissonId(rolePermissions.value)
  } else {
    ElMessage.error('获取权限失败')
  }
}
const confirmEditPermission = async () => {
  let result: any = await reqPostSetPermission(roleParams.value.id!, (tree.value.getCheckedKeys()).concat(tree.value.getHalfCheckedKeys()))
  if (result.code === 200) {
    ElMessage.success('更新权限成功')
    window.location.reload()
  } else {
    ElMessage.error('更新权限失败')
  }
  drawer.value = false
}
// 后端接口存在问题,result删除成功但是没删掉
const deleteRole = async (row: RoleData) => {
  let result: any = await reqDeleteRole(row.id!)
  if (result.code === 200) {
    ElMessage.success('删除职位成功')
    window.location.reload()
  } else {
    ElMessage.error('删除角色失败')
    getRolePager(pageNo.value)
  }
}
const save = async () => {
  // 表单校验
  try {
    await form.value.validate()
  } catch (error: any) {
    ElMessage.error(error.roleName[0].message)
    return
  }
  if (roleParams.value.id) {
    roleParams.value.updateTime = getCurrentTime()
  }
  let result = await reqAddOrUpdateRole(roleParams.value)
  if (result.code === 200) {
    ElMessage.success(roleParams.value.id ? '修改成功' : '添加成功')
  } else {
    ElMessage.error(roleParams.value.id ? '修改失败' : '添加失败')
  }
  dialogFormVisible.value = false
  getRolePager(roleParams.value.id ? pageNo.value : 1)
}
onMounted(() => {
  getRolePager()
})
const defaultProps = {
  children: 'children',
  label: 'name',
}
</script>

<template>
  <div>
    <el-card style="margin-bottom: 20px;">
      <el-form :inline="true" class="search_form">
        <el-form-item label="职位搜索" size="default">
          <el-input v-model="keyword" placeholder="请输入关键字" size="default" clearable style="width: 250px;"
            :disabled="lockInput" :title="lockInput ? '点击重置按钮清空输入框' : ''"></el-input>
        </el-form-item>
        <el-form-item size="default">
          <el-button type="primary" :disabled="keyword ? false : true" @click="searchRolePager">搜索</el-button>
          <el-button @click="layoutSettingStore.changeRefresh()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" size="default" icon="Plus" @click="addRole">添加职位</el-button>
      <el-table :data="rolePager" border style="margin: 20px 0;">
        <el-table-column type="index" width="80" label="#" align="center" :resizable="false" />
        <el-table-column label="id" width="120" align="center" :resizable="false" prop="id" />
        <el-table-column label="职位名称" align="center" :resizable="false" prop="roleName" />
        <el-table-column label="创建时间" align="center" :resizable="false" prop="createTime" />
        <el-table-column label="更新时间" align="center" :resizable="false" prop="updateTime" />
        <el-table-column label="操作" width="280" align="center" :resizable="false">
          <template #="{ row, $index }">
            <el-button icon="User" type="success" size="small" @click="editPermissions(row)">分配权限</el-button>
            <el-button icon="Edit" type="primary" size="small" @click="editRole(row)">编辑</el-button>
            <el-popconfirm width="200" confirm-button-text="确认" cancel-button-text="取消" icon="Delete" icon-color="#626AEF"
              :title="`确认删除${row.roleName}吗?`" @confirm="deleteRole(row)">
              <template #reference>
                <el-button icon="Delete" type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="getRolePager()" @current-change="getRolePager" v-model:currentPage="pageNo"
        :page-sizes="[5, 7, 9, 11]" v-model:page-size="pageSize" layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total" background :pager-count="7">
      </el-pagination>
    </el-card>
    <el-dialog v-model="dialogFormVisible" :title="roleParams.id ? '修改职位' : '添加职位'">
      <el-form :model="roleParams" :rules="checkRules" ref="form">
        <el-form-item label="职位名称:" label-width="100px" prop="roleName">
          <el-input v-model.trim="roleParams.roleName" placeholder="请输入职位名称" size="default" clearable
            style="width: 350px;" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer" size="25%">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <div>
          <el-tree :data="rolePermissions" show-checkbox node-key="id" default-expand-all :props="defaultProps"
            :default-checked-keys="selectedPermissionId" ref="tree" />
        </div>
      </template>
      <template #footer>
        <div>
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="confirmEditPermission">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.search_form {
  display: flex;
  justify-content: space-between;
}
</style>
