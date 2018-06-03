/**
 * 检查配置数组中的配置类型是否都是 text 类型
 */
import is from 'is_js';

export default function checkTypes(configs = []) {
  const notAllText = configs.some(val => {
    const { config } = val;
    if (is.array(config)) {
      return config.some(v => v.type !== 'text' && v.type !== 'imageView');
    } else {
      return config.type !== 'text' && config.type !== 'imageView';
    }
  })
  return !notAllText;
}