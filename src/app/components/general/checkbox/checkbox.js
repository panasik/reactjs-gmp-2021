import React from 'react';
import './checkbox.scss';
import PropTypes from 'prop-types';

const Checkbox = ({ checked, onCheck, title }) => (
  <label className="Checkbox">
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => onCheck(event.target.checked)}
    />
    {title || ''}
    <span className="checkmark" />
  </label>
);

Checkbox.propTypes = {
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default Checkbox;
