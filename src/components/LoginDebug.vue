<template>
  <div class="login-debug">
    <a-card title="登录调试工具" :bordered="false">
      <!-- Mock 状态 -->
      <a-alert
        :message="`Mock 状态: ${mockEnabled ? '已启用' : '已禁用'}`"
        :type="mockEnabled ? 'success' : 'warning'"
        show-icon
        style="margin-bottom: 16px"
      >
        <template #description>
          <p>环境: {{ env }}</p>
          <p>API 基础路径: {{ apiBaseUrl }}</p>
          <p v-if="!mockEnabled" style="color: red">
            ⚠️ Mock 未启用，请在 .env.local 中设置 VITE_USE_MOCK=true
          </p>
        </template>
      </a-alert>

      <!-- 登录测试 -->
      <a-space direction="vertical" style="width: 100%">
        <a-button type="primary" :loading="loading" block @click="testLogin">
          测试登录（admin/123456）
        </a-button>
        <a-button :loading="loading" block @click="testDirectRequest">
          直接测试 Mock 接口
        </a-button>
      </a-space>

      <!-- 请求日志 -->
      <a-card v-if="requestLog" title="请求日志" size="small" style="margin-top: 16px">
        <pre>{{ requestLog }}</pre>
      </a-card>

      <!-- 响应日志 -->
      <a-card v-if="responseLog" title="响应日志" size="small" style="margin-top: 16px">
        <pre>{{ responseLog }}</pre>
      </a-card>

      <!-- 错误日志 -->
      <a-card v-if="errorLog" title="错误日志" size="small" style="margin-top: 16px">
        <pre style="color: red">{{ errorLog }}</pre>
      </a-card>
    </a-card>
  </div>
</template>

<script setup lang="ts">
/**
 * 登录调试工具
 * 用于调试登录接口和 Mock 数据
 */
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import axios from 'axios'
import { getEnvMode, getApiBaseUrl } from '@/utils/env'
import { login } from '@/api/example'

// 环境信息
const env = getEnvMode()
const apiBaseUrl = getApiBaseUrl()
const mockEnabled = import.meta.env.VITE_USE_MOCK

// 状态
const loading = ref(false)
const requestLog = ref('')
const responseLog = ref('')
const errorLog = ref('')

/**
 * 测试登录
 */
const testLogin = async () => {
  loading.value = true
  requestLog.value = ''
  responseLog.value = ''
  errorLog.value = ''

  try {
    // 记录请求
    requestLog.value = JSON.stringify(
      {
        url: '/api/auth/login',
        method: 'POST',
        data: {
          username: 'admin',
          password: '123456',
        },
      },
      null,
      2
    )

    // 发送请求
    const res = await login({
      username: 'admin',
      password: '123456',
    })

    // 记录响应
    responseLog.value = JSON.stringify(res, null, 2)
    message.success('登录成功')
  } catch (error: any) {
    // 记录错误
    errorLog.value = JSON.stringify(
      {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      },
      null,
      2
    )
    message.error('登录失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

/**
 * 直接测试 Mock 接口
 */
const testDirectRequest = async () => {
  loading.value = true
  requestLog.value = ''
  responseLog.value = ''
  errorLog.value = ''

  try {
    // 记录请求
    requestLog.value = JSON.stringify(
      {
        url: '/api/auth/login',
        method: 'POST',
        baseURL: apiBaseUrl,
        data: {
          username: 'admin',
          password: '123456',
        },
      },
      null,
      2
    )

    // 直接使用 axios 发送请求
    const res = await axios.post(
      '/api/auth/login',
      {
        username: 'admin',
        password: '123456',
      },
      {
        baseURL: apiBaseUrl,
      }
    )

    // 记录响应
    responseLog.value = JSON.stringify(
      {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        data: res.data,
      },
      null,
      2
    )
    message.success('请求成功')
  } catch (error: any) {
    // 记录错误
    errorLog.value = JSON.stringify(
      {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack,
      },
      null,
      2
    )
    message.error('请求失败: ' + error.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-debug {
  padding: 24px;

  pre {
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    max-height: 400px;
  }
}
</style>
