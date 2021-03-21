import React from 'react';
import './checkbox.scss';
import PropTypes from 'prop-types';

const Checkbox = (props) => (
    <label className='Checkbox'>
        <input
            type="checkbox"
            checked={props.checked}
            onChange={event => props.onCheck(event.target.checked)}/>
        {props.title || ''}
        <span className="checkmark"></span>
    </label>
);

Checkbox.propTypes = {
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired
};

export default Checkbox;