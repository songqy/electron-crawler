module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
  ],
  globals: {
    $: true,
    process: true,
    __dirname: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
    ecmaVersion: 7,
  },
  plugins: [
  ],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        '@typescript-eslint/no-floating-promises': 0,
      },
    },
  ],
  rules: {
    'quotes': [2, 'single'], //单引号
    'no-console': 0, //不禁用console
    'no-debugger': 2, //禁用debugger
    'no-var': 0, //对var警告
    'semi': 2, //强制使用分号
    'no-irregular-whitespace': 0, //不规则的空白不允许
    'no-trailing-spaces': 1, //一行结束后面有空格就发出警告
    'eol-last': 2, //文件以单一的换行符结束
    'no-unused-vars': [2, { 'vars': 'all', 'args': 'after-used' }], //不能有声明后未被使用的变量或参数
    'no-underscore-dangle': 0, //标识符不能以_开头或结尾
    'no-alert': 2, //禁止使用alert confirm prompt
    'no-lone-blocks': 0, //禁止不必要的嵌套块
    'no-class-assign': 2, //禁止给类赋值
    'no-cond-assign': 2, //禁止在条件表达式中使用赋值语句
    'no-const-assign': 2, //禁止修改const声明的变量
    'no-delete-var': 2, //不能对var声明的变量使用delete操作符
    'no-dupe-keys': 2, //在创建对象字面量时不允许键重复
    'no-duplicate-case': 2, //switch中的case标签不能重复
    'no-dupe-args': 2, //函数参数不能重复
    'no-empty': 2, //块语句中的内容不能为空
    'no-func-assign': 2, //禁止重复的函数声明
    'no-invalid-this': 0, //禁止无效的this，只能用在构造器，类，对象字面量
    'no-redeclare': 2, //禁止重复声明变量
    'no-spaced-func': 2, //函数调用时 函数名与()之间不能有空格
    'no-this-before-super': 0, //在调用super()之前不能使用this或super
    'no-undef': 2, //不能有未定义的变量
    'no-use-before-define': 2, //未定义前不能使用
    'camelcase': 2, //强制驼峰法命名
    'jsx-quotes': [2, 'prefer-double'], //强制在JSX属性（jsx-quotes）中一致使用双引号
    'no-extra-boolean-cast': 0, //禁止不必要的bool转换
    'no-unreachable': 1, //不能有无法执行的代码
    'comma-dangle': ['error', 'always-multiline'], //对象字面量项尾多行需要加逗号单行不要加逗号
    'prefer-arrow-callback': 0, //比较喜欢箭头回调
    'arrow-parens': 0, //箭头函数用小括号括起来
    'arrow-spacing': 2, //=>的前/后括号
    'semi-spacing': 2, //防止在表达式中的分号之前使用空格
    'brace-style': 0, //大括号风格要求
    'indent': ['error', 2, { 'SwitchCase': 1 }], // 强制2个空格的缩进
    'switch-colon-spacing': ['error', { 'after': true, 'before': false }], // 强制在 switch 的冒号有空格
    'space-before-blocks': 2, //强制在块之前使用一致的空格
    'space-in-parens': 2, // 圆括号内的空格
    'comma-spacing': 2, //强制在逗号周围使用空格
    'key-spacing': 2, // 在对象字面量的键和值之间使用一致的空格
    'keyword-spacing': 2, // 关键字周围空格的一致性
    'lines-between-class-members': 2, // 禁止在类成员之间出现空行
    'space-infix-ops': 2, // 要求操作符周围有空格
    'eqeqeq': 2, // 要求使用 === 和 !==
    'rest-spread-spacing': 2, // 禁止剩余和扩展运算符及其表达式之间有空格
    'prefer-const': 2, // 要求使用 const 声明那些声明后不再被修改的变量
    'object-curly-spacing': ['error', 'always'], //强制在花括号中使用一致的空格
    'block-spacing': ['error', 'never'], // 强制在代码块中开括号前和闭括号后有空格
  },
  settings: {
    'import/ignore': [
      'node_modules',
    ],
  },
}
;
