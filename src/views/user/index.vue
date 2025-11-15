<template>
  <div class="user">
    <h2>用户管理</h2>

    <a-table :columns="columns" :data-source="users" :loading="loading" row-key="id" />

    <a-divider />

    <RequestDemo />
  </div>
</template>

<script setup lang="ts">
/**
 * 用户管理页面
 */
import { ref, onMounted } from 'vue'
import { getUserList } from '@/api/example'
import type { User } from '@/api/example'
import RequestDemo from '@/components/RequestDemo.vue'

const loading = ref(false)
const users = ref<User[]>([])

// 表格列配置
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
]

// 加载用户列表
async function loadUsers() {
  loading.value = true
  try {
    const res = await getUserList()
    users.value = res.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadUsers()
})
</script>

<style lang="scss" scoped>
.user {
  h2 {
    margin-bottom: $spacing-lg;
  }
}
</style>
