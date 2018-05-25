import React, { Component } from 'react';
// import propTypes from 'prop-types';
import { Button } from 'antd';

const { d3 } = window;

const common_style = {
  width: 100,
  height: 100,
  border: '1px solid #ddd',
  marginBottom: 16,
}

export default class App extends Component {

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      bg_1: '#000',
      bg_2: '#eee',
    }
  }

  componentDidMount() {

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
      <div style={{ padding: 16 }}>
        <div style={div_style_1}></div>
        <div style={div_style_2}></div>
        <div>
          <Button
            type="primary"
            onClick={() => this.handleClick({ div: '1', func: 'brighter' })}
            style={{ marginRight: 8 }}
          >
            div 1 brighter
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleClick({ div: '1', func: 'darker' })}
            style={{ marginRight: 8 }}
          >
            div 1 darker
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleClick({ div: '2', func: 'brighter' })}
            style={{ marginRight: 8 }}
          >
            div 2 brighter
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleClick({ div: '2', func: 'darker' })}
          >
            div 2 darker
          </Button>
        </div>
      </div>
    )
  }

}

App.propTypes = {

}
