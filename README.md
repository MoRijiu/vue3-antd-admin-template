<!--
 * @Author: morijiu
 * @Date: 2025-11-15 15:43:33
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-11-16 19:32:14
 * @Description:
 * @FilePath: \vue3-antd-admin-template\README.md
-->
<div align="center">
  <h1>Vue3 Ant Design Admin Template</h1>
  <p>一个基于 Vue 3 + TypeScript + Ant Design Vue + Vite 的现代化后台管理系统模板</p>

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vue](https://img.shields.io/badge/Vue-3.5.24-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.1-646CFF.svg)](https://vitejs.dev/)
[![Ant Design Vue](https://img.shields.io/badge/Ant%20Design%20Vue-4.2.6-1890FF.svg)](https://antdv.com/)

</div>

## ✨ 特性

- 🚀 **最新技术栈**：基于 Vue 3.5、TypeScript 5.9、Vite 7 等最新技术
- 🎨 **UI 组件库**：使用 Ant Design Vue 4.x 组件库
- 🔐 **权限管理**：完整的路由权限控制和按钮级权限控制
- 🌍 **国际化**：内置 i18n 国际化方案，支持中英文切换
- 📦 **状态管理**：使用 Pinia 进行状态管理，支持持久化
- 🎯 **TypeScript**：完整的 TypeScript 类型支持
- 🎭 **Mock 数据**：内置 Mock 数据方案，方便开发调试
- 📊 **图表库**：集成 ECharts 图表库
- ✏️ **富文本编辑器**：集成 wangEditor 富文本编辑器
- 🎨 **原子化 CSS**：使用 UnoCSS 原子化 CSS 引擎
- 📝 **代码规范**：集成 ESLint + Prettier + Husky + Commitizen
- 🔄 **自动导入**：自动导入 Vue API 和组件，提升开发效率
- 📱 **响应式布局**：支持桌面端和移动端自适应

## 📦 技术栈

### 核心框架

- **Vue 3.5** - 渐进式 JavaScript 框架
- **TypeScript 5.9** - JavaScript 的超集
- **Vite 7** - 下一代前端构建工具

### UI 组件库

- **Ant Design Vue 4.2** - 企业级 UI 组件库
- **@ant-design/icons-vue** - Ant Design 图标库

### 状态管理

- **Pinia 3.0** - Vue 官方状态管理库
- **pinia-plugin-persistedstate** - Pinia 持久化插件

### 路由

- **Vue Router 4.6** - Vue 官方路由管理器

### 国际化

- **Vue I18n 11.1** - Vue 国际化插件

### CSS 方案

- **UnoCSS** - 即时按需原子化 CSS 引擎
- **Sass** - CSS 预处理器

### 工具库

- **Axios** - HTTP 客户端
- **Day.js** - 轻量级日期处理库
- **Lodash-es** - JavaScript 实用工具库
- **ECharts** - 数据可视化图表库
- **wangEditor** - 轻量级富文本编辑器
- **XLSX** - Excel 文件处理库
- **VueDraggable** - 拖拽组件
- **@vueuse/core** - Vue 组合式 API 工具集

### 开发工具

- **ESLint** - 代码检查工具
- **Prettier** - 代码格式化工具
- **Husky** - Git Hooks 工具
- **lint-staged** - Git 暂存文件检查工具
- **Commitizen** - Git 提交规范工具
- **cz-git** - Commitizen 适配器
- **Commitlint** - Git 提交信息校验工具
- **Mock.js** - 模拟数据生成器
- **vite-plugin-mock** - Vite Mock 插件

## 📁 项目结构

```
vue3-antd-admin-template/
├── .husky/                 # Git Hooks 配置
├── .vscode/                # VSCode 配置
├── mock/                   # Mock 数据
├── public/                 # 静态资源
├── scripts/                # 脚本文件
├── src/
│   ├── api/               # API 接口
│   ├── assets/            # 资源文件
│   ├── components/        # 公共组件
│   ├── composables/       # 组合式函数
│   ├── config/            # 配置文件
│   ├── directives/        # 自定义指令
│   ├── layouts/           # 布局组件
│   ├── locales/           # 国际化语言包
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理
│   ├── styles/            # 全局样式
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   ├── views/             # 页面组件
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── .editorconfig          # 编辑器配置
├── .env                   # 环境变量
├── .env.development       # 开发环境变量
├── .env.production        # 生产环境变量
├── .eslintrc-auto-import.json  # ESLint 自动导入配置
├── .gitignore             # Git 忽略文件
├── .lintstagedrc.cjs      # lint-staged 配置
├── .prettierignore        # Prettier 忽略文件
├── .prettierrc.cjs        # Prettier 配置
├── commitlint.config.cjs  # Commitlint 配置
├── eslint.config.js       # ESLint 配置
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── postcss.config.cjs     # PostCSS 配置
├── tsconfig.json          # TypeScript 配置
├── uno.config.ts          # UnoCSS 配置
└── vite.config.ts         # Vite 配置
```

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 20.19.1
- **pnpm**: >= 8.0.0（推荐使用 pnpm 作为包管理器）

> **为什么使用 pnpm？**
>
> - 更快的安装速度
> - 更少的磁盘空间占用
> - 更严格的依赖管理
> - 内置 Monorepo 支持

### 安装 pnpm

```bash
# 使用 npm 安装
npm install -g pnpm

# 或使用 Homebrew (macOS)
brew install pnpm

# 或使用 Scoop (Windows)
scoop install pnpm
```

### VSCode 配置

本项目已配置好 VSCode 开发环境，首次打开项目时会提示安装推荐的扩展。

#### 推荐扩展

**核心扩展（必需）：**

- **Vue Language Features (Volar)** - Vue 3 官方语言支持
- **TypeScript Vue Plugin** - TypeScript 和 Vue 集成
- **ESLint** - 代码检查
- **Prettier** - 代码格式化

**增强扩展（推荐）：**

- **UnoCSS** - UnoCSS 智能提示
- **Sass** - Sass 语法支持
- **Path Intellisense** - 路径智能提示
- **Auto Rename Tag** - 自动重命名标签
- **Error Lens** - 错误提示增强
- **GitLens** - Git 增强
- **i18n Ally** - 国际化支持

#### 自动配置

项目已配置以下 VSCode 功能：

- ✅ 保存时自动格式化（Prettier）
- ✅ 保存时自动修复 ESLint 错误
- ✅ TypeScript 类型提示和内联提示
- ✅ UnoCSS 类名智能提示
- ✅ 文件嵌套规则（保持目录整洁）
- ✅ 括号对着色
- ✅ 粘性滚动（显示当前作用域）

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/MoRijiu/vue3-antd-admin-template.git

# 进入项目目录
cd vue3-antd-admin-template

# 安装依赖（推荐使用 pnpm）
pnpm install

# 如果使用其他包管理器
# npm install
# yarn install
```

> **注意：** 项目配置了 `preinstall` 钩子，强制使用 pnpm 安装依赖。如果需要使用其他包管理器，请修改或删除 `package.json` 中的 `preinstall` 脚本。

### 开发模式

```bash
# 启动开发服务器（development 环境）
pnpm dev

# 启动开发服务器（local 环境）
pnpm dev:local

# 启动开发服务器（test 环境）
pnpm dev:test
```

访问 http://localhost:3000

### 构建生产

```bash
# 构建生产环境
pnpm build

# 构建开发环境
pnpm build:dev

# 构建测试环境
pnpm build:test
```

### 预览构建

```bash
# 预览生产构建
pnpm preview

# 预览开发构建
pnpm preview:dev

# 预览测试构建
pnpm preview:test
```

## 🛠️ 可用脚本

| 命令                | 说明                                     |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | 启动开发服务器（development 环境）       |
| `pnpm dev:local`    | 启动开发服务器（local 环境）             |
| `pnpm dev:test`     | 启动开发服务器（test 环境）              |
| `pnpm build`        | 构建生产环境（包含 TypeScript 类型检查） |
| `pnpm build:dev`    | 构建开发环境（包含 TypeScript 类型检查） |
| `pnpm build:test`   | 构建测试环境（包含 TypeScript 类型检查） |
| `pnpm preview`      | 预览生产构建                             |
| `pnpm preview:dev`  | 预览开发构建                             |
| `pnpm preview:test` | 预览测试构建                             |
| `pnpm type-check`   | TypeScript 类型检查（不构建）            |
| `pnpm lint`         | ESLint 检查并自动修复                    |
| `pnpm lint:check`   | ESLint 检查（不修复）                    |
| `pnpm format`       | Prettier 格式化代码                      |
| `pnpm format:check` | Prettier 检查代码格式                    |
| `pnpm clean`        | 清理构建产物和缓存                       |
| `pnpm commit`       | 使用 Commitizen 规范化提交（交互式）     |
| `pnpm prepare`      | 安装 Git Hooks（Husky）                  |

## 📐 代码规范

项目集成了完整的代码规范工具链，确保代码质量和一致性。

### ESLint

使用 ESLint 9.x 扁平配置（Flat Config）进行代码检查。

**配置文件：** `eslint.config.js`

**特性：**

- ✅ 支持 Vue 3 单文件组件
- ✅ 支持 TypeScript
- ✅ 自动识别 unplugin-auto-import 的全局变量
- ✅ 集成 Prettier 规则
- ✅ 自定义规则配置

**使用方法：**

```bash
# 检查并自动修复
pnpm lint

# 仅检查不修复
pnpm lint:check
```

**主要规则：**

- `no-console`: 警告（允许 `console.warn` 和 `console.error`）
- `@typescript-eslint/no-explicit-any`: 警告（建议使用具体类型）
- `@typescript-eslint/no-unused-vars`: 错误（允许下划线前缀的未使用变量）
- `vue/multi-word-component-names`: 关闭（允许单词组件名）

### Prettier

使用 Prettier 进行代码格式化，保持代码风格一致。

**配置文件：** `.prettierrc.cjs`

**格式化规则：**

- 单引号：`true`
- 分号：`false`（不使用分号）
- 缩进：`2` 空格
- 行宽：`100` 字符
- 尾随逗号：`es5`
- 箭头函数参数括号：`always`

**使用方法：**

```bash
# 格式化所有文件
pnpm format

# 检查代码格式
pnpm format:check
```

**VSCode 集成：**

项目已配置保存时自动格式化，无需手动运行命令。

### Git Hooks

使用 Husky + lint-staged 在提交前自动检查和格式化代码，确保提交的代码符合规范。

**配置文件：**

- `.husky/pre-commit` - 提交前钩子
- `.husky/commit-msg` - 提交信息校验钩子
- `.lintstagedrc.cjs` - lint-staged 配置

**工作流程：**

1. **pre-commit**: 提交前自动运行
   - 对暂存的文件运行 ESLint 自动修复
   - 对暂存的文件运行 Prettier 格式化
   - 只处理即将提交的文件，不影响其他文件

2. **commit-msg**: 提交信息格式校验
   - 使用 Commitlint 校验提交信息格式
   - 确保提交信息符合约定式提交规范

**首次使用：**

```bash
# 安装 Git Hooks
pnpm prepare
```

### Commitizen

使用 Commitizen 规范化 Git 提交信息：

```bash
# 使用交互式命令提交
pnpm commit
```

提交信息格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 代码重构（既不是新增功能，也不是修复 Bug）
- `perf`: 性能优化
- `test`: 测试相关
- `build`: 构建相关（影响构建系统或外部依赖）
- `ci`: 持续集成（修改 CI 配置文件和脚本）
- `chore`: 其他修改（不修改 src 或 test 文件）
- `revert`: 回退提交

**示例：**

```bash
# 使用交互式提交
pnpm commit

# 或手动编写符合规范的提交信息
git commit -m "feat(user): 添加用户登录功能"
git commit -m "fix(router): 修复路由守卫权限判断错误"
git commit -m "docs(readme): 更新安装说明"
```

## 💻 开发工作流

### 推荐的开发流程

1. **克隆项目并安装依赖**

   ```bash
   git clone https://github.com/MoRijiu/vue3-antd-admin-template.git
   cd vue3-antd-admin-template
   pnpm install
   ```

2. **启动开发服务器**

   ```bash
   pnpm dev
   ```

3. **开发新功能**
   - 在 `src/views` 中创建页面组件
   - 在 `src/router` 中配置路由
   - 在 `src/api` 中定义 API 接口
   - 在 `src/store` 中管理状态（如需要）

4. **代码检查和格式化**

   ```bash
   # VSCode 会在保存时自动格式化和修复
   # 也可以手动运行
   pnpm lint
   pnpm format
   ```

5. **类型检查**

   ```bash
   pnpm type-check
   ```

6. **提交代码**

   ```bash
   # 使用交互式提交（推荐）
   pnpm commit

   # 或使用 git commit
   git add .
   git commit -m "feat: 添加新功能"
   ```

7. **构建和预览**

   ```bash
   # 构建生产版本
   pnpm build

   # 预览构建结果
   pnpm preview
   ```

### 常见问题

**Q: 为什么必须使用 pnpm？**

A: 项目配置了 `preinstall` 钩子强制使用 pnpm，以确保依赖安装的一致性。如果需要使用其他包管理器，请删除 `package.json` 中的 `preinstall` 脚本。

**Q: ESLint 报错怎么办？**

A: 大多数 ESLint 错误可以通过 `pnpm lint` 自动修复。如果无法自动修复，请根据错误提示手动修改代码。

**Q: 如何禁用某个 ESLint 规则？**

A: 在 `eslint.config.js` 中修改规则配置，或在代码中使用注释禁用：

```javascript
// eslint-disable-next-line no-console
console.log('debug')
```

**Q: 如何添加新的环境变量？**

A: 在对应的 `.env.*` 文件中添加，变量名必须以 `VITE_` 开头：

```bash
# .env.development
VITE_NEW_VAR=value
```

**Q: Mock 数据不生效？**

A: 检查 `.env.*` 文件中的 `VITE_USE_MOCK` 是否为 `true`，并确保 Mock 文件在 `mock/` 目录下。

## 🔧 核心功能

### 路由权限

基于 Vue Router 的路由权限控制：

- 路由守卫自动验证登录状态
- 根据用户角色动态生成路由
- 支持路由元信息配置
- 支持路由懒加载

```typescript
// src/router/guards.ts
router.beforeEach((to, from, next) => {
  // 权限验证逻辑
})
```

### 状态管理

使用 Pinia 进行状态管理，支持持久化：

```typescript
// src/store/modules/user.ts
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const userInfo = ref(null)

    return { token, userInfo }
  },
  {
    persist: {
      key: 'user-store',
      storage: localStorage,
    },
  }
)
```

### 国际化

内置 Vue I18n 国际化方案：

```typescript
// 使用国际化
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// 切换语言
locale.value = 'en-US'

// 使用翻译
t('common.confirm')
```

### Mock 数据

使用 vite-plugin-mock 提供 Mock 数据：

```typescript
// mock/user.ts
export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: { token: 'mock-token' },
      }
    },
  },
]
```

### 自动导入

使用 unplugin-auto-import 和 unplugin-vue-components 自动导入：

- Vue API 自动导入（ref, computed, watch 等）
- Vue Router API 自动导入
- Pinia API 自动导入
- Ant Design Vue 组件自动导入
- 自定义组件自动导入

```vue
<script setup lang="ts">
// 无需手动导入，直接使用
const count = ref(0)
const router = useRouter()
const userStore = useUserStore()
</script>

