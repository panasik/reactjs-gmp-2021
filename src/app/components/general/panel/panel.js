import React from 'react';
import './panel.scss';
import PropTypes from 'prop-types';

function Panel(props) {
  const { closable, onClose, children } = props;
  return (
    <div className="Panel">
      {closable && (
        <span className="PanelCloseMark" tabIndex={0} onClick={onClose}>
          x
        </span>
      )}
      {children}
    </div>
  );
}

Panel.propTypes = {
  closable: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Panel;
