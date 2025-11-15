<template>
  <div class="login-test">
    <a-card title="登录功能测试" :bordered="false">
      <!-- 登录状态 -->
      <a-alert
        :message="`登录状态: ${isLoggedIn ? '已登录' : '未登录'}`"
        :type="isLoggedIn ? 'success' : 'warning'"
        show-icon
        style="margin-bottom: 16px"
      >
        <template #description>
          <div v-if="isLoggedIn">
            <p>用户名: {{ userInfo?.name || userInfo?.username }}</p>
            <p>邮箱: {{ userInfo?.email }}</p>
            <p>角色: {{ userStore.roles.join(', ') }}</p>
            <p>Token: {{ userStore.token.substring(0, 20) }}...</p>
          </div>
          <div v-else>
            <p>请先登录</p>
          </div>
        </template>
      </a-alert>

      <!-- 快速登录按钮 -->
      <a-space style="margin-bottom: 16px">
        <a-button type="primary" :loading="loading" @click="quickLogin('admin')">
          管理员登录
        </a-button>
        <a-button :loading="loading" @click="quickLogin('user')">普通用户登录</a-button>
        <a-button danger :disabled="!isLoggedIn" @click="handleLogout">退出登录</a-button>
      </a-space>

      <!-- 自定义登录表单 -->
      <a-card title="自定义登录" size="small" style="margin-top: 16px">
        <a-form :model="formState" layout="inline" @finish="handleLogin">
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="formState.username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" :loading="loading">登录</a-button>
          </a-form-item>
        </a-form>
      </a-card>

      <!-- 测试账号说明 -->
      <a-card title="测试账号" size="small" style="margin-top: 16px">
        <a-descriptions :column="1" size="small">
          <a-descriptions-item label="管理员"> 用户名: admin, 密码: 123456 </a-descriptions-item>
          <a-descriptions-item label="普通用户"> 用户名: user, 密码: 123456 </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </a-card>
  </div>
</template>

<script setup lang="ts">
/**
 * 登录功能测试组件
 * 用于测试登录、登出功能
 */
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import type { LoginParams } from '@/api/example'

const router = useRouter()
const userStore = useUserStore()

// 状态
const loading = ref(false)
const formState = ref<LoginParams>({
  username: '',
  password: '',
})

// 计算属性
const isLoggedIn = computed(() => userStore.isLoggedIn())
const userInfo = computed(() => userStore.userInfo)

/**
 * 快速登录
 */
const quickLogin = async (type: 'admin' | 'user') => {
  loading.value = true
  try {
    await userStore.loginAction({
      username: type,
      password: '123456',
    })
    message.success(`${type === 'admin' ? '管理员' : '普通用户'}登录成功`)

    // 延迟跳转，让用户看到登录成功的状态
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (error: any) {
    message.error(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}

/**
 * 自定义登录
 */
const handleLogin = async () => {
  if (!formState.value.username || !formState.value.password) {
    message.warning('请输入用户名和密码')
    return
  }

  loading.value = true
  try {
    await userStore.loginAction(formState.value)
    message.success('登录成功')

    // 延迟跳转
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (error: any) {
    message.error(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}

/**
 * 退出登录
 */
const handleLogout = () => {
  userStore.logout()
  message.success('已退出登录')
}
</script>

<style scoped lang="scss">
.login-test {
  padding: 24px;
}
</style>
