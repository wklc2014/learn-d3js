const dom_svg = d3.select('body')
      .select('#my-axis')
      .append('svg')
      .attr('width', svg_width)
      .attr('height', svg_height);

    // 比例尺
    const scale_x = d3.scale.linear()
      .domain([0, 10])
      .range([0, 300]);

    // 坐标轴
    const axis = d3.svg.axis()
      .scale(scale_x)
      .orient('bottom')
      .ticks(5)
      .tickFormat(d3.format('$0.1f'));

    const dom_g = dom_svg.append('g')
      .classed('axis', true)
      .attr('transform', 'translate(80, 80)')
      .call(axis);

const { d3 } = window;
const d3Symbol = {};

d3Symbol.create = function(el, props, state) {
  const svg = d3.select(el).append('svg')
    .classed('d3SymbolBox', true)
    .attr('width', props.width)
    .attr('height', props.height)
    .append('g')
    .classed('d3-points', true)

  this.update(el, state);
}

d3Symbol.update = function(el, state) {
  const { data, range, domain } = state;
  const scales = this._scales(range, domain);
  this._drawPoints(el, scales, data);
}

d3Symbol.destroy = function(el) {

}

// d3Chart.js

d3Symbol._drawPoints = function(el, scales, data) {
  var g = d3.select(el).selectAll('.d3-points');

  var point = g.selectAll('.d3-point')
    .data(data, function(d) { return d.id; });

  // ENTER
  point.enter().append('circle')
      .attr('class', 'd3-point');

  // ENTER & UPDATE
  point.attr('cx', function(d) { return scales.x(d.x); })
      .attr('cy', function(d) { return scales.y(d.y); })
      .attr('r', function(d) { return scales.z(d.z); });

  // EXIT
  point.exit()
      .remove();
};

d3Symbol._scales = function(range, domain) {
  const scale = d3.scale.linear()
    .range(range)
    .domain(domain);
  return {
    x: scale.invert,
    y: scale.invert,
    z: scale.invert,
  }
}

export default d3Symbol;