/**
 * 图片展示
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Row, Col, Tooltip, Modal } from 'antd';

import HPictureView from '../../HPictureView/HPictureView.jsx';

export default class MyImageView extends Component {

  static defaultProps = {
    value: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      picSrc: '',
      visible: false,
      index: null,
    }
  }

  handleClick = (val, index) => {
    const { path = '' } = val;
    this.setState({
      visible: true,
      picSrc: path,
      index,
    })
  }

  onCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    const { picSrc, visible } = this.state;
    const { value, api = {} } = this.props;
    const {
      toolTipApi= {},
      rowApi = {},
      colApi = {},
      hPictureViewApi = {},
      modalApi = {},
      boxStyle = {},
    } = api;

    const imageEle = value.map((val, i) => {
      const { path = '' } = val;
      const key = `image-view-${i}`;
      const ColProps = {
        ...colApi,
        key,
        className: 'my-image-view-item',
      };
      const new_box_style = {
        ...boxStyle,
        backgroundImage: `url(${path})`,
      };
      return (
        <Col {...ColProps}>
          <Tooltip {...toolTipApi} title="点击显示详图">
            <div
              className="my-image-view-item-box"
              style={new_box_style}
              onClick={() => this.handleClick(val, i)}
            />
          </Tooltip>
        </Col>
      );
    })

    return (
      <Row gutter={8} {...rowApi} type="flex">
        {imageEle}
        <Modal
          title="详图"
          {...modalApi}
          footer={false}
          visible={visible}
          onCancel={this.onCancel}
        >
          <HPictureView
            picBtns
            {...hPictureViewApi}
            picSrc={picSrc}
          />
        </Modal>
      </Row>
    )
  }

}

MyImageView.propTypes = {
  value: propTypes.arrayOf(propTypes.object),
}
