<template>
  <div class="request-demo">
    <h2 class="demo-title">Axios 请求示例</h2>

    <div class="demo-actions">
      <a-space wrap>
        <a-button type="primary" :loading="loading" @click="handleGetUsers">
          获取用户列表
        </a-button>

        <a-button :loading="loading" @click="handleGetUser(1)"> 获取用户详情 </a-button>

        <a-button :loading="loading" @click="handleCreateUser"> 创建用户 </a-button>

        <a-button :loading="loading" @click="handleUpdateUser(1)"> 更新用户 </a-button>

        <a-button danger :loading="loading" @click="handleDeleteUser(1)"> 删除用户 </a-button>

        <a-button type="primary" :loading="loading" @click="handleLogin"> 登录 </a-button>

        <a-upload :show-upload-list="false" :before-upload="() => false" @change="handleUpload">
          <a-button :loading="loading"> 上传文件 </a-button>
        </a-upload>

        <a-button :loading="loading" @click="handleExport"> 导出数据 </a-button>
      </a-space>
    </div>

    <div v-if="users.length > 0" class="demo-result">
      <h3>用户列表:</h3>
      <pre>{{ JSON.stringify(users, null, 2) }}</pre>
    </div>

    <div v-if="currentUser" class="demo-result">
      <h3>当前用户:</h3>
      <pre>{{ JSON.stringify(currentUser, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Axios 请求示例组件
 * 展示如何使用封装的请求方法
 */
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  getUserList,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  uploadAvatar,
  exportUsers,
} from '@/api/example'
import type { User, LoginParams } from '@/api/example'
import { downloadFile } from '@/utils/download'

// ==================== 响应式数据 ====================
const loading = ref(false)
const users = ref<User[]>([])
const currentUser = ref<User | null>(null)

// ==================== 方法 ====================
/**
 * 获取用户列表
 */
async function handleGetUsers() {
  loading.value = true
  try {
    const res = await getUserList({ page: 1, pageSize: 10 })
    users.value = res.data
    message.success('获取用户列表成功')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

/**
 * 获取用户详情
 */
async function handleGetUser(id: number) {
  loading.value = true
  try {
    const res = await getUserById(id)
    currentUser.value = res.data
    message.success('获取用户详情成功')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

/**
 * 创建用户
 */
async function handleCreateUser() {
  loading.value = true
  try {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
    }
    const res = await createUser(newUser)
    message.success('创建用户成功')
    console.log(res.data)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

/**
 * 更新用户
 */
async function handleUpdateUser(id: number) {
  loading.value = true
  try {
    const res = await updateUser(id, { name: 'Jane Doe' })
    message.success('更新用户成功')
    console.log(res.data)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

/**
 * 删除用户
 */
async function handleDeleteUser(id: number) {
  loading.value = true
  try {
    await deleteUser(id)
    message.success('删除用户成功')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

/**
 * 用户登录
 */
async function handleLogin() {
  loading.value = true
  try {
    const params: LoginParams = {
      username: 'admin',
      password: '123456',
    }
    const res = await login(params)
    message.success('登录成功')
    console.log('Token:', res.data.token)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

/**
 * 上传头像
 */
async function handleUpload(info: any) {
  const file = info.file
  if (!file) return

  loading.value = true
  try {
    const res = await uploadAvatar(file)
    message.success('上传成功')
    console.log('文件地址:', res.data.url)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

/**
 * 导出数据
 */
async function handleExport() {
  loading.value = true
  try {
    const response = await exportUsers()
    downloadFile(response, 'users.xlsx')
    message.success('导出成功')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.request-demo {
  padding: $spacing-lg;
  background-color: $background-color-white;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-base;
}

.demo-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $primary-color;
  margin-bottom: $spacing-lg;
}

.demo-actions {
  margin-bottom: $spacing-lg;
}

.demo-result {
  margin-top: $spacing-lg;
  padding: $spacing-md;
  background-color: $background-color-light;
  border-radius: $border-radius-base;

  h3 {
    font-size: $font-size-lg;
    font-weight: $font-weight-medium;
    margin-bottom: $spacing-sm;
  }

  pre {
    margin: 0;
    padding: $spacing-sm;
    background-color: white;
    border-radius: $border-radius-sm;
    overflow-x: auto;
    font-size: $font-size-sm;
  }
}
</style>
