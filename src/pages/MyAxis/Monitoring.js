const { d3 } = window;

function Monitoring(el, data, options) {
  const defaults = {
    width: 600,
    height: 500,
    prefix: 'monitoring',
    radius: 6,
  }
  this.el = el;
  this.data = data;
  this.options = { ...options, ...defaults };
  this.init();
}

// 初始化
Monitoring.prototype.init = function() {
  const { width, height, prefix } = this.options;
  const svg = d3.select(this.el)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  svg.append('g')
    .classed(`${prefix}-nodes-box`, true);

  svg.append('g')
    .classed(`${prefix}-lines-box`, true);

  svg.append('g')
    .classed(`${prefix}-arows-box`, true);

  this.update();
}

Monitoring.prototype.update = function() {
  this._drawNodes();
  this._drawLines();
  this._drawTexts();
  this._drawArows();
}

Monitoring.prototype.destroy = function() {

}

Monitoring.prototype._drawArows = function() {
  const { prefix } = this.options;
  const arows = d3.select(this.el)
    .select('svg')
    .select(`.${prefix}-arows-box`)

  const defs = arows.append('defs');
  const arrow_path = 'M2,2 L10,6 L2,10 L6,6 L2,2';
  const markers = defs.append('marker')
    .attr('id', 'g-my-arrow')
    .attr('markerUnits', 'strokeWidth')
    .attr('markerWidth', '12')
    .attr('markerHeight', '12')
    .attr('viewBox', '0 0 12 12')
    .attr('refX', '6')
    .attr('refY', '6')
    .attr('orient', 'auto')
    .append('path')
    .attr('d', arrow_path)
    .attr('fill', '#000');
}

// 绘制线
Monitoring.prototype._drawLines = function() {
  const { links } = this.data;
  const { prefix } = this.options;
  const lines = d3.select(this.el)
    .select('svg')
    .select(`.${prefix}-lines-box`)
    .selectAll(`.${prefix}-lines`)
    .data(links)

  lines.enter().append('line').classed(`${prefix}-lines`, true);

  lines.attr('x1', (d, i) => {
      const { x1 } = this._calc(d);
      return x1;
    })
    .attr('y1', (d, i) => {
      const { y1 } = this._calc(d);
      return y1;
    })
    .attr('x2', (d, i) => {
      const { x2 } = this._calc(d);
      return x2;
    })
    .attr('y2', (d, i) => {
      const { y2 } = this._calc(d);
      return y2;
    })
    .attr('stroke', 'red')
    .attr('stroke-width', 2)
    .attr('marker-end', 'url(#g-my-arrow)')

  lines.exit().remove();
}

// 绘制节点
Monitoring.prototype._drawNodes = function() {
  const { nodes } = this.data;
  const { radius = 6, prefix } = this.options;
  const scales = this._scales();
  const nodesEle = d3.select(this.el)
    .select('svg')
    .select(`.${prefix}-nodes-box`)
    .selectAll(`.${prefix}-nodes`)
    .data(nodes);

  const enterNodesEle = nodesEle.enter()
    .append('g')
    .classed(`${prefix}-nodes`, true);

  enterNodesEle.append('circle')
    .classed(`${prefix}-nodes-circle`, true);

  enterNodesEle.append('text')
    .classed(`${prefix}-nodes-text`, true);

  const circlesEle = nodesEle.selectAll(`.${prefix}-nodes-circle`);
  const textsEle = nodesEle.selectAll(`.${prefix}-nodes-text`);

  circlesEle.attr('cx', function(d) { return scales.x(d.x); })
    .attr('cy', function(d) { return scales.y(d.y); })
    .attr('r', function(d) { return scales.z(radius); })

  textsEle.attr('text-anchor', 'middle')
    .attr('fill', '#fff')
    .attr('font-size', '14px')
    .attr('dy', '0.35em')
    .text(function (d) {
      return d.name;
    })
    .attr('x', function(d) { return scales.x(d.x); })
    .attr('y', function(d) { return scales.y(d.y); })

  nodesEle.exit().remove();
};

// 比例尺
Monitoring.prototype._scales = function() {
  const { range, domain } = this.data;
  const { x, y, z } = domain;
  const xScale = d3.scale.linear().range(range).domain(x);
  const yScale = d3.scale.linear().range(range).domain(y);
  const zScale = d3.scale.linear().range(range).domain(z);
  return {
    x: xScale.invert,
    y: yScale.invert,
    z: zScale.invert,
  }
}

// 绘制文本
Monitoring.prototype._drawTexts = function() {

}

Monitoring.prototype._calc = function(d) {
  const { radius = 6 } = this.options;
  const { nodes } = this.data;
  const scales = this._scales();
  const source = nodes.find(node => node.id === d.source);
  const target = nodes.find(node => node.id === d.target);
  const x1 = scales.x(source.x);
  const y1 = scales.y(source.y);
  const x2 = scales.x(target.x);
  const y2 = scales.y(target.y);
  const r = scales.z(radius);
  const deg = Math.atan((y2 - y1) / (x2 - x1));
  const rate = x2 < x1 ? -1 : 1;

  const _x1 = x1 + Math.cos(deg) * r * rate;
  const _y1 = y1 + Math.sin(deg) * r * rate;

  const path = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
  const _x2 = x1 + Math.cos(deg) * (path - r) * rate;
  const _y2 = y1 + Math.sin(deg) * (path - r) * rate;

  return { x1: _x1, y1: _y1, x2: _x2, y2: _y2 };
}

export default Monitoring;