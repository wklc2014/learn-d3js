import React, { Component } from 'react';
import propTypes from 'prop-types';

import Monitoring from './Monitoring.js';

export default class MySvgSymbol extends Component {

  static defaultProps = {
    links: [],
    range: [],
    width: '100%',
    height: '400px',
  }

  componentDidMount() {
    const el = this.inst;
    const { width, height } = this.props;
    const data = this.getChartState();
    this.monitoring = new Monitoring(el, data, {
      width,
      height,
    })
  }

  componentDidUpdate() {
    const el = this.inst;
    const data = this.getChartState();
    this.monitoring.update();
  }

  getChartState = () => {
    const { nodes, links, range, domain } = this.props;
    return { nodes, links, range, domain };
  }

  componentWillUnmount() {
    const el = this.inst;
    this.monitoring.destroy();
  }

  render() {
    return (
      <div ref={inst => this.inst = inst} />
    );
  }

}

MySvgSymbol.propTypes = {
  width: propTypes.string,
  height: propTypes.string,
  nodes: propTypes.array.isRequired,
  links: propTypes.array,
  range: propTypes.array,
  domain: propTypes.object.isRequired,
}
