import React, { Component } from 'react';
// import propTypes from 'prop-types';
import { Card } from 'antd';
import HForm from '../../components/HForm/HForm.jsx';

const { d3 } = window;
const svg_width = 500;
const svg_height = 500;
const id_div = 'id-MyColor-area';
const data = [80, 120, 130, 70, 60, 90];
const configs = [
  {
    label: '插值方式',
    config: {
      id: 'interpolate',
      type: 'select',
      ext: {
        data: [
          { label: 'linear', value: 'linear' },
          { label: 'step', value: 'step' },
          { label: 'basis', value: 'basis' },
          { label: 'bundle', value: 'bundle' },
          { label: 'cardinal', value: 'cardinal' },
          { label: 'monotone', value: 'monotone' },
        ]
      }
    }
  }
]

export default class CardArea extends Component {

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      interpolate: 'linear',
    }
  }

  componentDidMount() {
    this.renderLine();
  }

  renderLine = () => {
    const { interpolate } = this.state;
    const dom_div = d3.select('body').select(`#${id_div}`);
    dom_div.select('svg').remove();

    const path = d3.svg.area()
      .x((d, i) => 50 + i * 80)
      .y0((d, i) => svg_height / 2)
      .y1((d, i) => svg_height / 2 - d)
      .interpolate(interpolate);

    dom_div.append('svg')
      .attr('width', svg_width)
      .attr('height', svg_height)
      .append('path')
      .attr({
        'stroke': '#f00',
        'stroke-width': 4,
        'fill': 'none',
        'd': path(data),
      })
  }

  /**
   * 改变插值方式
   */
  handleChange = ({ id, value }) => {
    this.setState({ [id]: value }, this.renderLine);
  }

  render() {
    return (
      <Card title="区域生成器">
        <HForm
          configs={configs}
          onChange={this.handleChange}
          values={this.state}
        />
        <div id={id_div}></div>
      </Card>
    )
  }

}

CardArea.propTypes = {

}
