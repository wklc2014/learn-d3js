/**
 * 带搜索的输入框
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Select } from 'antd';

import * as fetchServices from '../../../services/_fetch.js';

const { Option } = Select;
let timeout;

export default class MyFetchInput extends Component {

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  getOptions = () => {
    return this.state.data.map(v => <Option key={v.value}>{v.label}</Option>);
  }

  handleChange = (value) => {
    const that = this;
    const { ext = {}, onChange } = this.props;
    const { service, time = 300 } = ext;
    onChange && onChange(value);

    if (timeout) {
      window.clearTimeout(timeout);
      timeout = null;
    }

    async function search() {
      try {
        const resp = await fetchServices[service](value);
        const data = resp.success ? resp.data : [];
        that.setState({ data: data || [] })
      } catch (e) {
        console.log(`_fetch.js 没有对应 ${service} 的请求`);
      }
    }

    timeout = setTimeout(search, time);

  }

  render() {
    const { api, value } = this.props;
    const options = this.getOptions();
    const new_props = {
      defaultActiveFirstOption: false,
      showArrow: false,
      filterOption: false,
      mode: 'combobox',
      value,
      ...api,
      onSearch: this.handleChange,
    }
    return <Select {...new_props}>{options}</Select>;
  }
}

MyFetchInput.propTypes = {
  ext: propTypes.object.isRequired,
}