import React, { Component } from 'react';
import { Card } from 'antd';

import './styles.less';

const { d3 } = window;
const __div_id = `__ID_${+new Date()}`;

const dataset = [
  ['小米', 60.8],
  ['三星', 58.4],
  ['联想', 47.3],
  ['苹果', 46.6],
  ['华为', 41.3],
  ['酷派', 40.1],
  ['其他', 111.5],
];

const svg_width = 500;
const svg_height = 500;

export default class MyPie extends Component {

  static defaultProps = {}

  componentDidMount() {
    // 插入 svg 标签
    const dom_svg = d3.select('body')
      .select(`#${__div_id}`)
      .append('svg')
      .classed('pie-svg', true)
      .attr('width', svg_width)
      .attr('height', svg_height);

    const inner_radius = 0;
    const outer_radius = svg_width / 3;

    // 创建饼图
    const pie = d3.layout.pie()
      .value(function (d) {
        return d[1];
      })

    // 转换数据
    const pie_data = pie(dataset);

    // 弧生成器
    const arc = d3.svg.arc()
      .innerRadius(inner_radius)
      .outerRadius(outer_radius);

    // 颜色比例尺
    const color = d3.scale.category20();

    const arcs = dom_svg.selectAll('g')
      .data(pie_data)
      .enter()
      .append('g')
      .attr('transform', `translate(${svg_width / 2}, ${svg_height / 2})`)

    arcs.append('path')
      .attr('fill', function (d, i) {
        return color(i)
      })
      .attr('d', function (d) {
        return arc(d);
      })

    arcs.append('text')
      .classed('percent-text', true)
      .attr('transform', function (d) {
        const x = arc.centroid(d)[0] * 1.4;
        const y = arc.centroid(d)[1] * 1.4;
        return `translate(${x}, ${y})`;
      })
      .attr('text-anchor', 'middle')
      .attr('fill', 'red')
      .text(function (d) {
        const sum = d3.sum(dataset, function (d) {
          return d[1]
        })
        const percent = Number(d.value) / sum * 100;
        return percent.toFixed(1) + '%';
      })

    arcs.append('line')
      .classed('line', true)
      .attr('stroke', '#000')
      .attr('x1', function (d) {
        return arc.centroid(d)[0] * 2;
      })
      .attr('y1', function (d) {
        return arc.centroid(d)[1] * 2;
      })
      .attr('x2', function (d) {
        return arc.centroid(d)[0] * 2.2;
      })
      .attr('y2', function (d) {
        return arc.centroid(d)[1] * 2.2;
      })

    arcs.append('text')
      .classed('name-text', true)
      .attr('fill', '#f00')
      .attr('transform', function (d) {
        const x = arc.centroid(d)[0] * 2.5;
        const y = arc.centroid(d)[1] * 2.5;
        return `translate(${x}, ${y})`;
      })
      .attr('text-anchor', 'middle')
      .text(function (d) {
        return d.data[0];
      })
  }

  render() {
    return (
      <Card>
        <div id={__div_id}></div>
      </Card>
    )
  }

}

MyPie.propTypes = {

}
