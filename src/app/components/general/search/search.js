import React, { useEffect, useState } from 'react';
import './search.scss';
import '../styles/form.scss';
import PropTypes from 'prop-types';

export default function Search({ searchString, searchButtonLabel, search }) {
  const [text, setText] = useState(searchString || '');

  useEffect(() => setText(searchString || ''), [searchString]);

  const onSearch = () => {
    search(text);
  };

  return (
    <div className="search-content">
      <input
        name="search"
        value={text}
        className="search-container"
        placeholder="What do you want to watch?"
        onKeyDown={(event) => event.key === 'Enter' && onSearch()}
        onChange={(event) => setText(event.target.value)}
      />
      <div className="button-search" onClick={onSearch}>
        {searchButtonLabel || 'Search'}
      </div>
    </div>
  );
}

Search.propTypes = {
  searchString: PropTypes.string,
  searchButtonLabel: PropTypes.string,
  search: PropTypes.func.isRequired,
};

Search.defaultProps = {
  searchString: null,
  searchButtonLabel: null,
};
