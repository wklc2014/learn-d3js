/**
 * 通过一个配置数组
 * 生成一组表单元素
 */
import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
// import is from 'is_js';
import { Form, Row, Col } from 'antd';

import HFormItem from './HFormItem.jsx';

import { getFormLayout, getFormItemLayout, getGridLayout } from './common/getLayout.js';
import checkTypes from './common/checkTypes.js';

import './styles.less';

export default function HForm(props) {

  const {
    /**
     * 表单布局列数
     * 表单组一行显示表单元素的个数
     * @type {Number}
     */
    cols = 1,

    /**
     * 表单配置数组
     * @type {Array}
     */
    configs = [],

    /**
     * 表单布局类型
     * antd 提供的表单布局只有 horizontal vertical inline 三种
     * @type {String}
     */
    layout = 'horizontal',

    /**
     * 表单元素布局
     * antd 提供的栅格布局
     * @type {String or object}
     */
    itemLayout = '',

    /**
     * 表单元素间隔距离
     * @type {Number}
     */
    itemSpace = 0,

    /**
     * 可控表单搜集表单值的 onChange 事件
     * @type {func}
     */
    onChange = () => {},

    /**
     * 表单值
     * @type {Object}
     */
    values = {},
  } = props;

  const ChildrenEle = configs.map((val, i) => {
    const key = `${layout}-${i}`;
    const { label, config, extMap = {} } = val;
    const { colspan } = extMap;

    /**
     * FormItem 栅格布局优先通过 Form 组件直接传入
     * 没有传入的情况下再通过方法计算
     */
    const item_layout = itemLayout || getFormItemLayout(layout, cols, colspan);
    const HFormItemProps = {
      label,
      config,
      extMap: {
        layout: item_layout,
        space: itemSpace,
        ...extMap,
      },
      onChange,
      values,
    };

    if (layout === 'inline') {
      return (
        <div key={key} style={{ display: 'inline-block' }}>
          <HFormItem {...HFormItemProps} />
        </div>
      )
    }

    const ColProps = getGridLayout(cols, colspan);
    return (
      <Col key={key} {...ColProps}>
        <HFormItem {...HFormItemProps} />
      </Col>
    );
  });

  const formLayout = getFormLayout(layout);

  const cls = classnames({
    'my-hform-all-text': checkTypes(configs),
  });

  return (
    <section className={cls}>
      <Form layout={formLayout}>
        <Row type="flex">{ChildrenEle}</Row>
      </Form>
    </section>
  );
}

HForm.propTypes = {
  configs: propTypes.array.isRequired,
  cols: propTypes.number,
  layout: propTypes.string,
  itemLayout: propTypes.oneOfType([
    propTypes.object,
    propTypes.string,
  ]),
  itemSpace: propTypes.number,
  onChange: propTypes.func,
  values: propTypes.object,
};
