/**
 * 获取表单元素的 placeholder 属性
 * placeholder  config 配置的 placeholder 属性
 * label        表单元素 label 属性
 * id           表单元素 id
 * type         表单元素输入类型
 */
import is from 'is_js';

export default function getPlaceholder({ type, placeholder, label, id }) {

  if (placeholder === false) {
    // 手动设置 placeholder 为 false
    // 则不显示 placeholder
    return undefined;
  }

  if (!placeholder && !label && !id) {
    // 如果 placeholder、label、id 都没有设置
    // 也不显示 placeholder
    return '';
  }

  let new_placeholder = '';

  const inputType = ['input', 'textarea', 'search', 'number', 'fetchInput'];
  const selectType = ['select', 'treeSelect', 'cascader', 'date', 'month', 'time'];

  // 预定义 placeholder 属性
  let pre_placeholder = '';
  if (is.inArray(type, inputType)) {
    pre_placeholder = placeholder || `请输入${label || id}`;
  } else if (is.inArray(type, selectType)) {
    pre_placeholder = placeholder || `请选择${label || id}`;
  } else if (type === 'range') {

  }

  if (type === 'range') {
    // 区间时间的 placeholder 属性是个数组
    // 单独处理 range 类型
    new_placeholder = placeholder || [`开始${label || id}`, `开始${label || id}`];
  } else {
    // 否则不处理
    // 直接采用预定义 placeholder
    new_placeholder = pre_placeholder;
  }

  return new_placeholder;
}