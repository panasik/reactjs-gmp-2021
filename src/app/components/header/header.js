import React from 'react';
import Logo from '../general/logo/logo';
import img from '../../res/img/netflex-background.jpg';
import Search from '../general/search/search';
import '../general/styles/button.scss';
import './header.scss';

function Header(){
    const search = (value) => {
        console.log('Find ', value);
    }

    return (
        <div className='header-content'>
            <img src={img}
                alt='header'
                className='background-header'/>
            <div className='container-header'>
                <Logo/>
                <div className='button-add-movies'>+ ADD MOVIE</div>
                <div className='container-search'>
                    <span className='search-place'>Find your movie</span>
                    <Search search={search}/>
                </div>
            </div>
        </div>
    )
}

export default Header;