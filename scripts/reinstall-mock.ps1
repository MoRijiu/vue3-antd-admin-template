# 重新安装 Mock 插件脚本
# 用于修复 vite-plugin-mock 3.x 版本的数据丢失问题

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "重新安装 Mock 插件 (vite-plugin-mock)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 删除 node_modules
Write-Host "1. 删除 node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force node_modules
    Write-Host "   ✓ node_modules 已删除" -ForegroundColor Green
} else {
    Write-Host "   - node_modules 不存在" -ForegroundColor Gray
}

# 2. 删除 lock 文件
Write-Host "2. 删除 lock 文件..." -ForegroundColor Yellow
if (Test-Path "pnpm-lock.yaml") {
    Remove-Item pnpm-lock.yaml
    Write-Host "   ✓ pnpm-lock.yaml 已删除" -ForegroundColor Green
}
if (Test-Path "package-lock.json") {
    Remove-Item package-lock.json
    Write-Host "   ✓ package-lock.json 已删除" -ForegroundColor Green
}

# 3. 删除 Vite 缓存
Write-Host "3. 删除 Vite 缓存..." -ForegroundColor Yellow
if (Test-Path "node_modules/.vite") {
    Remove-Item -Recurse -Force node_modules/.vite
    Write-Host "   ✓ Vite 缓存已删除" -ForegroundColor Green
}

# 4. 重新安装依赖
Write-Host "4. 重新安装依赖..." -ForegroundColor Yellow
Write-Host "   正在运行: pnpm install" -ForegroundColor Gray
pnpm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ 依赖安装成功" -ForegroundColor Green
} else {
    Write-Host "   ✗ 依赖安装失败" -ForegroundColor Red
    exit 1
}

# 5. 检查版本
Write-Host ""
Write-Host "5. 检查 vite-plugin-mock 版本..." -ForegroundColor Yellow
pnpm list vite-plugin-mock

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "安装完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "下一步:" -ForegroundColor Yellow
Write-Host "1. 运行: npm run dev:local" -ForegroundColor White
Write-Host "2. 访问: http://localhost:3000/test-login" -ForegroundColor White
Write-Host "3. 测试登录功能" -ForegroundColor White
Write-Host ""

