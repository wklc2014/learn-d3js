/**
 * FormItem 支持的各种表单元素输入类型
 * type      表单元素组件-类型
 * params    表单元素组件-参数
 * ext       表单元素组件-扩展配置
 * onChange  表单元素组件-change事件
 * value     表单元素组件-值
 */
import React from 'react';
import is from 'is_js';
import { Input, Button, Cascader, TreeSelect, Checkbox, DatePicker, InputNumber, Radio, Rate, Select, Slider, Switch, TimePicker } from 'antd';

// import MyFetchInput from './MyFetchInput.jsx';
import MyImageView from './MyImageView.jsx';

const { TextArea, Search } = Input;
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

export default function renderFormItemByType(props) {

  const { type, api, ext, value, onChange } = props;

  // 表单元素组件-参数
  const new_api = {...api, value};

  /**
   * antd 表单元素类型不同，
   * onChange 事件回调参数也不一样
   * 需要分类处理
   */
  // 对表单元素类型分组
  const inputType = ['input', 'textarea', 'search', 'radio', 'radioButton']; // 5
  const baseTypes = ['rate', 'slider', 'switch', 'number', 'checkbox', 'select', 'treeSelect', 'cascader', 'date', 'range', 'month', 'time']; // 12
  if (is.inArray(type, inputType)) {
    Object.assign(new_api, {
      onChange: (e) => onChange(e.target.value),
    });
  } else if (is.inArray(type, baseTypes)) {
    Object.assign(new_api, { onChange, value });
  }

  /**
   * 不同的表单类型
   * 渲染不同的内容
   */
  if (type === 'input') {
    // 单行文本输入框
    return <Input {...new_api} />;
  }

  else if (type === 'textarea') {
    // 多行文本输入框
    return <TextArea rows={5} {...new_api} />;
  }

  else if (type === 'search') {
    // 带搜索按钮的单行文本输入框
    return <Search {...new_api} />;
  }

  else if (type === 'rate') {
    // 星星评分
    return <Rate {...new_api} />;
  }

  else if (type === 'slider') {
    // 滑动输入条
    return <Slider {...new_api} />;
  }

  else if (type === 'switch') {
    // 切换开关
    return <Switch {...new_api} />;
  }

  else if (type === 'number') {
    // 数字输入框
    return <InputNumber {...new_api} />;
  }

  else if (type === 'checkbox') {
    // 多选框
    return <div className="my-hform-checkbox-group"><CheckboxGroup {...new_api} /></div>;
  }

  else if (type === 'select') {
    // 下拉选择框
    if (is.array(ext.data)) {
      const Children = ext.data.map((v, i) => <Option key={i} value={v.value}>{v.label}</Option>);
      return <Select {...new_api}>{Children}</Select>;
    }
  }

  else if (type === 'date') {
    // 日期选择框
    return <DatePicker {...new_api} />;
  }

  else if (type === 'range') {
    // 日期区间选择框
    return <RangePicker {...new_api} />;
  }

  else if (type === 'month') {
    // 月份选择框
    return <MonthPicker {...new_api} />;
  }

  else if (type === 'time') {
    // 时间选择框
    return <TimePicker {...new_api} />;
  }

  else if (type === 'radio') {
    // 单选框
    if (is.array(ext.data)) {
      const Children = ext.data.map((v, i) => <Radio key={i} value={v.value}>{v.label}</Radio>);
      return <RadioGroup {...new_api}>{Children}</RadioGroup>;
    }
  }

  else if (type === 'radioButton') {
    // 单选按钮
    if (is.array(ext.data)) {
      const Children = ext.data.map((v, i) => <RadioButton key={i} value={v.value}>{v.label}</RadioButton>);
      return <RadioGroup {...new_api}>{Children}</RadioGroup>;
    }
  }

  else if (type === 'text') {
    // 纯文本显示
    let text_value = value;
    if (is.function(ext.render)) {
      // 优先处理 render 函数
      text_value = ext.render(value);
    } else if (is.array(ext.data)) {
      // 然后处理 value 在 ext.data 中的映射
      if (is.array(value)) {
        // 多指映射
      } else {
        // 单值映射
        const fint_value = ext.data.find(v => v.value === value);
        if (fint_value) text_value = fint_value.label;
      }
    }
    // 新增一个[my-form-text]类，对 antd 样式做调整
    return <span className="ant-form-text my-hform-text">{text_value}</span>;
  }

  else if (type === 'treeSelect') {
    // 树形选择控件
    // 设置一个默认高度
    // 以及默认[treeData]参数从[ext.data]取
    return <TreeSelect dropdownStyle={{ maxHeight: 300 }} treeData={ext.data} {...new_api} />;
  }

  else if (type === 'button') {
    // 按钮
    if (is.array(ext.data) && ext.data.length) {
      // 可以一次生成多个按钮
      return ext.data.map((btn, i) => {
        const btnStyle = i === ext.data - 1 ? null : { marginRight: 8 };
        const btn_api = Object.assign({}, new_api, { onClick: (e) => onChange(btn.value) });
        const btn_type = btn.type || new_api.type;
        return (
          <span style={btnStyle} key={i}>
            <Button {...btn_api} type={btn_type}>{btn.label}</Button>
          </span>
        );
      });
    }
    const btn_api = Object.assign({}, new_api, { onClick: (e) => onChange(ext.value) });
    const btn_type = ext.type || btn_api.type;
    return <Button {...btn_api} type={btn_type}>{ext.label}</Button>;
  }

  else if (type === 'cascader') {
    // 级联选择
    const cascader_api = Object.assign({ options: ext.data }, new_api);
    return <Cascader {...cascader_api} />;
  }

  /**
   * 自定义输入类型
   * 参数完整下传
   * 在自定义组件内部自行处理
   */

  else if (type === 'fetchInput') {
    // return <MyFetchInput {...props} />;
  }

  else if (type === 'imageView') {
    return <MyImageView {...props} />;
  }

  else {
    // 无法处理的表单元素类型
    console.error(`没有与之相对应表单元素类型${type}`);
    return null;
  }
}
