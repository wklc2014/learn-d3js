/**
 * d3 排序
 */
import d3 from 'd3';

const arr_1 = [3, 5, 1, 7, 4, 9, 1];
const arr_2 = [...arr_1];

// 升序
const new_arr_1 = arr_1.sort(d3.ascending);

// 降序
const new_arr_2 = arr_2.sort(d3.descending);

console.log('new_arr_1>>>', new_arr_1);
console.log('arr_1>>>', arr_1);
console.log('new_arr_2>>>', new_arr_2);
console.log('arr_2>>>', arr_2);
