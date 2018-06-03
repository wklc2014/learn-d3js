import React, { Component } from 'react';
// import propTypes from 'prop-types';
import Space from '../../components/Space/Space.jsx';
import CardColor from './CardColor.jsx';
import CardLine from './CardLine.jsx';
import CardArea from './CardArea.jsx';

import './styles.less';

export default class MyColor extends Component {

  static defaultProps = {}

  render() {

    return (
      <div>
        <CardColor />
        <Space />
        <CardLine />
        <Space />
        <CardArea />
      </div>
    )
  }

}

MyColor.propTypes = {

}
