/**
 * d3.min()
 */
import d3 from 'd3';

const arr = [3, 5, 1, 7, 4, 9, 1];

const a = d3.min(arr);

console.log('a>>>', a);

const b = d3.min(arr, function(n, i) {
  console.log('n>>>', n + i);
  return n + i;
})

console.log('b>>>', b);
console.log('arr>>>', arr);


const c = d3.extent(arr);
console.log('c>>>', c);
