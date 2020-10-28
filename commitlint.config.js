module.exports = {
  // 继承默认配置
  extends: [
    '@commitlint/config-angular',
  ],
  // 自定义规则
  rules: {
    'type-enum': [2, 'always', [
      'build',
      'ci',
      'merge',
      'feat',
      'fix',
      'perf',
      'refactor',
      'docs',
      'style',
      'revert',
      'chore',
    ]],
    'header-max-length': [2, 'always', 72],
  },
};
