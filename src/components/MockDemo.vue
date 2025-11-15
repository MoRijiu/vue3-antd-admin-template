<template>
  <div class="mock-demo">
    <a-card title="Mock 数据演示" :bordered="false">
      <!-- 环境信息 -->
      <a-alert
        :message="`当前 Mock 状态: ${mockEnabled ? '已启用' : '已禁用'}`"
        :type="mockEnabled ? 'success' : 'warning'"
        show-icon
        style="margin-bottom: 16px"
      >
        <template #description>
          <div>
            <p>环境: {{ envMode }}</p>
            <p>API 基础路径: {{ apiBaseUrl }}</p>
            <p v-if="mockEnabled">Mock 数据已启用，所有 API 请求将返回模拟数据</p>
            <p v-else>Mock 数据已禁用，请在 .env 文件中设置 VITE_USE_MOCK=true 启用</p>
          </div>
        </template>
      </a-alert>

      <!-- 操作按钮 -->
      <a-space style="margin-bottom: 16px">
        <a-button type="primary" :loading="loading" @click="testLogin">测试登录</a-button>
        <a-button :loading="loading" @click="testUserInfo">获取用户信息</a-button>
        <a-button :loading="loading" @click="testTableList">获取表格数据</a-button>
        <a-button :loading="loading" @click="testDashboard">获取仪表盘数据</a-button>
        <a-button danger @click="clearResult">清空结果</a-button>
      </a-space>

      <!-- 结果展示 -->
      <a-card v-if="result" title="响应结果" size="small">
        <pre>{{ JSON.stringify(result, null, 2) }}</pre>
      </a-card>
    </a-card>
  </div>
</template>

<script setup lang="ts">
/**
 * Mock 数据演示组件
 * 用于测试 Mock 接口是否正常工作
 */
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { getEnvMode, getApiBaseUrl } from '@/utils/env'
import { request } from '@/utils/request'

// 环境信息
const envMode = getEnvMode()
const apiBaseUrl = getApiBaseUrl()
const mockEnabled = import.meta.env.VITE_USE_MOCK

// 状态
const loading = ref(false)
const result = ref<any>(null)

/**
 * 测试登录接口
 */
const testLogin = async () => {
  loading.value = true
  try {
    const res = await request.post('/auth/login', {
      username: 'admin',
      password: '123456',
    })
    result.value = res
    message.success('登录成功')
  } catch (error: any) {
    message.error(error.message || '登录失败')
    result.value = { error: error.message }
  } finally {
    loading.value = false
  }
}

/**
 * 测试获取用户信息
 */
const testUserInfo = async () => {
  loading.value = true
  try {
    const res = await request.get('/user/info')
    result.value = res
    message.success('获取用户信息成功')
  } catch (error: any) {
    message.error(error.message || '获取用户信息失败')
    result.value = { error: error.message }
  } finally {
    loading.value = false
  }
}

/**
 * 测试获取表格数据
 */
const testTableList = async () => {
  loading.value = true
  try {
    const res = await request.get('/table/list', {
      params: {
        page: 1,
        pageSize: 10,
      },
    })
    result.value = res
    message.success('获取表格数据成功')
  } catch (error: any) {
    message.error(error.message || '获取表格数据失败')
    result.value = { error: error.message }
  } finally {
    loading.value = false
  }
}

/**
 * 测试获取仪表盘数据
 */
const testDashboard = async () => {
  loading.value = true
  try {
    const res = await request.get('/dashboard/statistics')
    result.value = res
    message.success('获取仪表盘数据成功')
  } catch (error: any) {
    message.error(error.message || '获取仪表盘数据失败')
    result.value = { error: error.message }
  } finally {
    loading.value = false
  }
}

/**
 * 清空结果
 */
const clearResult = () => {
  result.value = null
}
</script>

<style scoped lang="scss">
.mock-demo {
  padding: 24px;

  pre {
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    max-height: 500px;
  }
}
</style>