<template>
  <!-- 组件自动导入 -->
  <a-button>按钮</a-button>
</template>
```

## 🎨 样式方案

### UnoCSS

使用 UnoCSS 原子化 CSS 引擎：

```vue
<template>
  <div class="flex items-center justify-center p-4 bg-blue-500 text-white">原子化 CSS</div>
</template>
```

### Sass

支持 Sass 预处理器，全局变量自动导入：

```scss
// src/styles/variables.scss
$primary-color: #1890ff;
$spacing-md: 16px;

// 组件中直接使用
.container {
  color: $primary-color;
  padding: $spacing-md;
}
```

## 📝 环境变量

项目支持多环境配置：

- `.env` - 所有环境通用配置
- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置
- `.env.test` - 测试环境配置
- `.env.local` - 本地环境配置（不提交到 Git）

```bash
# .env.development
VITE_APP_TITLE=Admin Template
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCK=true
```

在代码中使用：

```typescript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
```

## 🌐 浏览器支持

现代浏览器和 IE11+（需要 polyfills）

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| last 2 versions                                                                                                                                                                                       | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

## 📄 许可证

[MIT License](LICENSE) © 2025 [MoRijiu](https://github.com/MoRijiu)

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`pnpm commit`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📮 联系方式

- **作者**: MoRijiu
- **邮箱**: 1092257069@qq.com
- **GitHub**: [@MoRijiu](https://github.com/MoRijiu)

## ⭐ Star History

如果这个项目对你有帮助，请给一个 ⭐️ Star 支持一下！

## 🙏 鸣谢

感谢以下优秀的开源项目：

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Ant Design Vue](https://antdv.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [UnoCSS](https://unocss.dev/)
- [VueUse](https://vueuse.org/)

---

<div align="center">
  Made with ❤️ by MoRijiu
</div>
