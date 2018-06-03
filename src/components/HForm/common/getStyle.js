/**
 * 获取表单元素 style 属性
 * type   表单元素输入类型
 * ext    表单元素扩展配置
 * style  表单元素 config 配置的 style
 */
import is from 'is_js';

export default function getStyle({ type, ext = {}, style = {} }) {
  const { toUpperCase, toLowerCase } = ext;
  const new_style = {};

  // css 大小写处理
  if (toUpperCase) {
    Object.assign(new_style, { textTransform: 'uppercase' });
  } else if (toLowerCase) {
    Object.assign(new_style, { textTransform: 'lowercase' });
  }

  // 部分表单元素类型默认设置 width: 100%
  switch (type) {
    case 'cascader':
    case 'date':
    case 'range':
    case 'month':
    case 'time':
    case 'number':
    case 'select':
    case 'editor':
    case 'treeSelect':
      Object.assign(new_style, { width: '100%' });
      break;
    default:
  }

  // 最后合并表单元素配置的属性
  Object.assign(new_style, style);

  // 空样式不返回
  if (is.empty(new_style)) {
    return null;
  }

  return new_style;
}