/*
 * @Author: morijiu
 * @Date: 2025-11-15 17:24:17
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-11-15 22:45:34
 * @Description:
 * @FilePath: \vue3-antd-admin-template\.lintstagedrc.cjs
 */
/**
 * lint-staged 配置文件
 * 用于在 git commit 前对暂存的文件进行检查和格式化
 */
module.exports = {
  // ==================== JavaScript/TypeScript 文件 ====================
  '*.{js,jsx,ts,tsx}': [
    // 运行 ESLint 检查并自动修复
    'eslint --fix',
    // 运行 Prettier 格式化
    'prettier --write',
  ],

  // ==================== Vue 文件 ====================
  '*.vue': [
    // 运行 ESLint 检查并自动修复
    'eslint --fix',
    // 运行 Prettier 格式化
    'prettier --write',
  ],

  // ==================== 样式文件 ====================
  '*.{css,scss,sass,less,styl}': [
    // 运行 Prettier 格式化
    'prettier --write',
  ],

  // ==================== JSON/YAML 文件 ====================
  '*.{json,json5,jsonc}': [
    // 运行 Prettier 格式化
    'prettier --write',
  ],

  '*.{yml,yaml}': [
    // 运行 Prettier 格式化
    'prettier --write',
  ],

  // ==================== Markdown 文件 ====================
  '*.md': [
    // 运行 Prettier 格式化
    'prettier --write',
  ],

  // ==================== HTML 文件 ====================
  '*.html': [
    // 运行 Prettier 格式化
    'prettier --write',
  ],
}
