import React from 'react';
import '../styles/dialog.scss';
import '../styles/button.scss';
import PropTypes from 'prop-types';
import Dialog from '../../film-dialog/dialog/dialog';

export default function ConfirmationDialog(props) {
  const {
    onClose, title, description, onConfirm,
  } = props;
  return (
    <Dialog onClose={() => onClose()}>
      <div className="DialogContainer">
        <div className="DialogTitle">{title}</div>
        <div className="DialogDescription">{description}</div>
      </div>
      <div className="DialogActionContainer">
        <div key="Confirm" className="button" onClick={() => onConfirm()}>
          Confirm
        </div>
      </div>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
