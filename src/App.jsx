import React, { Component } from 'react';
import d3 from 'd3';
// import propTypes from 'prop-types';

// import './js/sort.js';
// import './js/min.js';
// import './js/object.js';

// import pic_01 from './images/pic-1.jpg';

export default class Index extends Component {

  static defaultProps = {}

  componentDidMount() {
    const wraper = d3.select('body').select('#app-wraper');
    // const svg = wraper.append('svg');
    // svg.attr({
    //   width: '400px',
    //   height: '300px',
    // })
    const ani = document.getElementsByClassName('ani');
    // const _ani = d3.select(ani);
    const __ani = d3.selectAll(ani);
    // console.log('_ani>>>', _ani);
    console.log('__ani>>>', __ani.node());
    console.log('__ani>>>', __ani.size());
  }

  render() {


    return (
      <div id="app-wraper">
        <h1 className="ani">cat</h1>
        <h1 className="ani">dog</h1>
      </div>
    )
  }

}

Index.propTypes = {

}
