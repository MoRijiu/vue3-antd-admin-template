#!/bin/bash

# 重新安装 Mock 插件脚本
# 用于修复 vite-plugin-mock 3.x 版本的数据丢失问题

echo "========================================"
echo "重新安装 Mock 插件 (vite-plugin-mock)"
echo "========================================"
echo ""

# 1. 删除 node_modules
echo "1. 删除 node_modules..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
    echo "   ✓ node_modules 已删除"
else
    echo "   - node_modules 不存在"
fi

# 2. 删除 lock 文件
echo "2. 删除 lock 文件..."
if [ -f "pnpm-lock.yaml" ]; then
    rm pnpm-lock.yaml
    echo "   ✓ pnpm-lock.yaml 已删除"
fi
if [ -f "package-lock.json" ]; then
    rm package-lock.json
    echo "   ✓ package-lock.json 已删除"
fi

# 3. 删除 Vite 缓存
echo "3. 删除 Vite 缓存..."
if [ -d "node_modules/.vite" ]; then
    rm -rf node_modules/.vite
    echo "   ✓ Vite 缓存已删除"
fi

# 4. 重新安装依赖
echo "4. 重新安装依赖..."
echo "   正在运行: pnpm install"
pnpm install

if [ $? -eq 0 ]; then
    echo "   ✓ 依赖安装成功"
else
    echo "   ✗ 依赖安装失败"
    exit 1
fi

# 5. 检查版本
echo ""
echo "5. 检查 vite-plugin-mock 版本..."
pnpm list vite-plugin-mock

echo ""
echo "========================================"
echo "安装完成！"
echo "========================================"
echo ""
echo "下一步:"
echo "1. 运行: npm run dev:local"
echo "2. 访问: http://localhost:3000/test-login"
echo "3. 测试登录功能"
echo ""

