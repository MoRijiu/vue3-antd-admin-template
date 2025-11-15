<template>
  <div class="error-404">
    <div class="error-content">
      <h1 class="error-code">404</h1>
      <p class="error-message">抱歉，您访问的页面不存在</p>
      <a-button type="primary" size="large" @click="goHome"> 返回首页 </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 404 页面
 */
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.error-404 {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: $background-color;
}

.error-content {
  text-align: center;
}

.error-code {
  font-size: 120px;
  font-weight: $font-weight-bold;
  color: $primary-color;
  margin-bottom: $spacing-md;
}

.error-message {
  font-size: $font-size-xl;
  color: $text-color-secondary;
  margin-bottom: $spacing-xl;
}
</style>
