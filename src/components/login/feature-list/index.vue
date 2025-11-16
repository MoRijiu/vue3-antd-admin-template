<!--
  特性列表组件
  展示系统的三个核心特性，使用线框设计
-->
<template>
  <div class="feature-list">
    <div v-for="(feature, index) in features" :key="index" class="feature-item">
      <div class="feature-icon">
        <component :is="feature.icon" />
      </div>
      <div class="feature-content">
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-description">{{ feature.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  AppstoreOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons-vue'
import { useLocale } from '@/composables/useLocale'

// 国际化
const { t } = useLocale()

/**
 * 特性数据接口
 */
interface Feature {
  icon: any
  title: string
  description: string
}

/**
 * 特性列表
 */
const features = computed<Feature[]>(() => [
  {
    icon: AppstoreOutlined,
    title: t('login.features.feature1.title'),
    description: t('login.features.feature1.description'),
  },
  {
    icon: ThunderboltOutlined,
    title: t('login.features.feature2.title'),
    description: t('login.features.feature2.description'),
  },
  {
    icon: SafetyCertificateOutlined,
    title: t('login.features.feature3.title'),
    description: t('login.features.feature3.description'),
  },
])
</script>

<style lang="scss" scoped>
.feature-list {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 48px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 768px) {
    margin-top: 32px;
  }
}

.feature-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 24px 16px;
  border: 2px solid var(--border-color-light);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--border-color);
    background: rgba(255, 255, 255, 0.75);
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 1024px) {
    flex-direction: row;
    text-align: left;
    padding: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
}

// 深色主题下的特殊处理
html.dark .feature-item {
  background: rgba(0, 0, 0, 0.3);

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
}

.feature-icon {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  background: var(--background-color-white);
  color: var(--primary-color);
  font-size: 28px;

  @media (max-width: 1024px) {
    width: 48px;
    height: 48px;
    font-size: 24px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
}

.feature-content {
  flex: 1;
  color: var(--text-color);
}

.feature-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text-color);

  @media (max-width: 768px) {
    font-size: 15px;
  }
}

.feature-description {
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
  color: var(--text-color-secondary);

  @media (max-width: 768px) {
    font-size: 12px;
  }
}
</style>
