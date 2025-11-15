module.exports = {
  plugins: {
    // UnoCSS PostCSS 插件
    '@unocss/postcss': {},

    // Autoprefixer - 自动添加浏览器前缀
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions',
      ],
      grid: true,
    },
  },
}
