const { d3 } = window;

// const root = document.getElementById('root');

const quantize = d3.scale.quantize()
  .domain([1, 10])
  .range([0, 100]);

console.log('1>>>', quantize(1));
console.log('2>>>', quantize(3));
console.log('3>>>', quantize(7));

// const a = quantize.quantizes();
// console.log('a>>>', a);