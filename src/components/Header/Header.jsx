import Menu, { Item as MenuItem, SubMenu } from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { headerMenuConfig } from '../../menuConfig';
import User from '../User';
import Logo from '../Logo';
import './Header.scss';

@withRouter
export default class Header extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location = {} } = this.props;
    const { pathname } = location;
    return (
      <div className="header-container">
        <div className="header-content">
          <Logo isDark={false} />
          <div className="header-navbar">
            <Menu
              className="header-navbar-menu"
              onClick={this.handleNavClick}
              selectedKeys={[pathname]}
              defaultSelectedKeys={[pathname]}
              mode="horizontal"
            >
              {headerMenuConfig &&
                headerMenuConfig.length > 0 &&
                headerMenuConfig.map((nav, index) => {
                  if (nav.children && nav.children.length > 0) {
                    return (
                      <SubMenu
                        triggerType="click"
                        key={index}
                        title={
                          <span>
                            {nav.icon ? (
                              <FoundationSymbol size="small" type={nav.icon} />
                            ) : null}
                            <span>{nav.name}</span>
                          </span>
                        }
                      >
                        {nav.children.map((item) => {
                          const linkProps = {};
                          if (item.newWindow) {
                            linkProps.href = item.path;
                            linkProps.target = '_blank';
                          } else if (item.external) {
                            linkProps.href = item.path;
                          } else {
                            linkProps.to = item.path;
                          }
                          return (
                            <MenuItem key={item.path}>
                              <Link {...linkProps}>
                                <span>{item.name}</span>
                              </Link>
                            </MenuItem>
                          );
                        })}
                      </SubMenu>
                    );
                  }
                  const linkProps = {};
                  if (nav.newWindow) {
                    linkProps.href = nav.path;
                    linkProps.target = '_blank';
                  } else if (nav.external) {
                    linkProps.href = nav.path;
                  } else {
                    linkProps.to = nav.path;
                  }
                  return (
                    <MenuItem key={nav.path}>
                      <Link {...linkProps}>
                        <span>
                          {nav.icon ? (
                            <FoundationSymbol size="small" type={nav.icon} />
                          ) : null}
                          {nav.name}
                        </span>
                      </Link>
                    </MenuItem>
                  );
                })}
            </Menu>
          </div>
          <User />
        </div>
      </div>
    );
  }
}
