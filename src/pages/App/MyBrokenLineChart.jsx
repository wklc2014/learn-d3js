import React, { Component } from 'react';
// import propTypes from 'prop-types';
import { Card } from 'antd';

const { d3 } = window;
const div_id = 'myid-line-chart';
const svg_width = 600;
const svg_height = 500;
const dataset = [
  {
    country: 'china',
    gdp: [
      [2000, 11920], [2001, 13170], [2002, 14550],
      [2003, 16500], [2004, 19440], [2005, 22870],
      [2006, 27930], [2007, 35040], [2008, 45470],
      [2009, 51050], [2010, 59490], [2011, 73140],
      [2012, 83860], [2013, 103550],
    ]
  },
  {
    country: 'japan',
    gdp: [
      [2000, 47310], [2001, 41590], [2002, 39800],
      [2003, 43020], [2004, 46550], [2005, 45710],
      [2006, 43560], [2007, 43560], [2008, 48490],
      [2009, 50350], [2010, 54950], [2011, 59050],
      [2012, 59370], [2013, 48980],
    ]
  }
]

// 外边框
const padding = {top: 20, bottom: 20, left: 50, right: 20 };

// 计算GDP最大值
let gdp_max = 0;
dataset.forEach(val => {
  const { gdp } = val;
  const current_gdp_max = d3.max(gdp, d => d[1]);
  if (gdp_max < current_gdp_max) {
    gdp_max = current_gdp_max;
  }
})

export default class MyBrokenLineChart extends Component {

  static defaultProps = {}

  componentDidMount() {
    const dom_svg = d3.select('body')
      .select(`#${div_id}`)
      .append('svg')
      .attr('width', svg_width)
      .attr('height', svg_height)

    const xScale = d3.scale.linear()
      .domain([2000, 2013])
      .range([0, svg_width - padding.left - padding.right]);

    const yScale = d3.scale.linear()
      .domain([0, gdp_max * 1.1])
      .range([svg_height - padding.top - padding.bottom, 0]);

    const line_path = d3.svg.line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]));

    const colors = [d3.rgb(0, 0, 255), d3.rgb(0, 255, 0)];

    dom_svg.selectAll('path')
      .data(dataset)
      .enter()
      .append('path')
      .attr('transform', `translate(${padding.left}, ${padding.top})`)
      .attr('d', d => line_path(d.gdp))
      .attr('fill', 'none')
      .attr('stroke-width', 3)
      .attr('stroke', (d, i) => colors[i])

    const xAxis = d3.svg.axis()
      .scale(xScale)
      .ticks(5)
      .tickFormat(d3.format('d'))
      .orient('bottom')

    const yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')

    dom_svg.append('g')
      .classed('axis', true)
      .attr('transform', `translate(${padding.left}, ${svg_height - padding.bottom})`)
      .call(xAxis)

    dom_svg.append('g')
      .classed('axis', true)
      .attr('transform', `translate(${padding.left}, ${padding.top})`)
      .call(yAxis)
  }

  render() {
    return (
      <Card title="折线图">
        <div id={div_id}></div>
      </Card>
    )
  }

}

MyBrokenLineChart.propTypes = {

}
