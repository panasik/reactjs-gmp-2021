import Logo from '../../general/logo/logo';
import React from 'react';
import './header.scss';
import PropTypes from 'prop-types';
import '../../general/styles/button.scss';
import img from '../../../res/img/netflex-background.jpg';
import Search from '../../general/search/search';

const Header = (props) => (
            <div className='header-content'>
                <img src={img}
                    alt='header'
                    className='background-header'/>
                <div className='container-header'>
                    <Logo/>
                    <div className='button-add-movies'
                        onClick={() => props.onAddFilm()}>+ ADD MOVIE
                    </div>
                    <div className='container-search'>
                        <span className='search-place'>Find your movie</span>
                        <Search search={ props.updateSearchStr}/>
                    </div>
                </div>
            </div>
    );

    Header.propTypes = {
        updateSearchStr: PropTypes.func.isRequired,
        onAddFilm: PropTypes.func.isRequired
    }


export default Header;