<!--
  注册表单组件
  用于用户注册
-->
<template>
  <div class="register-form">
    <!-- 标题 -->
    <div class="register-form-header">
      <h2 class="register-form-title">{{ t('login.registerTitle') }}🚀</h2>
      <p class="register-form-subtitle">{{ t('login.registerSubtitle') }}</p>
    </div>

    <!-- 表单 -->
    <a-form
      :model="formState"
      :rules="rules"
      layout="vertical"
      class="register-form-content"
      @finish="handleSubmit"
    >
      <!-- 用户名 -->
      <a-form-item name="username" :label="t('login.username')">
        <a-input
          v-model:value="formState.username"
          :placeholder="t('login.usernamePlaceholder')"
          size="large"
          allow-clear
        >
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>

      <!-- 密码 -->
      <a-form-item name="password" :label="t('login.password')">
        <a-input-password
          v-model:value="formState.password"
          :placeholder="t('login.passwordPlaceholder')"
          size="large"
          allow-clear
        >
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <!-- 确认密码 -->
      <a-form-item name="confirmPassword" :label="t('login.confirmPassword')">
        <a-input-password
          v-model:value="formState.confirmPassword"
          :placeholder="t('login.confirmPasswordPlaceholder')"
          size="large"
          allow-clear
        >
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <!-- 注册按钮 -->
      <a-form-item style="margin-top: 32px">
        <a-button type="primary" html-type="submit" size="large" :loading="loading" block>
          {{ t('login.registerButton') }}
        </a-button>
      </a-form-item>

      <!-- 返回登录 -->
      <a-form-item>
        <div class="back-to-login">
          <span>{{ t('login.hasAccount') }}</span>
          <a @click="handleBackToLogin">{{ t('login.backToLogin') }}</a>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useLocale } from '@/composables/useLocale'

/**
 * 组件事件
 */
interface Emits {
  (e: 'submit', data: RegisterFormData): void // 提交注册
  (e: 'back'): void // 返回登录
}

const emit = defineEmits<Emits>()

// 国际化
const { t } = useLocale()

// 加载状态
const loading = ref(false)

/**
 * 注册表单数据
 */
interface RegisterFormData {
  username: string
  password: string
  confirmPassword: string
}

// 表单数据
const formState = reactive<RegisterFormData>({
  username: '',
  password: '',
  confirmPassword: '',
})

// 表单验证规则
const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: t('login.usernameRequired'), trigger: 'blur' }],
  password: [
    { required: true, message: t('login.passwordRequired'), trigger: 'blur' },
    { min: 6, message: t('login.passwordLength'), trigger: 'blur' },
  ],
  confirmPassword: [
    {
      required: true,
      message: t('login.confirmPasswordRequired'),
      trigger: 'blur',
    },
    {
      validator: (_rule: Rule, value: string) => {
        if (!value) return Promise.resolve()
        if (value !== formState.password) {
          return Promise.reject(t('login.passwordNotMatch'))
        }
        return Promise.resolve()
      },
      trigger: 'blur',
    },
  ],
}

/**
 * 提交表单
 */
async function handleSubmit() {
  loading.value = true
  try {
    // 触发提交事件
    emit('submit', { ...formState })
  } catch (error: any) {
    message.error(error.message || t('login.registerFailed'))
  } finally {
    loading.value = false
  }
}

/**
 * 返回登录
 */
function handleBackToLogin() {
  emit('back')
}
</script>

<style lang="scss" scoped>
.register-form {
  width: 100%;

  &-header {
    text-align: center;
    margin-bottom: 32px;
  }

  &-title {
    font-size: 28px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 8px;
  }

  &-subtitle {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    margin: 0;
  }

  &-content {
    :deep(.ant-form-item) {
      margin-bottom: 16px;
    }

    :deep(.ant-input-affix-wrapper),
    :deep(.ant-input) {
      border-radius: 8px;
    }
  }

  .back-to-login {
    text-align: center;
    font-size: 14px;
    color: var(--text-color-secondary);

    a {
      color: var(--primary-color);
      margin-left: 8px;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
