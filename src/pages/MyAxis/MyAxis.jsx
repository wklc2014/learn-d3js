import React, { Component } from 'react';
import { Card } from 'antd';

import './styles.less';

const { d3 } = window;
const svg_width = 600;
const svg_height = 600;

export default class MyAxis extends Component {

  static defaultProps = {}

  componentDidMount() {
    const dom_svg = d3.select('body')
      .select('#my-axis')
      .append('svg')
      .attr('width', svg_width)
      .attr('height', svg_height);

    const scale_x = d3.scale.linear()
      .domain([0, 10])
      .range([0, 300]);

    const axis = d3.svg.axis()
      .scale(scale_x)
      .orient('bottom')
      .ticks(5)
      .tickFormat(d3.format('$0.1f'));

    const dom_g = dom_svg.append('g')
      .classed('axis', true)
      .attr('transform', 'translate(80, 80)');

    dom_g.call(axis);
  }

  render() {
    return (
      <div className="my-axis-wraper">
        <Card>
          <div id="my-axis"></div>
        </Card>
      </div>
    )
  }

}

MyAxis.propTypes = {

}
