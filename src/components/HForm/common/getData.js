/**
 * 获取表单元素的 data 属性
 */
import __chineseCities from './__chineseCities.js';

export default function getData({ type, ext = {} }) {
  const { data, city } = ext;

  let new_data = data || [];
  switch (type) {
    case 'cascader':
    case 'treeSelect':
      if (city && __chineseCities[city]) {
        new_data = [...__chineseCities[city]];
      }
      break;
    default:
  }
  return new_data;
}