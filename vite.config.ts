import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())

  // 将环境变量转换为正确的类型
  const viteEnv = {
    VITE_PORT: Number(env.VITE_PORT) || 3000,
    VITE_OPEN: env.VITE_OPEN === 'true',
    VITE_API_BASE_URL: env.VITE_API_BASE_URL || '/api',
    VITE_API_PROXY_TARGET: env.VITE_API_PROXY_TARGET || 'http://localhost:8080',
    VITE_USE_MOCK: env.VITE_USE_MOCK === 'true',
    VITE_DROP_CONSOLE: env.VITE_DROP_CONSOLE === 'true',
    VITE_SOURCEMAP: env.VITE_SOURCEMAP === 'true',
  }

  return {
    plugins: [
      vue(),
      // UnoCSS 插件
      UnoCSS(),
      // 自动导入 API
      AutoImport({
        // 自动导入 Vue 相关函数
        imports: [
          'vue',
          'vue-router',
          'pinia',
          'vue-i18n',
          {
            'ant-design-vue': ['message', 'notification', 'Modal'],
          },
        ],
        // 自动导入的类型声明文件位置
        dts: 'src/types/auto-imports.d.ts',
        // 解析器
        resolvers: [],
        // ESLint 配置
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      // 自动导入组件
      Components({
        // 组件解析器
        resolvers: [
          // Ant Design Vue 组件自动导入
          AntDesignVueResolver({
            importStyle: false, // 不自动导入样式，使用全局引入
          }),
        ],
        // 自动导入的类型声明文件位置
        dts: 'src/types/components.d.ts',
        // 组件所在目录
        dirs: ['src/components', 'src/layouts'],
        // 组件扩展名
        extensions: ['vue'],
        // 深度搜索
        deep: true,
      }),
      // Mock 数据插件（vite-plugin-mock 3.0.2 配置）
      viteMockServe({
        // mock 文件目录（相对于项目根目录）
        mockPath: 'mock',
        // 是否启用 mock（开发环境 + 环境变量控制）
        enable: viteEnv.VITE_USE_MOCK,
        // 是否监听 mock 文件变化
        watchFiles: true,
        // 是否在控制台显示请求日志
        logger: true,
      }),
    ],

    // 路径别名配置
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~': resolve(__dirname, 'src'),
      },
    },

    // CSS 配置
    css: {
      preprocessorOptions: {
        // Sass 全局变量配置
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },

    // 服务器配置
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // API 代理配置
      proxy: {
        // 代理所有 /api 开头的请求
        [viteEnv.VITE_API_BASE_URL]: {
          target: viteEnv.VITE_API_PROXY_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${viteEnv.VITE_API_BASE_URL}`), ''),
        },
      },
    },

    // 构建配置
    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: viteEnv.VITE_SOURCEMAP,
      // 分块策略
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            antd: ['ant-design-vue', '@ant-design/icons-vue'],
          },
        },
      },
      // 压缩配置
      minify: 'esbuild',
      // 生产环境删除 console 和 debugger
      ...(viteEnv.VITE_DROP_CONSOLE
        ? {
            esbuild: {
              drop: ['console', 'debugger'],
            },
          }
        : {}),
    },

    // 预构建配置
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'ant-design-vue', '@ant-design/icons-vue'],
    },
  }
})
