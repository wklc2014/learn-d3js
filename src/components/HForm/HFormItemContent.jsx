/**
 * 渲染 FormItem 输入 content
 */
import { Component } from 'react';
import propTypes from 'prop-types';

import renderByType from './Items/renderByType.js';
import getPlaceholder from './common/getPlaceholder.js';
import getStyle from './common/getStyle.js';
import getData from './common/getData.js';
import getValue from './common/getValue.js';

export default class HFormItemContent extends Component {

  static defaultProps = {
    /**
     * 表单元素 label 属性
     * 标识表单元素的名称
     * @type {String}
     */
    label: '',

    /**
     * 表单输入内容 api
     * antd 和 html
     * @type {object}
     */
    api: {},

    /**
     * 表单输入内容扩展配置
     * @type {Object}
     */
    ext: {},

    /**
     * 可控表单搜集表单值的 onChange 事件
     * @return {func}
     */
    onChange: () => {},
  }

  shouldComponentUpdate(nextProps) {
    const next = JSON.stringify(nextProps);
    const prev = JSON.stringify(this.props);
    return next !== prev;
  }

  onChange = (e) => {
    const { id, ext, onChange } = this.props;
    const value = getValue({ value: e, ext });
    onChange && onChange({ id, value });
  }

  render() {
    const { id, type, label, api, ext, value } = this.props;
    const { placeholder } = api;

    // 计算一些必要的属性
    const new_value = getValue({ value, ext });
    const new_placeholder = getPlaceholder({ type, placeholder, label, id });
    const new_style = getStyle({ type, ext, style: api.style });
    const new_data = getData({ type, ext });

    return renderByType({
      type,
      api: { ...api, placeholder: new_placeholder, style: new_style },
      ext: { ...ext, data: new_data },
      value: new_value,
      onChange: this.onChange,
    });
  }
}

HFormItemContent.propTypes = {
  label: propTypes.string,
  id: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  api: propTypes.object,
  ext: propTypes.object,
  onChange: propTypes.func,
  // 不对 value 值做类型控制
  // value: propTypes,
}
