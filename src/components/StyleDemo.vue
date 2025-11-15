<script setup lang="ts">
/**
 * 样式演示组件
 * 展示 UnoCSS、Sass 变量、快捷方式等的使用
 */
const count = ref(0)
</script>

<template>
  <div class="demo-container">
    <h1 class="demo-title">样式配置演示</h1>

    <!-- UnoCSS 原子类示例 -->
    <section class="demo-section">
      <h2 class="section-title">1. UnoCSS 原子类</h2>
      <div class="flex gap-4 flex-wrap">
        <button class="btn">默认按钮</button>
        <button class="btn-primary">主要按钮</button>
        <button class="btn-secondary">次要按钮</button>
        <button class="icon-btn">图标按钮</button>
      </div>
    </section>

    <!-- Flex 布局示例 -->
    <section class="demo-section">
      <h2 class="section-title">2. Flex 布局工具类</h2>
      <div class="flex-center p-4 bg-blue-50 rounded-lg mb-4">
        <span>flex-center: 居中对齐</span>
      </div>
      <div class="flex-between p-4 bg-green-50 rounded-lg mb-4">
        <span>flex-between</span>
        <span>两端对齐</span>
      </div>
      <div class="flex-col-center p-4 bg-purple-50 rounded-lg">
        <span>flex-col-center</span>
        <span>垂直居中</span>
      </div>
    </section>

    <!-- 文本省略示例 -->
    <section class="demo-section">
      <h2 class="section-title">3. 文本省略</h2>
      <p class="text-ellipsis bg-gray-50 p-2 rounded mb-2">
        这是一段很长的文本，用于演示单行文本省略效果。这是一段很长的文本，用于演示单行文本省略效果。
      </p>
      <p class="text-ellipsis-2 bg-gray-50 p-2 rounded mb-2">
        这是一段很长的文本，用于演示两行文本省略效果。这是一段很长的文本，用于演示两行文本省略效果。这是一段很长的文本，用于演示两行文本省略效果。
      </p>
    </section>

    <!-- 响应式示例 -->
    <section class="demo-section">
      <h2 class="section-title">4. 响应式设计</h2>
      <div class="text-sm md:text-base lg:text-lg xl:text-xl p-4 bg-yellow-50 rounded-lg">
        响应式文本：在不同屏幕尺寸下显示不同大小
      </div>
    </section>

    <!-- Sass 变量示例 -->
    <section class="demo-section">
      <h2 class="section-title">5. Sass 变量样式</h2>
      <div class="custom-card">
        <h3>使用 Sass 变量的卡片</h3>
        <p>这个卡片使用了 Sass 变量定义的颜色、间距、圆角和阴影</p>
        <button class="custom-button" @click="count++">点击次数: {{ count }}</button>
      </div>
    </section>

    <!-- 属性化模式示例 -->
    <section class="demo-section">
      <h2 class="section-title">6. UnoCSS 属性化模式</h2>
      <div
        flex="~"
        items="center"
        justify="center"
        p="6"
        bg="gradient-to-r from-blue-500 to-purple-500"
        text="white lg"
        rounded="xl"
        shadow="lg"
      >
        属性化模式：更简洁的写法
      </div>
    </section>

    <!-- 变体组示例 -->
    <section class="demo-section">
      <h2 class="section-title">7. 变体组</h2>
      <div
        class="hover:(bg-blue-500 text-white scale-105) p-4 bg-gray-100 rounded-lg transition-all cursor-pointer"
      >
        鼠标悬停查看效果
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// 使用 Sass 变量（已自动导入）
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: $spacing-xl;
}

.demo-title {
  font-size: $font-size-xxl;
  font-weight: $font-weight-bold;
  color: $primary-color;
  margin-bottom: $spacing-xl;
  text-align: center;
}

.demo-section {
  margin-bottom: $spacing-xl;
  padding: $spacing-lg;
  background-color: $background-color-white;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-sm;
}

.section-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-medium;
  color: $text-color;
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-sm;
  border-bottom: $border-width-thick solid $border-color-light;
}

.custom-card {
  padding: $spacing-lg;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: $border-radius-xl;
  box-shadow: $box-shadow-lg;
  color: white;
  transition: transform $transition-duration-base $ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }

  h3 {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-sm;
  }

  p {
    margin-bottom: $spacing-md;
    opacity: 0.9;
  }
}

.custom-button {
  padding: $spacing-sm $spacing-lg;
  background-color: rgba(255, 255, 255, 0.2);
  border: $border-width-base solid rgba(255, 255, 255, 0.3);
  border-radius: $border-radius-base;
  color: white;
  font-weight: $font-weight-medium;
  cursor: pointer;
  transition: all $transition-duration-fast $ease-in-out;
  backdrop-filter: blur(10px);

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
