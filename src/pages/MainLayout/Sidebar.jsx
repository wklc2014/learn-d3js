/**
 * 侧边导航内容
 */
import React, { Component, Fragment } from 'react';
import { Menu, Icon } from 'antd';
import is from 'is_js';
import { withRouter } from 'mirrorx';

import Logo from '../../components/Logo/Logo.jsx';
import MyNavLink from './MyNavLink.jsx';

import routeConfig from './common/index.js';

const { SubMenu, Item } = Menu;

function getSubMenuTitle(title = {}) {
  if (is.object(title)) {
    const { icon, label } = title;
    return (
      <Fragment>
        <Icon type={icon} />
        <span>{label}</span>
      </Fragment>
    );
  }
  return title;
}

class Sidebar extends Component {
  static defaultProps = {}

  getSidebarRoutes = () => {
    return routeConfig.filter(route => route.isSidebar);
  }

  render() {
    const { collapsed, location } = this.props;
    const { pathname } = location;

    const menuItemEle = this.getSidebarRoutes().map((route, i) => {
      const title = getSubMenuTitle(route.title);
      if (route.subMenus) {
        return (
          <SubMenu title={title} key={route.key}>
            {route.subMenus.map((r, j) => <Item key={r.path}><MyNavLink route={r} /></Item>)}
          </SubMenu>
        )
      }
      return <Item key={route.path}><MyNavLink route={route} /></Item>;
    });

    return (
      <section>
        <Logo collapsed={collapsed} />
        <Menu
          theme="dark"
          mode="vertical"
          selectedKeys={[pathname]}
        >
          {menuItemEle}
        </Menu>
      </section>
    );
  }
}

export default withRouter(Sidebar);
