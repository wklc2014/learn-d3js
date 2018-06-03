/**
 * 根据一个配置对象
 * 渲染一个 Antd 的 FormItem 元素
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import is from 'is_js';
import { Form, Row, Col } from 'antd';

import HFormItemContent from './HFormItemContent.jsx';

import { getFormItemOffset } from './common/getLayout.js';
import { getFormItemValidate } from './common/getValidate.js';
import * as __formItemLayouts from './common/__formItemLayouts.js';

const FormItem = Form.Item;

export default class HFormItem extends Component {

  static defaultProps = {
    /**
     * 表单元素 label 属性
     * 标识表单元素的名称
     * @type {String}
     */
    label: '',

    /**
     * 表单元素扩展配置
     * @type {Object}
     */
    extMap: {},

    /**
     * 可控表单搜集表单值的 onChange 事件
     * @return {func}
     */
    onChange: () => {},

    /**
     * 表单值
     * @type {Object}
     */
    values: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      /**
       * 元素元素是否首次进行验证
       * @type {Boolean}
       */
      touched: false,
    }
  }


  /**
   * 表单元素的 onChange 事件
   * @param  {string} options.id    表单元素输入 ID
   * @param  {any} options.value    表单元素输入值
   */
  onChange = ({ id, value }) => {
    const { onChange } = this.props;
    const { touched } = this.state;
    if (!touched) {
      this.setState({ touched: true  });
    }
    onChange && onChange({ id, value });
  }

  /**
   * 获取 FormItem 的栅格布局
   * 如果是对象，则直接作为栅格布局对象
   * 如果是字符串，则在栅格布局库中查找
   * 查找不到对应的栅格布局，则采用默认的 L0.
   * @return {Object} FormItem 栅格布局对象
   */
  getFormItemLayout = () => {
    const { extMap = {} } = this.props;
    const { layout, offset } = extMap;
    if (is.object(layout)) {
      return getFormItemOffset(layout, offset);
    } else if (is.string(layout)) {
      const new_layout = __formItemLayouts[layout] || __formItemLayouts.L0;
      return getFormItemOffset(new_layout, offset);
    }
  }

  render() {
    const { touched } = this.state;
    const { label, config, extMap = {}, values, children } = this.props;

    // 表单元素的扩展字段配置隐藏属性
    if (extMap.hide) return null;

    // 表单元素删格布局
    const formItemlayout = this.getFormItemLayout();

    // 如果 config 是对象, 则转换成数组, 统一处理
    const new_config = is.array(config) ? config : [config];

    const ChildrenEle = new_config
      // 过滤表单输入元素的隐藏字段
      .filter(val => {
        const { ext = {} } = val;
        return !ext.hide;
      })
      .map((val, i) => {
        const key = `formItem-${i}`;
        const { ext = {} } = val;
        const { span = 24, pright, center } = ext;
        const ColProps = { key, span, style: {} };

        // 计算 Col 右边内间距
        if (pright) {
          ColProps.style.paddingRight = pright;
        } else if (i < config.length - 1) {
          ColProps.style.paddingRight = 8;
        }

        if (center) {
          ColProps.style.textAlign = 'center';
        }

        const HFormItemContentProps = {
          ...val,
          label,
          onChange: this.onChange,
          value: values[val.id],
        }

        return (
          <Col {...ColProps}>
            <HFormItemContent {...HFormItemContentProps} />
          </Col>
        );
      });

    // 表单元素的验证
    const formItemValidate = getFormItemValidate({ values, config: new_config, touched });

    // 表单元素的扩展字段
    const { space, extra, colon } = extMap;

    const FormItemProps = {
      label,
      extra,
      colon,
      ...formItemlayout,
      ...formItemValidate,
    }
    return (
      <FormItem {...FormItemProps}>
        { children ? children : <Row type="flex" style={{ paddingRight: space }}>{ChildrenEle}</Row> }
      </FormItem>
    )
  }
}

HFormItem.propTypes = {
  label: propTypes.string,
  config: propTypes.oneOfType([
    propTypes.object,
    propTypes.array,
  ]),
  extMap: propTypes.object,
  onChange: propTypes.func,
  values: propTypes.object,
};
