import React from 'react';
import './search.scss';
import PropTypes from 'prop-types';

Search.propTypes = {
    searchButtonLabel: PropTypes.string,
    search: PropTypes.func.isRequired
}

function Search(props) {
    let text = '';
    const search = () => {
        props.search(text);
    }
    return (
        <div className='search-content'>
            <input
                name="search"
                className='search-container'
                placeholder='What do you want to watch?'
                onChange={(event) => text = event.target.value}/>
            <div className='button-search' onClick={search}>
                {props.searchButtonLabel || 'Search'}
            </div>
        </div>
    );
}

export default Search;
