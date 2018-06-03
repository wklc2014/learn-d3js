import React, { Component } from 'react';
import { Card } from 'antd';

import './styles.less';

const { d3 } = window;
const svg_width = 500;
const svg_height = 500;
const __div_id = `__ID_${+new Date()}`;
const __nodes = [
  { name: '0' },
  { name: '1' },
  { name: '2' },
  { name: '3' },
  { name: '4' },
  { name: '5' },
  { name: '6' },
  { name: '7' },
  { name: '8' },
];
const __edges = [
  { source: 0, target: 1 },
  { source: 0, target: 2 },
  { source: 0, target: 3 },
  { source: 1, target: 4 },
  { source: 1, target: 5 },
  { source: 1, target: 6 },
  { source: 2, target: 7 },
  { source: 3, target: 8 },
  { source: 8, target: 1 },
]

export default class MyForce extends Component {

  static defaultProps = {}

  componentDidMount() {
    // 插入 svg 标签
    const dom_svg = d3.select('body')
      .select(`#${__div_id}`)
      .append('svg')
      .classed('pie-svg', true)
      .attr('width', svg_width)
      .attr('height', svg_height);

    const force = d3.layout.force()
      .nodes(__nodes)
      .links(__edges)
      .size([svg_width, svg_height])
      .linkDistance(90)
      .charge(-300)
      .chargeDistance(100)

    force.start();

    const color = d3.scale.category20();

    const lines = dom_svg.selectAll('.forceLine')
      .data(__edges)
      .enter()
      .append('line')
      .classed('forceLine', true)
      .attr('stroke', '#000')

    const circles = dom_svg.selectAll('.forceCircle')
      .data(__nodes)
      .enter()
      .append('circle')
      .classed('forceCircle', true)
      .attr('r', 20)
      .attr('fill', function (d, i) {
        return color(i);
      })
      .call(force.drag)

    const texts = dom_svg.selectAll('.forceText')
      .data(__nodes)
      .enter()
      .append('text')
      .classed('forceText', true)
      .attr('x', function (d) {
        return d.x;
      })
      .attr('y', function (d) {
        return d.y;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('fill', '#f00')
      .text(function (d) {
        return d.name;
      })

    force.on('tick', function () {
      lines.attr('x1', function(d) { return d.source.x });
      lines.attr('y1', function(d) { return d.source.y });
      lines.attr('x2', function(d) { return d.target.x });
      lines.attr('y2', function(d) { return d.target.y });

      circles.attr('cx', function(d) { return d.x });
      circles.attr('cy', function(d) { return d.y });

      texts.attr('x', function(d) { return d.x });
      texts.attr('y', function(d) { return d.y });
    })

    force.on('start', function () {
      console.log('运动开始');
    })

    force.on('end', function () {
      console.log('运动结束');
    })

    force.drag()
      .on('dragstart', function (d) {
        d.fixed = true;
      })
      .on('dragend', function (d, i) {
        d3.select(this).style('fill', color(i))
      })
      .on('drag', function () {
        d3.select(this).style('fill', 'yellow')
      })

  }

  render() {
    const bodyStyle = {
      width: svg_width,
      height: svg_height,
      backgroundColor: '#eee',
      padding: 0
    }
    return (
      <Card bodyStyle={bodyStyle}>
        <div id={__div_id}></div>
      </Card>
    )
  }

}

MyForce.propTypes = {

}
