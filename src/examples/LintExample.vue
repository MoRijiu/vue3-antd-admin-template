<template>
  <div class="lint-example">
    <!-- 标题 -->
    <h2 class="title">{{ displayTitle }}</h2>

    <!-- 计数显示 -->
    <div class="counter">
      <p class="count-text">当前计数: {{ localCount }}</p>
      <p class="count-text">双倍计数: {{ doubleCount }}</p>
    </div>

    <!-- 操作按钮 -->
    <div class="actions">
      <button class="btn btn-primary" :disabled="disabled" @click="decrement">-</button>

      <button class="btn btn-secondary" :disabled="disabled" @click="increment">+</button>

      <button class="btn" :disabled="disabled" @click="reset">重置</button>
    </div>

    <!-- 输入框 -->
    <div class="input-group">
      <input
        v-model="inputValue"
        type="text"
        placeholder="请输入内容"
        :disabled="disabled"
        @input="handleInput($event.target.value)"
      />
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading">加载中...</div>

    <!-- 点击区域 -->
    <div class="click-area" @click="handleClick">点击我</div>
  </div>
</template>

<script setup lang="ts">
/**
 * ESLint 和 Prettier 示例组件
 * 展示 Vue 3 组件的代码规范
 */
import { ref, computed, onMounted } from 'vue'

// ==================== Props 定义 ====================
interface Props {
  title?: string
  count?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '默认标题',
  count: 0,
  disabled: false,
})

// ==================== Emits 定义 ====================
interface Emits {
  (e: 'update:count', value: number): void
  (e: 'click', event: MouseEvent): void
}

const emit = defineEmits<Emits>()

// ==================== 响应式数据 ====================
const localCount = ref(props.count)
const inputValue = ref('')
const isLoading = ref(false)

// ==================== 计算属性 ====================
const doubleCount = computed(() => localCount.value * 2)

const displayTitle = computed(() => {
  return props.title.toUpperCase()
})

// ==================== 方法 ====================
/**
 * 增加计数
 */
function increment(): void {
  if (!props.disabled) {
    localCount.value++
    emit('update:count', localCount.value)
  }
}

/**
 * 减少计数
 */
function decrement(): void {
  if (!props.disabled && localCount.value > 0) {
    localCount.value--
    emit('update:count', localCount.value)
  }
}

/**
 * 重置计数
 */
function reset(): void {
  localCount.value = 0
  emit('update:count', 0)
}

/**
 * 处理点击事件
 */
function handleClick(event: MouseEvent): void {
  emit('click', event)
}

/**
 * 处理输入
 */
function handleInput(value: string): void {
  inputValue.value = value
}

// ==================== 生命周期 ====================
onMounted(() => {
  console.warn('组件已挂载')
})
</script>

<style lang="scss" scoped>
.lint-example {
  padding: $spacing-lg;
  background-color: $background-color-white;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-base;
}

.title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $primary-color;
  margin-bottom: $spacing-md;
}

.counter {
  margin-bottom: $spacing-lg;
}

.count-text {
  font-size: $font-size-lg;
  color: $text-color;
  margin-bottom: $spacing-sm;
}

.actions {
  display: flex;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
}

.input-group {
  margin-bottom: $spacing-lg;

  input {
    width: 100%;
    padding: $spacing-sm $spacing-md;
    border: $border-width-base solid $border-color;
    border-radius: $border-radius-base;
    font-size: $font-size-base;

    &:focus {
      outline: none;
      border-color: $primary-color;
    }

    &:disabled {
      background-color: $background-color-light;
      cursor: not-allowed;
    }
  }
}

.loading {
  padding: $spacing-md;
  text-align: center;
  color: $text-color-secondary;
}

.click-area {
  padding: $spacing-lg;
  background-color: $background-color-light;
  border-radius: $border-radius-base;
  text-align: center;
  cursor: pointer;
  transition: all $transition-duration-base $ease-in-out;

  &:hover {
    background-color: $primary-color;
    color: white;
  }
}
</style>
