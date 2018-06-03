import React, { Component } from 'react';
// import propTypes from 'prop-types';
import { Button, Card } from 'antd';

const { d3 } = window;

const common_style = {
  width: 100,
  height: 100,
  border: '1px solid #ddd',
  marginBottom: 16,
}

function MyButton({ onClick, text, marginRight = 0 }) {
  const ButtonProps = {
    type: 'primary',
    onClick,
    style: {},
  }
  if (marginRight) {
    ButtonProps.style.marginRight = marginRight;
  }
  return <Button {...ButtonProps}>{text}</Button>;
}

export default class CardColor extends Component {

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      bg_1: '#000',
      bg_2: '#eee',
    }
  }

  handleClick = ({ div, func }) => {
    const bg = this.state[`bg_${div}`];
    const color = d3.rgb(bg);
    this.setState({
      [`bg_${div}`]: color[func](),
    })
  }

  render() {
    const { bg_1, bg_2 } = this.state;

    const div_style_1 = {
      ...common_style,
      backgroundColor: bg_1,
    }
    const div_style_2 = {
      ...common_style,
      backgroundColor: bg_2,
    }

    return (
      <Card title="颜色">
        <div style={div_style_1} />
        <div style={div_style_2} />
        <div>
          <MyButton
            onClick={() => this.handleClick({ div: '1', func: 'brighter' })}
            marginRight={8}
            text="div 1 brighter"
          />
          <MyButton
            onClick={() => this.handleClick({ div: '1', func: 'darker' })}
            marginRight={8}
            text="div 1 darker"
          />
          <MyButton
            onClick={() => this.handleClick({ div: '2', func: 'brighter' })}
            marginRight={8}
            text="div 2 brighter"
          />
          <MyButton
            onClick={() => this.handleClick({ div: '2', func: 'darker' })}
            marginRight={8}
            text="div 2 darker"
          />
        </div>
      </Card>
    )
  }

}

CardColor.propTypes = {

}
