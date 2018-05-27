import React from 'react';
import propTypes from 'prop-types';
import { Icon } from 'antd';
import { NavLink, withRouter } from 'mirrorx';

import HDisplay from '../../components/HDisplay/HDisplay.jsx';

const MyNavLink = ({ route = {}, location }) => {
  const { pathname } = location;

  const { icon, className, path, label } = route;

  return (
    <NavLink to={path} replace={path === pathname}>
      <HDisplay condition={icon}>
        <Icon type={icon} />
      </HDisplay>
      <HDisplay condition={className}>
        <span className={className} />
      </HDisplay>
      <span>{label}</span>
    </NavLink>
  );
}

MyNavLink.propTypes = {
  route: propTypes.object.isRequired,
}

export default withRouter(MyNavLink);
