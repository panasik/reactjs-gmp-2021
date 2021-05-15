import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo/logo';
import './header-container.scss';
import '../styles/button.scss';
import img from '../../../res/img/netflex-background.jpg';

export default function HeaderContainer(props) {
  const { height, children } = props;
  return (
    <div className="HeaderContainer" style={{ height: height || '100%' }}>
      <img src={img} alt="header" className="HeaderBackground" />
      <div className="HeaderContent">
        <Logo />
        {children}
      </div>
    </div>
  );
}

HeaderContainer.propTypes = {
  height: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

HeaderContainer.defaultProps = {
  height: '100%',
};
