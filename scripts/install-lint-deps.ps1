# ESLint 和 Prettier 依赖安装脚本（PowerShell）

Write-Host "📦 开始安装 ESLint 和 Prettier 相关依赖..." -ForegroundColor Green

# 安装 ESLint 相关插件
pnpm add -D `
  eslint-plugin-vue `
  @typescript-eslint/parser `
  @typescript-eslint/eslint-plugin `
  eslint-config-prettier `
  eslint-plugin-prettier `
  eslint-define-config

Write-Host ""
Write-Host "✅ 依赖安装完成！" -ForegroundColor Green
Write-Host ""
Write-Host "📚 下一步：" -ForegroundColor Yellow
Write-Host "  1. 运行 npm run lint 检查代码"
Write-Host "  2. 运行 npm run format 格式化代码"
Write-Host "  3. 运行 npm run prepare 初始化 husky"

