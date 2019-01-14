import React from 'react';
import Logo from '../Logo';
import './Footer.scss';

export default () => {
  return (
    <div className="footer">
      <div className="footer-layout">
        <div style={{ filter: 'grayscale(100%)', opacity: 0.3 }}>
          <Logo isDark />
        </div>
        <div
          style={{
            color: '#999',
            lineHeight: 1.5,
            fontSize: 12,
            textAlign: 'right',
          }}
        >
          山东科技大学
          <br />© 2019 版权所有
        </div>
      </div>
    </div>
  );
};
