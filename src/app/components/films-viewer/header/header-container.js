import Logo from '../../general/logo/logo';
import React from 'react';
import './header-container.scss';
import PropTypes from 'prop-types';
import '../../general/styles/button.scss';
import img from '../../../res/img/netflex-background.jpg';

HeaderContainer.propTypes = {
    height: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default function HeaderContainer(props) {
    return (
        <div className='HeaderContainer' style={{height: (props.height || '100%')}}>
            <img
                src={img}
                alt='header'
                className='HeaderBackground' />
            <div className='HeaderContent'>
                <Logo />
                {
                    props.children
                }
            </div>
        </div>
    );
}