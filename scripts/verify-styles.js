/**
 * 样式配置验证脚本
 * 用于验证所有样式相关的配置文件是否正确
 */

import { existsSync } from 'fs'
import { resolve } from 'path'

const requiredFiles = [
  // 配置文件
  { path: 'uno.config.ts', name: 'UnoCSS 配置' },
  { path: 'postcss.config.cjs', name: 'PostCSS 配置' },
  { path: 'vite.config.ts', name: 'Vite 配置' },
  { path: '.browserslistrc', name: '浏览器兼容性配置' },
  { path: 'tsconfig.app.json', name: 'TypeScript 配置' },

  // 样式文件
  { path: 'src/styles/variables.scss', name: 'Sass 变量' },
  { path: 'src/styles/global.scss', name: '全局样式' },
  { path: 'src/types/env.d.ts', name: 'TypeScript 类型声明' },

  // 文档
  { path: 'STYLE_CONFIG_SUMMARY.md', name: '配置总结文档' },
  { path: 'STYLE_GUIDE.md', name: '使用指南文档' },
  { path: 'CHECKLIST.md', name: '检查清单文档' },
  { path: 'QUICK_REFERENCE.md', name: '快速参考文档' },
  { path: 'README_STYLES.md', name: '样式配置说明' },
]

console.log('🔍 开始验证样式配置...\n')

let allPassed = true
const missing = []

requiredFiles.forEach(({ path, name }) => {
  const fullPath = resolve(process.cwd(), path)
  const exists = existsSync(fullPath)

  if (exists) {
    console.log(`✅ ${name}: ${path}`)
  } else {
    console.log(`❌ ${name}: ${path} (缺失)`)
    missing.push({ path, name })
    allPassed = false
  }
})

console.log('\n' + '='.repeat(60))

if (allPassed) {
  console.log('\n🎉 所有配置文件都已正确创建！')
  console.log('\n📚 下一步：')
  console.log('  1. 运行 npm run dev 或 pnpm dev 启动开发服务器')
  console.log('  2. 访问 http://localhost:3000 查看演示页面')
  console.log('  3. 阅读 README_STYLES.md 了解如何使用')
  console.log('\n✨ 祝您开发愉快！')
} else {
  console.log('\n⚠️  发现缺失的文件：')
  missing.forEach(({ path, name }) => {
    console.log(`  - ${name}: ${path}`)
  })
  console.log('\n请检查配置是否完整。')
  process.exit(1)
}

console.log('\n' + '='.repeat(60) + '\n')
