<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import {
  reqAddOrUpdateUser,
  reqDeleteUser,
  reqGetUserInfo,
  reqGetUserPager,
  reqGetUserRole,
  reqSetUserRole,
  reqDeleteUserList,
} from '@/api/acl/user'
import {
  UserPagerResponseData,
  UserRecords,
  User,
  UserResponseData,
  UserRoleData,
  UserRoleParams,
} from '@/api/acl/user/type'
import { ElMessage, ElMessageBox } from 'element-plus'
import useUserStore from '@/stores/modules/user'
import useLayoutSettingStore from '@/stores/modules/setting'
import { getCurrentTime } from '@/utils/time'
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userPager = ref<UserRecords>([])
let form = ref()
// 如果改到了自己的用户信息需要刷新
let refresh = ref<boolean>(false)
let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
// 查询的关键字
let keyword = ref<string>('')
// 职位抽屉中的全选是否选中
let checkAll = ref(false)
// 一旦点击搜索禁用输入框
let lockInput = ref<boolean>(false)
// 全选checkbox的不确定状态显示,一旦显示该状态将会覆盖是否选中
let isIndeterminate = ref(false)
// 全部岗位数据
let allRoles = ref<UserRoleData[]>([])
// 选中的岗位数据
let checkedRoles = ref<UserRoleData[]>([])
// 选中的用户数据
let checkedUser = ref<UserRecords>([])
// 全选checkbox改变的事件val是其是否选中的状态
const handleCheckAllChange = (val: boolean) => {
  // 全选or全不选
  checkedRoles.value = val ? allRoles.value : []
  // 取消不确定状态
  isIndeterminate.value = false
}
// checkbox-group改变时的事件,value为改变后的数据
const handleCheckedCitiesChange = (value: UserRoleData[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRoles.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRoles.value.length
}
let userParams = ref<User>({
  username: '',
  password: '',
  name: '',
})
let userDrawer = ref<boolean>(false)
let roleDrawer = ref<boolean>(false)
const validatorUserName = (rule: any, value: string, callback: Function) => {
  if (/^[a-zA-Z][a-zA-Z0-9]{4,9}$/.test(value)) {
    callback()
  } else {
    callback(new Error('用户名必须以字母开头，长度在五到十位且只含有字母数字'))
  }
}
const validatorName = (rule: any, value: string, callback: Function) => {
  if (value.trim().length < 2) {
    callback(new Error('用户名称长度必须大于1'))
  } else {
    callback()
  }
}
const rules = {
  // 在username这里使用自定义规则
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { trigger: 'blur', validator: validatorUserName },
  ],
  name: [
    { required: true, message: '用户名称不能为空', trigger: 'blur' },
    { trigger: 'blur', validator: validatorName },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 5, max: 10, message: '密码长度为五到十位', trigger: 'blur' },
  ],
}
const getUserPager = async (pager = 1) => {
  pageNo.value = pager
  let result: UserPagerResponseData
  // 在没输入框未禁用的情况下全部强制发空串的,防止有些用户在输入框输入了东西又不点搜索按钮
  if (lockInput.value) {
    result = await reqGetUserPager(pageNo.value, pageSize.value, keyword.value)
  } else {
    result = await reqGetUserPager(pageNo.value, pageSize.value, '')
  }
  if (result.code === 200) {
    total.value = result.data.total
    userPager.value = result.data.records
  } else {
    ElMessage('获取该页用户信息失败')
  }
}
const searchUserPager = async () => {
  // 锁定输入框
  lockInput.value = true
  // 手动发一次请求
  getUserPager()
}
const reset = () => {
  // 相当于页面刷新功能,直接用仓库重载组件就行
  layoutSettingStore.changeRefresh()
}
const addUser = () => {
  userDrawer.value = true
  nextTick(() => {
    form.value.clearValidate()
  })
  refresh.value = false
  // JSON这个strify不会解析undefined的属性
  Object.assign(
    userParams.value,
    JSON.parse(
      JSON.stringify({
        username: '',
        password: '',
        name: '',
        roleName: '',
      }),
    ),
  )
  userParams.value.id = undefined
  userParams.value.createTime = undefined
  userParams.value.updateTime = undefined
}
const editUser = async (row: User) => {
  let result: UserResponseData = await reqGetUserInfo(row.id!)
  if (result.code === 200) {
    // 展开表单
    userDrawer.value = true
    nextTick(() => {
      form.value.clearValidate()
    })
    Object.assign(userParams.value, JSON.parse(JSON.stringify(result.data)))
    // 判断是否为自己的信息
    if (result.data.username === userStore.username) {
      refresh.value = true
    } else {
      refresh.value = false
    }
  } else {
    ElMessage.error('获取用户失败')
  }
}
const deleteUser = async (row: User) => {
  let result: any = await reqDeleteUser(row.id!)
  if (result.code === 200) {
    ElMessage.success('删除用户成功')
  } else {
    ElMessage.error('系统数据,不可删除')
  }
  getUserPager(userPager.value.length > 1 ? pageNo.value : pageNo.value - 1)
}
const batchDeleteUser = () => {
  // 整理数据
  let idList: number[] = checkedUser.value.map((item: User) => item.id!)
  ElMessageBox.confirm('确定批量删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      let result = await reqDeleteUserList(idList)
      if (result.code === 200) {
        ElMessage.success('删除成功')
      } else {
        ElMessage.error('含有系统数据,删除失败')
      }
      getUserPager()
    })
    .catch(() => {
      ElMessage.info('取消操作')
    })
}
const editRole = async (row: User) => {
  Object.assign(userParams.value, JSON.parse(JSON.stringify(row)))
  let result = await reqGetUserRole(userParams.value.id!)
  if (result.code === 200) {
    ElMessage.success('获取用户角色信息成功')
    allRoles.value = result.data.allRolesList
    checkedRoles.value = result.data.assignRoles
    roleDrawer.value = true
  } else {
    ElMessage.error('获取用户角色信息失败')
  }
}
const setUserConfirm = async () => {
  // 表单校验
  try {
    await form.value.validate()
  } catch (error) {
    ElMessage.error('表单校验不通过,请重新填写')
    return
  }
  // 修改更新时间为当前时间
  if (userParams.value.id) {
    userParams.value.updateTime = getCurrentTime()
  }
  // 发请求
  let result = await reqAddOrUpdateUser(userParams.value)
  if (result.code === 200) {
    ElMessage.success(userParams.value.id ? '修改成功' : '添加成功')
  } else {
    ElMessage.error(userParams.value.id ? '修改失败' : '添加失败')
  }
  // 后续操作
  userDrawer.value = false
  if (refresh.value) {
    window.location.reload()
  } else {
    getUserPager(userParams.value.id ? pageNo.value : 1)
  }
}
const setRoleConfirm = async () => {
  // 整理需要的数据
  let data: UserRoleParams = {
    userId: userParams.value.id!,
    roleIdList: checkedRoles.value.map((item) => {
      return item.id!
    }),
  }
  let result = await reqSetUserRole(data)
  if (result.code === 200) {
    ElMessage.success('更新角色成功')
  } else {
    ElMessage.error('更新角色失败')
  }
  // 后续处理
  roleDrawer.value = false
  getUserPager(pageNo.value)
}
onMounted(() => {
  getUserPager()
})
</script>

