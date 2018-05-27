/**
 * logo
 */
import React from 'react';
import { Link } from 'mirrorx';

import './logo.less';

export default function Logo ({ collapsed }) {
  const text = collapsed ? 'd3.js' : 'learn-d3.js';
  return (
    <section className="LogoWraper">
      <Link to="/" className="Logo">{ text }</Link>
    </section>
  )
}
