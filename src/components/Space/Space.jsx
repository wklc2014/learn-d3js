import React from 'react';
import propTypes from 'prop-types';

export default function Space ({ height = 16 }) {
  const style = {
    width: '100%',
    height: 0,
    paddingBottom: height,
  }
  return <div style={style} />
}

Space.propTypes = {
  height: propTypes.number,
}
