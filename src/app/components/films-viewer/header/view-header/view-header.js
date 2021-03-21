import React from 'react';
import './view-header.scss';
import PropTypes from 'prop-types';
import '../../../general/styles/button.scss';
import Search from '../../../general/search/search';
import HeaderContainer from "../header-container";



export default function ViewerHeader(props) {
    return (
        <HeaderContainer height='300px'>
            <div className='TransparentButton HeaderRightCorner button-header'
                onClick={() => props.onAddFilm()}>+ ADD MOVIE
            </div>
            <div className='SearchContainer'>
                <span className='SearchTitle'>Find your movie</span>
                <Search search={props.updateSearchStr} />
            </div>
        </HeaderContainer>
    );
}

ViewerHeader.propTypes = {
    updateSearchStr: PropTypes.func.isRequired,
    onAddFilm: PropTypes.func.isRequired
};