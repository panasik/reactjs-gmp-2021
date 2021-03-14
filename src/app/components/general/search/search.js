import React, { useState } from 'react';
import './search.scss';
import '../styles/form.scss';
import PropTypes from 'prop-types';


export default function Search(props) {
    let [text, setText] = useState('');

    const search = () => {
        props.search(text);
    }

    return (
        <div className='search-content'>
            <input
                name="search"
                className='search-container'
                placeholder='What do you want to watch?'
                onKeyDown={event => event.key === "Enter" && search()}
                onChange={(event) => setText(event.target.value)} />
            <div className='button-search' onClick={search}>
                {props.searchButtonLabel || 'Search'}
            </div>
        </div>
    );
}

Search.propTypes = {
    searchButtonLabel: PropTypes.string,
    search: PropTypes.func.isRequired,
}

