import Logo from '../logo/logo';
import React from 'react';
import './header-container.scss';
import '../styles/button.scss';
import img from '../../../res/img/netflex-background.jpg';
import PropTypes from "prop-types";

HeaderContainer.propTypes = {
    height: PropTypes.string,
    children: PropTypes.array
};

export default function HeaderContainer(props) {

    return (
        <div className='HeaderContainer' style={{height: (props.height || '100%')}}>
            <img
                src={img}
                alt='header'
                className='HeaderBackground'/>
            <div className='HeaderContent'>
                <Logo/>
                {
                   props.children
                }
            </div>
        </div>
    );
}