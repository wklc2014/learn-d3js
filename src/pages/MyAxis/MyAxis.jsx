import React, { Component } from 'react';
import { Card } from 'antd';

import MySvgSymbol from './MySvgSymbol.jsx';
import './styles.less';

export default class MyAxis extends Component {

  static defaultProps = {
    nodes: [
      { id: 1, name: '1', x: 2, y: 2 },
      { id: 2, name: '2', x: 4, y: 2 },
      { id: 3, name: '3', x: 6, y: 2 },
      { id: 4, name: '4', x: 8, y: 2 },
      { id: 5, name: '5', x: 2, y: 4 },
      { id: 6, name: '6', x: 2, y: 6 },
      { id: 7, name: '7', x: 4, y: 6 },
      { id: 8, name: '8', x: 6, y: 6 },
      { id: 9, name: '9', x: 8, y: 6 },
    ],
    links: [
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
      { source: 1, target: 5 },
      { source: 5, target: 6 },
      { source: 6, target: 7 },
      { source: 7, target: 8 },
      { source: 7, target: 1 },
      { source: 7, target: 3 },
      { source: 7, target: 4 },
      { source: 8, target: 9 },
    ],
  }

  componentDidMount() {
  }

  render() {
    const { nodes, links } = this.props;
    const MySvgSymbolProps = {
      nodes,
      links,
      range: [1, 10],
      domain: {
        x: [1, 600],
        y: [1, 400],
        z: [1, 50],
      },
    }

    return (
      <div className="my-axis-wraper">
        <Card>
        </Card>
        <Card>
          <MySvgSymbol {...MySvgSymbolProps} />
        </Card>
      </div>
    )
  }

}

MyAxis.propTypes = {

}
