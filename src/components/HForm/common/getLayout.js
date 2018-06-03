import is from 'is_js';

import __formLayouts from './__formLayouts.js';

/**
 * 获取 FormItem 表单元素的删格布局
 * @param  {string} formLayout    表单布局类型
 * @param  {number} cols          表单几列布局，默认为1 (一行放几个表单元素的问题)
 * @param  {number} colspan       某个表单元素横跨几列，默认为1 (一个表单元素横跨几列的问题)
 * @return {object}               表单元素栅格化布局属性
 */
export function getFormItemLayout(formLayout = '', cols = 1, colspan = 1) {
  if (formLayout !== 'horizontal') {
    // 只有当表单布局为 horizontal 时，
    // 表单元素才采用栅格布局
    return null;
  }

  // 一个表单元素最多横跨列数，最多和表单组列数相同
  colspan = Math.min(cols, colspan);

  if (cols === 4) {
    return [
      {
        labelCol:   { xs: 24, sm: 6,  md: 6,  lg: 6,  xl: 12 },
        wrapperCol: { xs: 24, sm: 18, md: 18, lg: 18, xl: 12 },
      },
      {
        labelCol:   { xs: 24, sm: 6,  md: 3,  lg: 3,  xl: 6   },
        wrapperCol: { xs: 24, sm: 18, md: 21, lg: 21, xl: 18  },
      },
      {
        labelCol:   { xs: 24, sm: 6,  md: 3,  lg: 2,  xl: 4   },
        wrapperCol: { xs: 24, sm: 18, md: 21, lg: 22, xl: 20  },
      },
      {
        labelCol:   { xs: 24, sm: 6,  md: 3,  lg: 2,  xl: 3   },
        wrapperCol: { xs: 24, sm: 18, md: 21, lg: 22, xl: 21 },
      },
    ][colspan - 1];
  } else if (cols === 3 || cols === 2) {
    return [
      {
        labelCol:   { xs: 24, sm: 6,  md: 6,  lg: 6,  xl: 6   },
        wrapperCol: { xs: 24, sm: 18, md: 18, lg: 18, xl: 18  },
      },
      {
        labelCol:   { xs: 24, sm: 3,  md: 3,  lg: 3,  xl: 3   },
        wrapperCol: { xs: 24, sm: 18, md: 21, lg: 21, xl: 21  },
      },
      {
        labelCol:   { xs: 24, sm: 6,  md: 3,  lg: 3,  xl: 2   },
        wrapperCol: { xs: 24, sm: 18, md: 21, lg: 21, xl: 22  },
      },
    ][colspan - 1];
  } else {
    return {
      labelCol:   { xs: 24, sm: 6   },
      wrapperCol: { xs: 24, sm: 16  }
    }
  }
}

/**
 * 某些表单元素不设置 label
 * 则该表单元素布局还需要一个 offset 属性
 * 常见如按钮
 */
export function getFormItemOffset(formItemLayout = {}, offset = false) {
  // 如果不需要设置 offset 属性，则直接返回表单元素布局
  if (!offset) return formItemLayout;

  // 给表单元素布局对象 formItemLayout 的 wrapperCol 值添加 offset 属性
  const new_formItemLayout = {};
  Object.keys(formItemLayout).forEach(val => {
    const { labelCol = {}, wrapperCol = {} } = formItemLayout;
    if (val === 'labelCol') {
      new_formItemLayout.wrapperCol = setWrapperOffset(labelCol, wrapperCol);
    }
  })
  return new_formItemLayout;
}

// 给一个布局对象的 wrapperCol 属性添加 offset 属性
function setWrapperOffset(labelCol = {}, wrapperCol = {}) {
  const new_wrapperCol = {};
  Object.keys(labelCol).forEach(id => {
    const x = labelCol[id];
    const y = wrapperCol[id] || 0;
    if (x > 0 && x < 24) {
      new_wrapperCol[id] = { span: y || x, offset: x };
    } else {
      new_wrapperCol[id] = x;
    }
  })
  return new_wrapperCol;
}

/**
 * 获取 Form 表单栅格布局
 * @param  {number} cols        表单布局列数
 * @param  {number} colspan     一个表单元素占几列
 * @return {object}             表格栅格布局属性
 */
export function getGridLayout(cols = 1, colspan = 1) {

  // 一个表单元素最多横跨列数，最多和表单组列数相同
  colspan = Math.min(cols, colspan);

  switch (cols) {
    case 4:
      return [
        { xs: 24, sm: 24, md: 12, lg: 8,  xl: 6  },
        { xs: 24, sm: 24, md: 24, lg: 16, xl: 12 },
        { xs: 24, sm: 24, md: 24, lg: 24, xl: 18 },
        { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      ][colspan - 1];
    case 3:
      return [
        { xs: 24, sm: 24, md: 12, lg: 12, xl: 8  },
        { xs: 24, sm: 24, md: 24, lg: 24, xl: 16 },
        { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      ][colspan - 1];
    case 2:
      return [
        { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
        { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      ][colspan - 1];
    default:
      return { span: 24 };
  }
}

/**
 * 获取表单布局类型
 * 默认为表单布局类型的第一种
 * @return {string} 表单布局类型
 */
export function getFormLayout(formLayout) {
  if (is.inArray(formLayout, __formLayouts)) {
    return formLayout;
  }
  return __formLayouts[0];
}
