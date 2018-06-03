import React, { Component } from 'react';
// import propTypes from 'prop-types';
import { Card } from 'antd';
import HForm from '../../components/HForm/HForm.jsx';

const { d3 } = window;
const svg_width = 400;
const svg_height = 400;
const id_div = 'id-MyColor-line';
const line_data = [
  [80, 80], [200, 100], [200, 200], [100, 200]
];
const configs = [
  {
    label: '插值方式',
    config: {
      id: 'interpolate',
      type: 'select',
      ext: {
        data: [
          { label: 'linear', value: 'linear' },
          { label: 'linear-closed', value: 'linear-closed' },
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

export default class CardLine extends Component {

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

    const line_path = d3.svg.line()
      .interpolate(interpolate);

    dom_div.append('svg')
      .attr('width', svg_width)
      .attr('height', svg_height)
      .append('path')
      .attr({
        'stroke': '#f00',
        'stroke-width': 4,
        'fill': 'none',
        'd': line_path(line_data),
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
      <Card title="线段生成器">
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

CardLine.propTypes = {

}
