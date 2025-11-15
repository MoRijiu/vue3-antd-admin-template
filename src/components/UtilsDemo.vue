<template>
  <div class="utils-demo">
    <h2 class="demo-title">工具函数示例</h2>

    <!-- 加密工具 -->
    <a-card title="加密工具" class="demo-card">
      <a-space direction="vertical" style="width: 100%">
        <a-input v-model:value="encryptText" placeholder="输入要加密的文本" />
        <a-space>
          <a-button @click="handleEncrypt">AES 加密</a-button>
          <a-button @click="handleDecrypt">AES 解密</a-button>
          <a-button @click="handleMD5">MD5 哈希</a-button>
        </a-space>
        <div v-if="encryptResult" class="result">{{ encryptResult }}</div>
      </a-space>
    </a-card>

    <!-- 格式化工具 -->
    <a-card title="格式化工具" class="demo-card">
      <a-space direction="vertical" style="width: 100%">
        <div class="info-item">
          <span class="label">文件大小:</span>
          <span class="value">{{ formatFileSize(1024 * 1024 * 5.5) }}</span>
        </div>
        <div class="info-item">
          <span class="label">金额:</span>
          <span class="value">{{ formatMoney(12345.67) }}</span>
        </div>
        <div class="info-item">
          <span class="label">手机号:</span>
          <span class="value">{{ formatPhone('13800138000') }}</span>
        </div>
        <div class="info-item">
          <span class="label">相对时间:</span>
          <span class="value">{{ formatRelativeTime(Date.now() - 3600000) }}</span>
        </div>
      </a-space>
    </a-card>

    <!-- 验证工具 -->
    <a-card title="验证工具" class="demo-card">
      <a-space direction="vertical" style="width: 100%">
        <a-input v-model:value="validateText" placeholder="输入要验证的内容" />
        <a-space wrap>
          <a-tag :color="isEmail(validateText) ? 'green' : 'red'">
            邮箱: {{ isEmail(validateText) ? '✓' : '✗' }}
          </a-tag>
          <a-tag :color="isPhone(validateText) ? 'green' : 'red'">
            手机: {{ isPhone(validateText) ? '✓' : '✗' }}
          </a-tag>
          <a-tag :color="isUrl(validateText) ? 'green' : 'red'">
            URL: {{ isUrl(validateText) ? '✓' : '✗' }}
          </a-tag>
        </a-space>
      </a-space>
    </a-card>

    <!-- 剪贴板工具 -->
    <a-card title="剪贴板工具" class="demo-card">
      <a-space>
        <a-input v-model:value="clipboardText" placeholder="输入要复制的文本" />
        <a-button @click="handleCopy">复制</a-button>
        <a-button @click="handlePaste">粘贴</a-button>
      </a-space>
    </a-card>

    <!-- 通用工具 -->
    <a-card title="通用工具" class="demo-card">
      <a-space direction="vertical" style="width: 100%">
        <div class="info-item">
          <span class="label">UUID:</span>
          <span class="value">{{ uuid() }}</span>
        </div>
        <div class="info-item">
          <span class="label">随机数 (1-100):</span>
          <span class="value">{{ random(1, 100) }}</span>
        </div>
        <a-space>
          <a-button @click="testDebounce">防抖测试</a-button>
          <a-button @click="testThrottle">节流测试</a-button>
        </a-space>
      </a-space>
    </a-card>

    <!-- DOM 工具 -->
    <a-card title="DOM 工具" class="demo-card">
      <a-space>
        <a-button @click="scrollToTop()">滚动到顶部</a-button>
        <a-button @click="scrollToBottom()">滚动到底部</a-button>
        <a-button @click="toggleFullscreen()">切换全屏</a-button>
      </a-space>
    </a-card>

    <!-- 存储工具 -->
    <a-card title="存储工具" class="demo-card">
      <a-space direction="vertical" style="width: 100%">
        <a-input v-model:value="storageKey" placeholder="存储键" />
        <a-input v-model:value="storageValue" placeholder="存储值" />
        <a-space>
          <a-button @click="handleSetStorage">存储</a-button>
          <a-button @click="handleGetStorage">读取</a-button>
          <a-button @click="handleSetEncryptedStorage">加密存储</a-button>
          <a-button @click="handleGetEncryptedStorage">加密读取</a-button>
        </a-space>
        <div v-if="storageResult" class="result">{{ storageResult }}</div>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
/**
 * 工具函数示例组件
 */
import {
  encryptAES,
  decryptAES,
  hashMD5,
  formatFileSize,
  formatMoney,
  formatPhone,
  formatRelativeTime,
  isEmail,
  isPhone,
  isUrl,
  copyToClipboard,
  readFromClipboard,
  uuid,
  random,
  debounce,
  throttle,
  scrollToTop,
  scrollToBottom,
  toggleFullscreen,
  setLocal,
  getLocal,
  setEncryptedStorage,
  getEncryptedStorage,
} from '@/utils'

const encryptText = ref('Hello World')
const encryptResult = ref('')
const validateText = ref('')
const clipboardText = ref('复制这段文本')
const storageKey = ref('test-key')
const storageValue = ref('test-value')
const storageResult = ref('')

/**
 * AES 加密
 */
function handleEncrypt() {
  encryptResult.value = encryptAES(encryptText.value)
  message.success('加密成功')
}

/**
 * AES 解密
 */
function handleDecrypt() {
  try {
    encryptResult.value = decryptAES(encryptResult.value)
    message.success('解密成功')
  } catch {
    message.error('解密失败')
  }
}

/**
 * MD5 哈希
 */
function handleMD5() {
  encryptResult.value = hashMD5(encryptText.value)
  message.success('哈希成功')
}

/**
 * 复制到剪贴板
 */
async function handleCopy() {
  const success = await copyToClipboard(clipboardText.value)
  if (success) {
    message.success('复制成功')
  } else {
    message.error('复制失败')
  }
}

/**
 * 从剪贴板粘贴
 */
async function handlePaste() {
  const text = await readFromClipboard()
  if (text) {
    clipboardText.value = text
    message.success('粘贴成功')
  } else {
    message.error('粘贴失败')
  }
}

/**
 * 防抖测试
 */
const testDebounce = debounce(() => {
  message.info('防抖函数执行')
}, 1000)

/**
 * 节流测试
 */
const testThrottle = throttle(() => {
  message.info('节流函数执行')
}, 1000)

/**
 * 存储
 */
function handleSetStorage() {
  setLocal(storageKey.value, storageValue.value)
  message.success('存储成功')
}

/**
 * 读取
 */
function handleGetStorage() {
  const value = getLocal(storageKey.value)
  storageResult.value = value || '未找到'
  message.success('读取成功')
}

/**
 * 加密存储
 */
function handleSetEncryptedStorage() {
  setEncryptedStorage(storageKey.value, storageValue.value)
  message.success('加密存储成功')
}

/**
 * 加密读取
 */
function handleGetEncryptedStorage() {
  const value = getEncryptedStorage(storageKey.value)
  storageResult.value = value || '未找到'
  message.success('读取成功')
}
</script>

<style lang="scss" scoped>
.utils-demo {
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
  width: 120px;
  font-weight: $font-weight-medium;
  color: $text-color-secondary;
}

.value {
  flex: 1;
  color: $text-color;
  font-family: monospace;
}

.result {
  padding: $spacing-sm;
  background-color: $background-color-light;
  border-radius: $border-radius-base;
  font-family: monospace;
  word-break: break-all;
}
</style>
