const body = d3.select('body');
const wraper = body.select('#app-wraper');
const svg = wraper.append('svg');
svg.attr({
  width: 300,
  height: 300,
})
var dataset = [550, 130, 210, 170, 90];  //数据（表示矩形的宽度）
var rectHeight = 300 / 5;   //每个矩形所占的像素高度(包括空白)
const min = d3.min(dataset);
const max = d3.max(dataset);
const linear = d3.scale.linear()
  .domain([0, max])
  .range([0, 600]);
svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr({
    x: function (d, i) {
      return i * rectHeight;
    },
    y: function (d, i) {
      return 300 - linear(d)
    },
    height: function (d, i) {
      return linear(d);
    },
    width: rectHeight - 2,
    fill: 'steelblue',
  })