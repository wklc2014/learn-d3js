/**
 * 表单元素值相关操作
 */
import is from 'is_js';

export default function getValue ({ value, ext = {} }) {
  let new_value = value;

  const { toUpperCase, toLowerCase } = ext;

  // 大小写转换
  if (toUpperCase && is.string(value)) {
    // new_value = value.toUpperCase();
  } else if (toLowerCase && is.string(value)) {
    // new_value = value.toLowerCase();
  }

  return new_value;

}
