import React from 'react';
import './search.scss';
import '../styles/form.scss';
import PropTypes from 'prop-types';

let text = '';
const search = () => {
    props.search(text);
}

const Search = (props) => (
    <div className='search-content'>
        <input
            name="search"
            className='search-container'
            placeholder='What do you want to watch?'
            onChange={(event) => text = event.target.value} />
        <div className='button-search' onClick={search}>
            {props.searchButtonLabel || 'Search'}
        </div>
    </div>
);

Search.propTypes = {
    searchButtonLabel: PropTypes.string,
    search: PropTypes.func.isRequired
}

export default Search;
