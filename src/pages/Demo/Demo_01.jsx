import React, { Component } from 'react';
// import propTypes from 'prop-types';
import * as d3 from 'd3';

export default class Demo_01 extends Component {

  static defaultProps = {}

  componentDidMount() {
    console.log('d3>>>', d3);
  }

  render() {
    return (
      <div>
        12
      </div>
    )
  }

}

Demo_01.propTypes = {

}
