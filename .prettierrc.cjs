/**
 * Prettier 配置文件
 * 用于统一代码格式化风格
 */
module.exports = {
  // ==================== 基础配置 ====================
  // 每行最大字符数
  printWidth: 100,

  // 缩进空格数
  tabWidth: 2,

  // 使用空格而不是制表符
  useTabs: false,

  // 语句末尾不添加分号
  semi: false,

  // 使用单引号
  singleQuote: true,

  // 对象属性的引号使用
  // "as-needed" - 仅在需要时添加引号
  // "consistent" - 如果对象中有一个属性需要引号，则所有属性都添加引号
  // "preserve" - 保留输入中的引号
  quoteProps: 'as-needed',

  // JSX 中使用单引号
  jsxSingleQuote: false,

  // ==================== 尾随逗号 ====================
  // "es5" - 在 ES5 中有效的尾随逗号（对象、数组等）
  // "none" - 无尾随逗号
  // "all" - 尽可能使用尾随逗号（包括函数参数）
  trailingComma: 'es5',

  // ==================== 括号和空格 ====================
  // 对象字面量中的空格
  // true: { foo: bar }
  // false: {foo: bar}
  bracketSpacing: true,

  // JSX 标签的 > 是否单独一行
  // true: <div
  //         className="test"
  //       >
  // false: <div
  //          className="test">
  bracketSameLine: false,

  // 箭头函数参数括号
  // "always" - 总是包含括号 (x) => x
  // "avoid" - 尽可能省略括号 x => x
  arrowParens: 'always',

  // ==================== 换行符 ====================
  // "lf" - 仅换行符（\n），在 Linux 和 macOS 以及 git repos 内部常见
  // "crlf" - 回车符 + 换行符（\r\n），在 Windows 上常见
  // "cr" - 仅回车符（\r），很少使用
  // "auto" - 维持现有的行尾（一个文件中的混合值通过查看第一行之后使用的内容进行标准化）
  endOfLine: 'lf',

  // ==================== HTML 配置 ====================
  // HTML 空格敏感性
  // "css" - 遵守 CSS display 属性的默认值
  // "strict" - 所有标签周围的空格（或缺少空格）被认为是重要的
  // "ignore" - 所有标签周围的空格（或缺少空格）被认为是无关紧要的
  htmlWhitespaceSensitivity: 'css',

  // ==================== Vue 配置 ====================
  // Vue 文件中 <script> 和 <style> 标签内的代码是否缩进
  vueIndentScriptAndStyle: false,

  // ==================== 其他配置 ====================
  // 是否格式化嵌入的代码块（如 Markdown 中的代码块）
  embeddedLanguageFormatting: 'auto',

  // 在 HTML、Vue 和 JSX 中强制每行单个属性
  singleAttributePerLine: false,

  // ==================== 文件覆盖配置 ====================
  overrides: [
    {
      // Markdown 文件配置
      files: '*.md',
      options: {
        // Markdown 文件保留原始换行
        proseWrap: 'preserve',
      },
    },
    {
      // JSON 文件配置
      files: '*.json',
      options: {
        // JSON 文件使用双引号
        singleQuote: false,
      },
    },
    {
      // YAML 文件配置
      files: ['*.yml', '*.yaml'],
      options: {
        // YAML 文件使用单引号
        singleQuote: true,
      },
    },
  ],
}
