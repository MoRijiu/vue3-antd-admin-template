/**
 * Commitlint 配置文件
 * 用于验证 Git 提交信息格式是否符合规范
 * 配合 cz-git 使用，提供中文交互式提交体验
 */
module.exports = {
  // 继承常规提交规范
  extends: ['@commitlint/config-conventional'],

  // 自定义规则
  rules: {
    // ==================== Type 类型规则 ====================
    // type 必须是以下类型之一
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 Bug
        'docs', // 文档变更
        'style', // 代码格式（不影响代码运行的变动）
        'refactor', // 重构（既不是新增功能，也不是修复 Bug）
        'perf', // 性能优化
        'test', // 增加测试
        'build', // 构建过程或辅助工具的变动
        'ci', // CI 配置文件和脚本的变动
        'chore', // 其他不修改 src 或测试文件的变动
        'revert', // 回退之前的提交
      ],
    ],

    // ==================== Subject 主题规则 ====================
    // subject 不能为空
    'subject-empty': [2, 'never'],
    // subject 不能以句号结尾
    'subject-full-stop': [2, 'never', '.'],
    // subject 大小写不做限制（允许中文）
    'subject-case': [0],

    // ==================== Type 规则 ====================
    // type 不能为空
    'type-empty': [2, 'never'],
    // type 必须小写
    'type-case': [2, 'always', 'lower-case'],

    // ==================== Scope 范围规则 ====================
    // scope 大小写不做限制
    'scope-case': [0],

    // ==================== Header 规则 ====================
    // header 最大长度 100 字符
    'header-max-length': [2, 'always', 100],

    // ==================== Body 规则 ====================
    // body 前必须有空行
    'body-leading-blank': [2, 'always'],

    // ==================== Footer 规则 ====================
    // footer 前必须有空行
    'footer-leading-blank': [1, 'always'],
  },

  // ==================== 提示信息配置 ====================
  prompt: {
    // 使用 cz-git 作为交互式命令行工具
    useEmoji: false, // 不使用 emoji
    emojiAlign: 'center',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,

    // ==================== 中文提示配置 ====================
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联 issue 前缀（可选）:',
      customFooterPrefix: '输入自定义 issue 前缀 :',
      footer: '列举关联 issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改 commit ?',
    },

    // ==================== 类型选项（中文） ====================
    types: [
      { value: 'feat', name: 'feat:     ✨  新增功能 | A new feature', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:      🐛  修复缺陷 | A bug fix', emoji: ':bug:' },
      {
        value: 'docs',
        name: 'docs:     📝  文档更新 | Documentation only changes',
        emoji: ':memo:',
      },
      {
        value: 'style',
        name: 'style:    💄  代码格式 | Changes that do not affect the meaning of the code',
        emoji: ':lipstick:',
      },
      {
        value: 'refactor',
        name: 'refactor: ♻️   代码重构 | A code change that neither fixes a bug nor adds a feature',
        emoji: ':recycle:',
      },
      {
        value: 'perf',
        name: 'perf:     ⚡️  性能提升 | A code change that improves performance',
        emoji: ':zap:',
      },
      {
        value: 'test',
        name: 'test:     ✅  测试相关 | Adding missing tests or correcting existing tests',
        emoji: ':white_check_mark:',
      },
      {
        value: 'build',
        name: 'build:    📦️  构建相关 | Changes that affect the build system or external dependencies',
        emoji: ':package:',
      },
      {
        value: 'ci',
        name: 'ci:       🎡  持续集成 | Changes to our CI configuration files and scripts',
        emoji: ':ferris_wheel:',
      },
      {
        value: 'chore',
        name: 'chore:    🔨  其他修改 | Other changes that do not modify src or test files',
        emoji: ':hammer:',
      },
      {
        value: 'revert',
        name: 'revert:   ⏪️  回退代码 | Reverts a previous commit',
        emoji: ':rewind:',
      },
    ],

    // ==================== 范围选项（根据项目自定义） ====================
    scopes: [
      { value: 'components', name: 'components: 组件相关' },
      { value: 'hooks', name: 'hooks:      Hook 相关' },
      { value: 'utils', name: 'utils:      工具相关' },
      { value: 'styles', name: 'styles:     样式相关' },
      { value: 'deps', name: 'deps:       依赖相关' },
      { value: 'config', name: 'config:     配置相关' },
      { value: 'types', name: 'types:      类型定义' },
      { value: 'api', name: 'api:        接口相关' },
      { value: 'router', name: 'router:     路由相关' },
      { value: 'store', name: 'store:      状态管理' },
      { value: 'mock', name: 'mock:       Mock 数据' },
      { value: 'i18n', name: 'i18n:       国际化' },
      { value: 'layout', name: 'layout:     布局相关' },
      { value: 'views', name: 'views:      页面相关' },
      { value: 'other', name: 'other:      其他修改' },
    ],

    // 是否允许自定义范围
    allowCustomScopes: true,
    // 是否允许空范围
    allowEmptyScopes: true,
    // 跳过的问题
    skipQuestions: [],
    // subject 最小长度
    minSubjectLength: 3,
    // subject 最大长度
    maxSubjectLength: 100,
    // body 最大长度
    maxHeaderLength: 100,
  },
}
