import React from 'react';
import './container.scss';
import PropTypes from 'prop-types';

Container.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    footer: PropTypes.node,
    header: PropTypes.node
}

function Container(props) {
    return (
        <div className='container'>
            
            {
                props.header && <div className='container-header'>
                    {props.header}
                </div>
            }
           <div className='container-main'>
                {props.children}
            </div>
            {
                props.footer && <div className='container-footer'>
                    {props.footer}
                </div>
            }
        </div>
    );
}

export default Container;
