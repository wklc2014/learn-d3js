import React from 'react';
import propTypes from 'prop-types';
import { Button, Popover } from 'antd';

import getPopoverContent from './common/getPopoverContent.js';
import getPopoverTitle from './common/getPopoverTitle.js';
import * as CLASS_NAMES from './common/__classNames.js';

const ButtonGroup = Button.Group;

export default function OperateBtns (props) {

  const {
    btns = [],
    rotate = 0,
    zoom = 100,
    onChange,
  } = props;

  const PopoverStyle = { width: 400 };
  const values = { rotate, zoom };

  const btnEle = btns.map((btn, i) => {
    const content = getPopoverContent(btn.value, values, onChange);
    const title = getPopoverTitle(btn.value);
    if (btn.value === 'rotate' || btn.value === 'zoom') {
      return (
        <Popover
          key={i}
          content={content}
          overlayStyle={PopoverStyle}
          title={title}
          trigger="click"
        >
          <Button disabled={btn.disabled}>{btn.label}</Button>
        </Popover>
      )
    }
    return (
      <Button
        key={i}
        onClick={() => onChange(btn.value)}
        disabled={btn.disabled}
      >
        {btn.label}
      </Button>
    )
  })

  return (
    <div className={CLASS_NAMES.__btns}>
      <ButtonGroup>{btnEle}</ButtonGroup>
    </div>
  )
}

OperateBtns.propTypes = {
  btns: propTypes.array,
  rotate: propTypes.number,
  zoom: propTypes.number,
  onChange: propTypes.func.isRequired,
}
