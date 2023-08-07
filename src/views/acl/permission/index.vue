<script lang="ts" setup>
import {
  reqAddOrUpdatePermission,
  reqDeletePermission,
  reqGetAllPermission,
} from '@/api/acl/menu'
import { PermissionData, PermissionResponseData } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
import { nextTick, onMounted, ref } from 'vue'
let dialogFormVisible = ref<boolean>(false)
let permissions = ref<PermissionData[]>([])
let form = ref()
let permissionParams = ref<PermissionData>({
  pid: 0,
  name: '',
  code: '',
  level: 0,
})
const validatorCode = (rule: any, value: string, callback: Function) => {
  if (/^[a-zA-Z0-9.]+$/.test(value) && value.length > 2) {
    callback()
  } else {
    callback(new Error('权限值只能含有数字、字母与句点,且长度大于2'))
  }
}
const rules = {
  name: [
    {
      required: true,
      trigger: 'blur',
      message: '名称不能为空!',
    },
    {
      min: 2,
      max: 20,
      message: '名称长度需为2到20位',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      trigger: 'blur',
      message: '权限值不能为空',
    },
    {
      trigger: 'blur',
      validator: validatorCode,
    },
  ],
}
const getAllPermissions = async () => {
  let result: PermissionResponseData = await reqGetAllPermission()
  if (result.code === 200) {
    permissions.value = result.data
  } else {
    ElMessage.error('获取权限数据失败')
  }
}
const addPermission = (row: PermissionData) => {
  dialogFormVisible.value = true
  // 洗数据
  Object.assign(permissionParams.value, {
    pid: row.id!,
    name: '',
    code: '',
    level: row.level + 1,
  })
  permissionParams.value.id = undefined
  nextTick(() => {
    form.value.clearValidate()
  })
}
const editPermission = (row: PermissionData) => {
  dialogFormVisible.value = true
  Object.assign(permissionParams.value, {
    pid: row.pid,
    name: row.name,
    code: row.code,
    level: row.level,
    id: row.id!,
  })
  nextTick(() => {
    form.value.clearValidate()
  })
}
const deletePermission = async (row: PermissionData) => {
  let result = await reqDeletePermission(row.id!)
  if (result.code === 200) {
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('删除失败')
  }
  getAllPermissions()
}
const save = async () => {
  // 验证表单
  try {
    await form.value.validate()
  } catch {
    ElMessage.error('表单校验未通过!')
    return
  }
  let result: any = await reqAddOrUpdatePermission(permissionParams.value)
  if (result.code === 200) {
    ElMessage.success(permissionParams.value.id ? '修改成功' : '添加成功')
  } else {
    ElMessage.error(permissionParams.value.id ? '修改失败' : '添加失败')
  }
  dialogFormVisible.value = false
  getAllPermissions()
}
onMounted(() => {
  getAllPermissions()
})
</script>

<template>
  <div>
    <el-table :data="permissions" border row-key="id">
      <el-table-column label="名称" prop="name" :resizable="false" />
      <el-table-column label="权限值" prop="code" :resizable="false" />
      <el-table-column label="创建时间" prop="createTime" :resizable="false" />
      <el-table-column label="修改时间" prop="updateTime" :resizable="false" />
      <el-table-column width="250px" label="操作" align="center" :resizable="false">
        <template #="{ row, $index }">
          <el-button size="small" type="success" :disabled="row.level === 4" @click="addPermission(row)"
            v-has="'btn.Permission.add'">
            {{ row.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button size="small" type="primary" :disabled="row.level === 1" @click="editPermission(row)"
            v-has="'btn.Permission.update'">
            编辑
          </el-button>
          <el-popconfirm width="200" confirm-button-text="确认" cancel-button-text="取消" icon="Delete" icon-color="#626AEF"
            :title="`确认删除${row.name}吗?`" @confirm="deletePermission(row)">
            <template #reference>
              <el-button size="small" type="danger" :disabled="row.level === 1" v-has="'btn.Permission.remove'">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" :title="permissionParams.id
        ? `编辑${permissionParams.level === 4 ? '功能' : '菜单'}`
        : `添加${permissionParams.level === 4 ? '功能' : '菜单'}`
      " width="35%">
      <el-form label-width="80px" :model="permissionParams" :rules="rules" ref="form">
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="permissionParams.name" />
        </el-form-item>
        <el-form-item label="权限值" prop="code">
          <el-input v-model.trim="permissionParams.code" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
