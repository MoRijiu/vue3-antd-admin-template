<template>
  <div class="locale-demo">
    <h2 class="demo-title">{{ t('settings.title') }}</h2>

    <a-card :title="t('settings.language')" class="demo-card">
      <a-space>
        <a-button type="primary" :disabled="locale === 'zh-CN'" @click="changeLocale('zh-CN')">
          中文
        </a-button>
        <a-button type="primary" :disabled="locale === 'en-US'" @click="changeLocale('en-US')">
          English
        </a-button>
      </a-space>

      <div class="info-item">
        <span class="label">{{ t('settings.language') }}:</span>
        <span class="value">{{ locale }}</span>
      </div>
    </a-card>

    <a-card :title="t('common.common')" class="demo-card">
      <a-space wrap>
        <a-button>{{ t('common.confirm') }}</a-button>
        <a-button>{{ t('common.cancel') }}</a-button>
        <a-button>{{ t('common.save') }}</a-button>
        <a-button>{{ t('common.delete') }}</a-button>
        <a-button>{{ t('common.edit') }}</a-button>
        <a-button>{{ t('common.add') }}</a-button>
        <a-button>{{ t('common.search') }}</a-button>
        <a-button>{{ t('common.reset') }}</a-button>
      </a-space>
    </a-card>

    <a-card :title="t('menu.home')" class="demo-card">
      <a-space direction="vertical" style="width: 100%">
        <div class="info-item">
          <span class="label">{{ t('menu.home') }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ t('menu.user') }}</span>
        </div>
        <div class="info-item">
          <span class="label">{{ t('menu.settings') }}</span>
        </div>
      </a-space>
    </a-card>

    <a-card :title="t('login.title')" class="demo-card">
      <a-form layout="vertical">
        <a-form-item :label="t('login.username')">
          <a-input :placeholder="t('login.usernamePlaceholder')" />
        </a-form-item>
        <a-form-item :label="t('login.password')">
          <a-input-password :placeholder="t('login.passwordPlaceholder')" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary">{{ t('login.login') }}</a-button>
        </a-form-item>
      </a-form>
    </a-card>

    <a-card :title="t('message.success')" class="demo-card">
      <a-space direction="vertical" style="width: 100%">
        <a-button @click="showMessage('success')">{{ t('message.saveSuccess') }}</a-button>
        <a-button @click="showMessage('error')">{{ t('message.saveFailed') }}</a-button>
        <a-button @click="showMessage('warning')">{{ t('common.warning') }}</a-button>
        <a-button @click="showMessage('info')">{{ t('common.info') }}</a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
/**
 * 国际化示例组件
 */
import { useLocale } from '@/composables/useLocale'

const { locale, t, changeLocale } = useLocale()

function showMessage(type: string) {
  const messages = {
    success: t('message.saveSuccess'),
    error: t('message.saveFailed'),
    warning: t('common.warning'),
    info: t('common.info'),
  }
  message.success(messages[type as keyof typeof messages])
}
</script>

<style lang="scss" scoped>
.locale-demo {
  padding: $spacing-lg;
}

.demo-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $primary-color;
  margin-bottom: $spacing-lg;
}

.demo-card {
  margin-bottom: $spacing-lg;
}

.info-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-sm 0;
}

.label {
  font-weight: $font-weight-medium;
  color: $text-color-secondary;
}

.value {
  color: $text-color;
  font-family: monospace;
}
</style>
