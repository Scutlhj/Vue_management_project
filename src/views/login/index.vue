<template>
  <div class="login_container">
    <el-row>
      <!-- 一行分二十四份，span中指定份数，xs表示小于768时重新分配 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 配置表单校验时一定要将model和rule添加到form组件上，其次rule的属性名要与model绑定的名要一致，最后prop也得和model属性名对上 -->
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginElForm"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              size="default"
              type="primary"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
// 引入用户仓库
import useUserStore from '@/stores/modules/user'
// 引入时间工具类
import { getTime } from '@/utils/time'
let useStore = useUserStore()
// 编程式导航
let $router = useRouter()
let loginForm = reactive({
  username: 'admin',
  password: '111111',
})
// 定义el-form的实例对象
let loginElForm = ref()

let loading = ref(false)
// 配置规则,一个规则就是一个对象
const validatorUserName = (rule: any, value: string, callback: Function) => {
  if (/^[a-zA-Z][a-zA-Z0-9]{4,9}$/.test(value)) {
    callback()
  } else {
    callback(new Error('用户名必须以字母开头，长度在五到十位且不含有特殊字符'))
  }
}
const rules = {
  // 在username这里使用自定义规则
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { trigger: 'blur', validator: validatorUserName },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 5, max: 10, message: '密码长度为五到十位', trigger: 'blur' },
  ],
}

const login = async () => {
  try {
    await loginElForm.value.validate()
  } catch (error: any) {
    // 在这里输出错误提示信息
    // 错误信息的格式是一个对象，其中每个键对应一个表单项，值是一个数组，包含该表单项校验失败的所有错误信息
    // 如"password": [{"message": "密码长度为五到十位","fieldValue": "111111dsadsadas","field": "password"}]
    /* 此处为两个都错误时的输出,为了方便还是输出特定语句吧
    {
      "username": [
          {
              "field": "username",
              "fieldValue": "adminsadkasdjkdsa"
          }
      ],
      "password": [
          {
              "message": "密码长度为五到十位",
              "fieldValue": "111111asdjkasjaskdj",
              "field": "password"
          }
      ]
    } */
    ElNotification({
      type: 'error',
      message: '输入用户名或密码格式错误',
    })
    // 提前结束这个函数要不然后面的还会执行
    return
  }
  // 启动加载效果
  loading.value = true
  // 通知仓库发登录请求
  try {
    // 要是这里异常会跳到error
    // 请求成功到首页,失败弹出失败信息
    await useStore.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`,
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  } finally {
    // 最后关闭加载效果
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    width: 70%;
    position: relative;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
