/**
 * 图片显示区域
 */
import React from 'react';
import propTypes from 'prop-types';
import Draggable from 'react-draggable';
import { Alert } from 'antd';

import * as CLASS_NAMES from './common/__classNames.js';

export default function ViewArea(props) {

  const {
    src,
    width,
    rotate = 0,
    positionX = 0,
    positionY = 0,
    errors = '',
    onDrag,
    onWheel,
    onDoubleClick,
  } = props;

  if (!!errors) {
    return (
      <div className={CLASS_NAMES.__box}>
        <Alert message={errors} showIcon type="error" />
      </div>
    )
  }

  const picStyle = {
    backgroundImage: `url(${src})`,
    width,
    transform: `rotate(${rotate}deg)`,
  }

  const handleStyle = {
    transform: `rotate(${rotate}deg)`,
  }

  return (
    <div className={CLASS_NAMES.__box}>
      <Draggable
        position={{ x: positionX, y: positionY }}
        onDrag={onDrag}
        handle={`.${CLASS_NAMES.__handle}`}
      >
        <div className={CLASS_NAMES.__drag}>
          <div className={CLASS_NAMES.__pic} style={picStyle} />
          <div
            className={CLASS_NAMES.__handle}
            onWheel={onWheel}
            onDoubleClick={onDoubleClick}
            style={handleStyle}
          />
        </div>
      </Draggable>
    </div>
  )
}

ViewArea.propTypes = {
  src: propTypes.string.isRequired,
  width: propTypes.number.isRequired,
  rotate: propTypes.number,
  positionX: propTypes.number,
  positionY: propTypes.number,
  errors: propTypes.string,
  onWheel: propTypes.func.isRequired,
  onDoubleClick: propTypes.func.isRequired,
  onDrag: propTypes.func.isRequired,
}
