import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import cx from 'classnames';
import FoundationSymbol from 'foundation-symbol';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import User from '../User';
import { adminHeaderMenuConfig } from '../../menuConfig';
import './AdminHeader.scss';

const headerMenuConfig = adminHeaderMenuConfig;

export default class AdminHeader extends PureComponent {
  render() {
    const { width, theme, className, style } = this.props;

    return (
      <Layout.Header
        theme={theme}
        className={cx('ice-design-layout-header', className)}
        style={{ ...style, width }}
      >
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerMenuConfig.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.to;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.to;
                } else {
                  linkProps.to = nav.to;
                }
                return (
                  <Menu.Item key={idx}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        {nav.name}
                      </Link>
                    ) : (
                      <a {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        {nav.name}
                      </a>
                    )}
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}

          <User />
        </div>
      </Layout.Header>
    );
  }
}
