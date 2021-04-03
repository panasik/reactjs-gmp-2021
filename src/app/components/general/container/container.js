import React from 'react';
import './container.scss';
import PropTypes from 'prop-types';


const Container = ({header, footer, children}) => (
    <div className='container'>
        {
            header && <div className='container-header'>
                {header}
            </div>
        }
        <div className='container-main'>
            {children}
        </div>
        {
            footer && <div className='container-footer'>
                {footer}
            </div>
        }
    </div>
);

Container.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    footer: PropTypes.node,
    header: PropTypes.node
};

export default Container;
