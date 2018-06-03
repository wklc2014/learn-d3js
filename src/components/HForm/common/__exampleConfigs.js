/**
 * Form 配置示例
 */

[
  {
    // 表单元素 label
    label: '用户姓名',

    // 表单元素配置 - 数组
    config: [
      {
        // 表单元素 id
        id: 'first_name',

        // 表单元素 - 类型
        type: 'input',

        // 表单元素 - api
        api: {

        },

        // 表单元素 - 扩展配置
        ext: {
          // 表单元素输入 - 在删格布局中所占比例 - 默认 24
          span: 24,

          // 表单元素输入时, 设置大写
          toUpperCase: true,

          // 表单元素输入时, 设置小写
          toLowerCase: true,

          // 表单元素验证规则
          rules: [],

          /**
           * 一些额外数据字段
           * 如单选框，多选框，文本显示的映射
           * @type {Array}
           */
          data: [
            { value: '01', label: '男' },
            { value: '02', label: '女' },
          ],

          // 表单元素是否隐藏
          hide: false,

          /**
           * type = text 时，表单元素显示方式
           * @param  {any} value 任何表单值
           * @return {any}       表单显示
           */
          render: (value) => {},
        },
      },
      {
        id: 'last_name',
        type: 'input',
        api: {

        },
        ext: {

        }
      },
    ],

    // 表单元素扩展配置
    extMap: {
      // 单个表单元素布局
      layout: 'L0',

      // 两个表单元素间隔
      space: 16,

      // 单个表单元素横跨列数
      colspan: 1,

      /**
       * 表单元素是否 offset
       * 表单元素类型没有 label 时,
       * @type {Boolean}
       */
      offset: true,

      // 表单元素是否隐藏
      hide: false,

      // 额外的提示信息
      extra: '',

      // 配合 label 属性使用，表示是否显示 label 后面的冒号
      colon: false,
    }
  }
]