<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <el-form :inline="true" class="search_form">
        <el-form-item label="用户名:">
          <el-input
            placeholder="请输入用户名"
            size="default"
            clearable
            v-model="keyword"
            :disabled="lockInput"
            :title="lockInput ? '点击重置清除输入框' : ''"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="keyword === '' ? true : false"
            @click="searchUserPager"
          >
            搜索
          </el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button
        type="danger"
        @click="batchDeleteUser"
        :disabled="checkedUser.length > 0 ? false : true"
      >
        批量删除
      </el-button>
      <el-table
        :data="userPager"
        border
        style="margin: 20px 0"
        row-key="id"
        @selection-change="(selection: UserRecords) => { checkedUser = selection }"
      >
        <el-table-column
          type="selection"
          width="50px"
          align="center"
          :resizable="false"
        />
        <el-table-column
          type="index"
          width="80px"
          label="序号"
          align="center"
          :resizable="false"
        />
        <el-table-column
          label="id"
          width="100px"
          :resizable="false"
          prop="id"
        />
        <el-table-column label="用户名" :resizable="false" prop="username" />
        <el-table-column label="用户名称" :resizable="false" prop="name" />
        <el-table-column
          label="用户角色"
          :show-overflow-tooltip="true"
          :resizable="false"
          prop="roleName"
        />
        <el-table-column
          label="创建时间"
          :show-overflow-tooltip="true"
          :resizable="false"
          prop="createTime"
        />
        <el-table-column
          label="更新时间"
          :show-overflow-tooltip="true"
          :resizable="false"
          prop="updateTime"
        />
        <el-table-column
          label="操作"
          width="270px"
          align="center"
          :resizable="false"
        >
          <template #="{ row, $index }">
            <el-button
              type="success"
              icon="User"
              size="small"
              @click="editRole(row)"
            >
              分配角色
            </el-button>
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="editUser(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              width="200"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="Delete"
              icon-color="#626AEF"
              :title="`你确认删除${row.username}吗?`"
              @confirm="deleteUser(row)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" size="small">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="getUserPager()"
        @current-change="getUserPager"
        v-model:currentPage="pageNo"
        :page-sizes="[5, 7, 9, 11]"
        v-model:page-size="pageSize"
        layout="prev, pager, next, jumper,->,sizes,total "
        :total="total"
        background
        :pager-count="7"
      ></el-pagination>
    </el-card>
    <el-drawer v-model="userDrawer" size="30%">
      <template #header>
        <h4>{{ userParams.id ? '修改用户' : '添加用户' }}</h4>
      </template>
      <!-- 此处为drawer内容区 -->
      <template #default>
        <el-form
          :model="userParams"
          ref="form"
          label-width="80px"
          size="default"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="userParams.username"
              type="text"
              @paste.native.capture.prevent="false"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户名称" prop="name">
            <el-input
              v-model="userParams.name"
              type="text"
              @paste.native.capture.prevent="false"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            v-if="userParams.id ? false : true"
          >
            <el-input
              v-model="userParams.password"
              type="password"
              @paste.native.capture.prevent="false"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div>
          <el-button @click="userDrawer = false">取消</el-button>
          <el-button type="primary" @click="setUserConfirm">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <el-drawer v-model="roleDrawer" size="30%">
      <template #header>
        <h4>分配角色(职位)</h4>
      </template>
      <!-- 此处为drawer内容区 -->
      <template #default>
        <el-form label-width="80px" size="default">
          <el-form-item label="用户名">
            <el-input
              v-model="userParams.username"
              type="text"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="职位列表" size="default">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              style="margin-right: 30px"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="checkedRoles"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="checkedRole in allRoles"
                :key="checkedRole.id"
                :label="checkedRole"
              >
                {{ checkedRole.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div>
          <el-button @click="roleDrawer = false">取消</el-button>
          <el-button type="primary" @click="setRoleConfirm">确定</el-button>
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
