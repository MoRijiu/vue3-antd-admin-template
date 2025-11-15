#!/bin/bash

# ESLint 和 Prettier 依赖安装脚本

echo "📦 开始安装 ESLint 和 Prettier 相关依赖..."

# 安装 ESLint 相关插件
pnpm add -D \
  eslint-plugin-vue \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-config-prettier \
  eslint-plugin-prettier \
  eslint-define-config

echo "✅ 依赖安装完成！"
echo ""
echo "📚 下一步："
echo "  1. 运行 npm run lint 检查代码"
echo "  2. 运行 npm run format 格式化代码"
echo "  3. 运行 npm run prepare 初始化 husky"

