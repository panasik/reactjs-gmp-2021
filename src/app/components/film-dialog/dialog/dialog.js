import React from 'react';
import './dialog.scss';
import '../../general/styles/dialog.scss';
import PropTypes from 'prop-types';

const Dialog = ({
  onClose, children,
}) => (
  <>
    <div className="Dialog">
      <div className="DialogCloseMark" onClick={onClose}>
        <div className="Cross" tabIndex={0} />
      </div>
      {children}
    </div>
    <div className="DialogBackground" />
  </>
);

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Dialog;
