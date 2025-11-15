/**
 * Mock 配置测试脚本
 * 用于验证 Mock 配置是否正确
 */

import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = resolve(__dirname, '..')

console.log('🔍 开始检查 Mock 配置...\n')

// 检查项
const checks = [
  {
    name: '检查 mockjs 依赖',
    check: () => {
      const packageJson = JSON.parse(readFileSync(resolve(rootDir, 'package.json'), 'utf-8'))
      return packageJson.devDependencies?.mockjs !== undefined
    },
  },
  {
    name: '检查 vite-plugin-mock 依赖',
    check: () => {
      const packageJson = JSON.parse(readFileSync(resolve(rootDir, 'package.json'), 'utf-8'))
      return packageJson.devDependencies?.['vite-plugin-mock'] !== undefined
    },
  },
  {
    name: '检查 vite.config.ts 配置',
    check: () => {
      const viteConfig = readFileSync(resolve(rootDir, 'vite.config.ts'), 'utf-8')
      return viteConfig.includes('viteMockServe') && viteConfig.includes('VITE_USE_MOCK')
    },
  },
  {
    name: '检查 mock 目录',
    check: () => {
      return existsSync(resolve(rootDir, 'mock'))
    },
  },
  {
    name: '检查 mock/_util.ts',
    check: () => {
      return existsSync(resolve(rootDir, 'mock/_util.ts'))
    },
  },
  {
    name: '检查 mock/user.ts',
    check: () => {
      return existsSync(resolve(rootDir, 'mock/user.ts'))
    },
  },
  {
    name: '检查 mock/menu.ts',
    check: () => {
      return existsSync(resolve(rootDir, 'mock/menu.ts'))
    },
  },
  {
    name: '检查 mock/table.ts',
    check: () => {
      return existsSync(resolve(rootDir, 'mock/table.ts'))
    },
  },
  {
    name: '检查 mock/dashboard.ts',
    check: () => {
      return existsSync(resolve(rootDir, 'mock/dashboard.ts'))
    },
  },
  {
    name: '检查 .env.local 配置',
    check: () => {
      if (!existsSync(resolve(rootDir, '.env.local'))) return false
      const envLocal = readFileSync(resolve(rootDir, '.env.local'), 'utf-8')
      return envLocal.includes('VITE_USE_MOCK')
    },
  },
  {
    name: '检查 MockDemo.vue 组件',
    check: () => {
      return existsSync(resolve(rootDir, 'src/components/MockDemo.vue'))
    },
  },
]

// 执行检查
let passCount = 0
let failCount = 0

checks.forEach((item) => {
  try {
    const result = item.check()
    if (result) {
      console.log(`✅ ${item.name}`)
      passCount++
    } else {
      console.log(`❌ ${item.name}`)
      failCount++
    }
  } catch (error) {
    console.log(`❌ ${item.name} - 错误: ${error.message}`)
    failCount++
  }
})

// 输出结果
console.log('\n' + '='.repeat(50))
console.log(`检查完成: ${passCount} 通过, ${failCount} 失败`)
console.log('='.repeat(50))

if (failCount === 0) {
  console.log('\n🎉 所有检查通过！Mock 配置正确！')
  console.log('\n📝 下一步:')
  console.log('1. 确保 .env.local 中 VITE_USE_MOCK=true')
  console.log('2. 运行 npm run dev:local 启动项目')
  console.log('3. 使用 MockDemo 组件测试 Mock 接口')
  process.exit(0)
} else {
  console.log('\n⚠️  部分检查未通过，请检查配置！')
  process.exit(1)
}
