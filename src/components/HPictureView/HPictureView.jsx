/**
 * 单张图片显示效果
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import is from 'is_js';

import ViewArea from './ViewArea.jsx';
import OperateBtns from './OperateBtns.jsx';

import asyncLoadImage from './common/asyncLoadImage.js';
import __operateBtns from './common/__operateBtns.js';
import * as CLASS_NAMES from './common/__classNames.js';

import './styles.less';

export default class HPictureView extends Component {

  static defaultProps = {
    wraperStyle: {},
    viewHeight: 400,
    picSrc: '',
    picWidth: 0,
    picRotate: 0,
    picPositionX: 0,
    picPositionY: 0,
    picZoomRate: 3,
    picRotateRate: 3,
    picBtns: false,
  }

  constructor(props) {
    super(props);
    const {
      picWidth = 0,
      picRotate = 0,
      picPositionX = 0,
      picPositionY = 0,
    } = props;
    this.state = {
      /**
       * 图片原始宽度
       * @type {Number}
       */
      picOriginWidth: 0,

      /**
       * 图片原始高度
       * @type {Number}
       */
      picOriginHeight: 0,

      /**
       * 图片最佳显示宽度
       * @type {Number}
       */
      picBestWidth: 0,

      /**
       * 图片显示宽度
       * @type {Number}
       */
      picWidth,

      /**
       * 图片显示旋转角度
       * @type {Number}
       */
      picRotate,

      /**
       * 图片显示 x 坐标
       * @type {Number}
       */
      picPositionX,

      /**
       * 图片显示 y 坐标
       * @type {Number}
       */
      picPositionY,

      /**
       * 图片加载错误信息
       * @type {String}
       */
      picErrors: '',
    }
  }

  componentDidMount() {
    const { picSrc } = this.props;
    const params = this.getRenderState({}, this.props);
    const isInit = !params.picWidth;
    this.planRender(picSrc, params, isInit);
    window.addEventListener('resize', this.planWindowResize);
  }

  componentWillReceiveProps(nextProps) {
    const { picSrc: prevSrc } = this.props;
    const { picSrc: nextSrc } = nextProps;
    const params = this.getRenderState(this.props, nextProps);
    if (nextSrc && nextSrc !== prevSrc) {
      // 图片地址改变后，重新 planRender
      this.planRender(nextSrc, params);
    } else {
      // 仅仅是其他 props 改变
      this.setState(params);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.planWindowResize);
  }

  /**
   * 计算 props 改变时，引起的 state 改变
   * @param  {Object} prev [当前 props]
   * @param  {Object} next [新的 props]
   * @return {object}      [改变的 state]
   */
  getRenderState = (prev = {}, next = {}) => {
    const params = {};
    ['Width', 'Rotate', 'PositionX', 'PositionY'].forEach(key => {
      if (next[`pic${key}`] && prev[`pic${key}`] !== next[`pic${key}`]) {
        params[`pic${key}`] = next[`pic${key}`];
      }
    })
    return params;
  }

  /**
   * 计算图片最佳显示
   * @param  {object} image [图片]
   * @return {object}       [图片最佳显示的宽度和高度]
   */
  getPictureBestView = (originWidth, originHeight) => {
    const view_dom = this.inst;
    if (!view_dom) {
      return { width: originWidth, height: originHeight }
    }
    const view_width = view_dom.clientWidth;
    const view_height = view_dom.clientHeight;
    let image_width = originWidth;
    let image_height = originHeight;
    if (originWidth > view_width || originHeight > view_height) {
      const rate = originWidth / originHeight;
      image_width = view_width;
      image_height = view_width / rate;
      if (image_height > view_height) {
        image_height = view_height;
        image_width = view_height * rate;
      }
    }
    return { width: image_width, height: image_height }
  }

  /**
   * 窗口变化重置 picBestWidth
   */
  planWindowResize = () => {
    const { picOriginWidth, picOriginHeight } = this.state;
    if (picOriginWidth && picOriginHeight) {
      const bestSize = this.getPictureBestView(picOriginWidth, picOriginHeight);
      this.setState({
        picBestWidth: bestSize.width,
      });
    }
  }

  /**
   * 渲染新的图片
   * @param  {string}  src    [图片地址]
   * @param  {Object}  params [state 改变]
   * @param  {Boolean} isInit [是否是初始化渲染]
   * @return {promise}        [图片渲染结果]
   */
  planRender = (src, params = {}, isInit = false) => {
    asyncLoadImage(src).then((image) => {
      const originWidth = image.width;
      const originHeight = image.height;
      const bestSize = this.getPictureBestView(originWidth, originHeight);
      const new_state = {
        picOriginWidth: originWidth,
        picOriginHeight: originHeight,
        picBestWidth: bestSize.width,
        ...params,
        picErrors: '',
      };
      if (isInit) {
        new_state.picWidth = bestSize.width;
      }
      this.setState(new_state);
    }).catch((e) => {
      let picErrors = '图片加载错误！';
      try {
        picErrors = e.toString();
      } catch (e) {}
      this.setState({ picErrors, ...params });
    });
  }

  /**
   * 鼠标缩放
   * @param  {event} event [鼠标事件]
   */
  onMouseWheel = (event) => {
    event.preventDefault();
    const { picZoomRate, picRotateRate } = this.props;
    const { picRotate } = this.state;
    const { shiftKey } = event;
    const picZoom = this.getPicZoom();
    const type = shiftKey ? 'rotate' : 'zoom';
    const value = shiftKey
      ? picRotate + (picRotateRate * (event.deltaX > 0 ? -1 : 1))
      : picZoom + (picZoomRate * (event.deltaY > 0 ? -1 : 1));
    this.operating(type, value);
  }

  /**
   * 双击还原显示图片
   */
  onDoubleClick = () => {
    this.operating('reset');
  }

  //
  // zoom, rotate, prev, next, reset
  /**
   * 图片执行各种变化
   * @param  {string} type [图片变化类型]
   * @param  {number} num  [zoom, rotate 变化值]
   */
  operating = (type, num) => {
    const { picOriginWidth, picBestWidth } = this.state;
    switch (type) {
      case 'zoom':
        this.setState({
          picWidth: lodash.round(picOriginWidth * num * 0.01)
        });
        break;
      case 'reset':
        this.setState({
          picWidth: picBestWidth,
          picRotate: 0,
          picPositionX: 0,
          picPositionY: 0,
        });
        break;
      case 'rotate':
        this.setState({
          picRotate: num,
        });
        break;
      default:
    }
  }

  /**
   * 鼠标拖动
   */
  onDrag = (e, data) => {
    this.setState({
      picPositionX: data.x,
      picPositionY: data.y,
    });
  }

  /**
   * 操作按钮
   */
  getPictureBtns = () => {
    const { picBtns } = this.props;
    const { picErrors } = this.state;
    if (is.boolean(picBtns)) {
      if (!picBtns) {
        return [];
      }
      return getBtns(__operateBtns);
    }
    return getBtns(picBtns);

    function getBtns(array = []) {
      return array.map((btn) => {
        let disabled = false;
        switch (btn.value) {
          case 'zoom':
          case 'rotate':
          case 'reset':
            disabled = !!picErrors;
            break;
          default:
        }
        return { ...btn, disabled };
      })
    }
  }

  /**
   * 获取图片缩放级别
   */
  getPicZoom = () => {
    const { picWidth, picOriginWidth } = this.state;
    return picWidth / picOriginWidth * 100;
  }

  render() {
    const { picSrc, wraperStyle, viewHeight } = this.props;
    const { picWidth, picRotate, picErrors, picPositionX, picPositionY } = this.state;
    const zoom = this.getPicZoom();
    const picBtns = this.getPictureBtns();

    return (
      <section className={CLASS_NAMES.__wraper} style={wraperStyle}>
        <div
          style={{ height: viewHeight }}
          ref={inst => this.inst = inst}
        >
          <ViewArea
            src={picSrc}
            width={picWidth}
            rotate={picRotate}
            errors={picErrors}
            positionX={picPositionX}
            positionY={picPositionY}
            onDoubleClick={this.onDoubleClick}
            onDrag={this.onDrag}
            onWheel={this.onMouseWheel}
          />
        </div>
        <OperateBtns
          rotate={picRotate}
          zoom={zoom}
          btns={picBtns}
          onChange={this.operating}
        />
      </section>
    )
  }
}

HPictureView.propTypes = {
  wraperStyle: propTypes.object,
  viewHeight: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
  ]),
  picSrc: propTypes.string,
  picWidth: propTypes.number,
  picRotate: propTypes.number,
  picPositionX: propTypes.number,
  picPositionY: propTypes.number,
  picRotateRate: propTypes.number,
  picZoomRate: propTypes.number,
  picBtns: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.shape({
      value: propTypes.string.isRequired,
      label: propTypes.string.isRequired,
    })),
    propTypes.bool,
  ]),
}
