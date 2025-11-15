<template>
  <div class="test-login-page">
    <a-card title="登录测试页面" style="max-width: 800px; margin: 50px auto">
      <!-- Mock 状态 -->
      <a-alert
        :message="`Mock 状态: ${mockEnabled ? '✅ 已启用' : '❌ 未启用'}`"
        :type="mockEnabled ? 'success' : 'error'"
        show-icon
        style="margin-bottom: 20px"
      />

      <!-- 测试按钮 -->
      <a-space direction="vertical" style="width: 100%; margin-bottom: 20px">
        <a-button type="primary" block :loading="loading" @click="testMockHello">
          1. 测试 Mock 基础功能 (/api/test/hello)
        </a-button>
        <a-button type="primary" block :loading="loading" @click="testDirectFetch">
          2. 直接 Fetch 登录接口
        </a-button>
        <a-button type="primary" block :loading="loading" @click="testAxiosLogin">
          3. 使用 Axios 登录
        </a-button>
        <a-button type="primary" block :loading="loading" @click="testStoreLogin">
          4. 使用 Store 登录
        </a-button>
      </a-space>

      <!-- 日志输出 -->
      <a-card title="测试日志" size="small">
        <pre style="max-height: 400px; overflow-y: auto">{{ logs }}</pre>
      </a-card>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import axios from 'axios'
import { useUserStore } from '@/store/modules/user'
import { login } from '@/api/example'

const mockEnabled = import.meta.env.VITE_USE_MOCK
const loading = ref(false)
const logs = ref('')
const userStore = useUserStore()

const addLog = (msg: string, data?: any) => {
  const timestamp = new Date().toLocaleTimeString()
  logs.value += `\n[${timestamp}] ${msg}\n`
  if (data) {
    logs.value += JSON.stringify(data, null, 2) + '\n'
  }
  logs.value += '-'.repeat(50) + '\n'
}

// 测试 1: Mock 基础功能
const testMockHello = async () => {
  loading.value = true
  logs.value = ''
  try {
    addLog('测试 1: 调用 /api/test/hello')
    const res = await fetch('/api/test/hello')
    const data = await res.json()
    addLog('响应成功:', data)
    message.success('Mock 基础功能正常')
  } catch (error: any) {
    addLog('错误:', error.message)
    message.error('测试失败')
  } finally {
    loading.value = false
  }
}

// 测试 2: 直接 Fetch
const testDirectFetch = async () => {
  loading.value = true
  logs.value = ''
  try {
    addLog('测试 2: 直接 Fetch 登录接口')
    addLog('请求参数:', { username: 'admin', password: '123456' })

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: '123456' }),
    })

    addLog('HTTP 状态:', res.status)
    const data = await res.json()
    addLog('响应数据:', data)

    if (data.code === 200) {
      message.success('登录成功')
    } else {
      message.error('登录失败')
    }
  } catch (error: any) {
    addLog('错误:', error.message)
    message.error('测试失败')
  } finally {
    loading.value = false
  }
}

// 测试 3: 使用 Axios
const testAxiosLogin = async () => {
  loading.value = true
  logs.value = ''
  try {
    addLog('测试 3: 使用 Axios 登录')
    addLog('请求参数:', { username: 'admin', password: '123456' })

    const res = await axios.post('/api/auth/login', {
      username: 'admin',
      password: '123456',
    })

    addLog('Axios 响应:', res.data)
    message.success('登录成功')
  } catch (error: any) {
    addLog('错误:', error.message)
    addLog('错误详情:', error.response?.data)
    message.error('测试失败')
  } finally {
    loading.value = false
  }
}

// 测试 4: 使用 Store
const testStoreLogin = async () => {
  loading.value = true
  logs.value = ''
  try {
    addLog('测试 4: 使用 Store 登录')
    addLog('请求参数:', { username: 'admin', password: '123456' })

    const res = await login({ username: 'admin', password: '123456' })
    addLog('API 返回:', res)

    await userStore.loginAction({ username: 'admin', password: '123456' })
    addLog('Store 状态:', {
      token: userStore.token,
      userInfo: userStore.userInfo,
      roles: userStore.roles,
    })

    message.success('登录成功')
  } catch (error: any) {
    addLog('错误:', error.message)
    message.error('测试失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.test-login-page {
  min-height: 100vh;
  background: #f0f2f5;
  padding: 20px;
}

pre {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.5;
}
</style>
