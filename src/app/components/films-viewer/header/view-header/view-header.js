import React from 'react';
import './view-header.scss';
import PropTypes from 'prop-types';
import '../../../general/styles/button.scss';
import Search from '../../../general/search/search';
import HeaderContainer from "../../../general/header-container/header-container";

export default function ViewerHeader({searchString, updateSearchStr, onAddFilm}) {
    return (
        <HeaderContainer height={'300px'}>
            <div className='TransparentButton HeaderRightCorner button-header'
                onClick={() => onAddFilm()}>+ ADD MOVIE
            </div>
            <div className='SearchContainer'>
                <span className='SearchTitle'>Find your movie</span>
                <Search searchString={searchString} search={updateSearchStr}/>
            </div>
        </HeaderContainer>
    );
}

ViewerHeader.propTypes = {
    searchString: PropTypes.string,
    updateSearchStr: PropTypes.func.isRequired,
    onAddFilm: PropTypes.func.isRequired
};