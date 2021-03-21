import React from 'react';
import './panel.scss';
import PropTypes from 'prop-types';

const Panel = (props) => (
    <div className='Panel'>
        {
            props.closable &&
            <span
                className='PanelCloseMark'
                tabIndex={0}
                onClick={props.onClose}>x</span>
        }
        {
            props.children
        }
    </div>
);

Panel.propTypes = {
    closable: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};

export default Panel;