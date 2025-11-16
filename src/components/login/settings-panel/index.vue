<!--
  登录页设置面板组件
  提供国际化、主题切换、主题色设置等功能
-->
<template>
  <div class="settings-panel">
    <!-- 国际化切换 -->
    <div class="setting-item">
      <a-tooltip :title="t('login.settings.language')" placement="left">
        <a-dropdown>
          <div class="setting-button">
            <GlobalOutlined />
          </div>
          <template #overlay>
            <a-menu @click="handleLanguageChange">
              <a-menu-item key="zh-CN">
                {{ t('login.settings.chinese') }}
              </a-menu-item>
              <a-menu-item key="en-US">
                {{ t('login.settings.english') }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-tooltip>
    </div>

    <!-- 明暗主题切换 -->
    <div class="setting-item">
      <a-tooltip :title="t('login.settings.theme')" placement="left">
        <div class="setting-button" @click="toggleTheme">
          <BulbOutlined v-if="isDark" />
          <BulbFilled v-else />
        </div>
      </a-tooltip>
    </div>

    <!-- 主题色选择 -->
    <div class="setting-item">
      <a-tooltip :title="t('login.settings.themeColor')" placement="left">
        <a-dropdown>
          <div class="setting-button">
            <BgColorsOutlined />
          </div>
          <template #overlay>
            <div class="color-picker-panel">
              <div
                v-for="color in themeColors"
                :key="color"
                class="color-item"
                :style="{ backgroundColor: color }"
                @click="handleColorChange(color)"
              >
                <CheckOutlined v-if="currentColor === color" />
              </div>
            </div>
          </template>
        </a-dropdown>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  GlobalOutlined,
  BulbOutlined,
  BulbFilled,
  BgColorsOutlined,
  CheckOutlined,
} from '@ant-design/icons-vue'
import { useLocale } from '@/composables/useLocale'
import { useAppStore } from '@/store/modules/app'
import { THEME_COLORS } from '@/config/theme'

// 国际化
const { t, changeLocale } = useLocale()

// App Store
const appStore = useAppStore()

/**
 * 主题模式（从 store 获取）
 */
const isDark = computed(() => appStore.theme === 'dark')

/**
 * 当前主题色（从 store 获取）
 */
const currentColor = computed(() => appStore.themeColor)

/**
 * 预设主题色列表（从配置文件获取）
 */
const themeColors = THEME_COLORS.map((item) => item.value)

/**
 * 切换语言
 */
const handleLanguageChange = ({ key }: { key: string }) => {
  changeLocale(key)
}

/**
 * 切换主题模式
 */
const toggleTheme = () => {
  appStore.toggleTheme()
}

/**
 * 切换主题色
 */
const handleColorChange = (color: string) => {
  appStore.setThemeColor(color)
}
</script>

<style lang="scss" scoped>
.settings-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 0;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    padding: 0;
  }
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.setting-button {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--border-color-light);
  color: var(--text-color-secondary);
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    border-color: var(--border-color);
    color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
}

// 深色主题下的按钮样式
html.dark .setting-button {
  background: rgba(0, 0, 0, 0.3);

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
}

// 颜色选择面板
.color-picker-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 12px;
  background: var(--background-color-white);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-color-light);
}

.color-item {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
}
</style>
