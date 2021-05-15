import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './film-item.scss';
import ContextMenu from '../../../../general/context-menu/context-menu';
import noImage from '../../../../../res/img/no-image.png';
import filmType from '../../../../../util/prop-types/film.type';
import { menuItemType } from '../../../../general/menu-container/menu-container';

// PATTERN: Function Component
export default function FilmItem({ actions, film, clickHandler }) {
  const [displayMenu, setDisplayMenu] = useState(false);

  return (
    <>
      <div
        className="FilmItem"
        onMouseOver={() => setDisplayMenu(true)}
        onMouseLeave={() => setDisplayMenu(false)}
      >
        {displayMenu && (
          <ContextMenu
            items={actions}
            onItemSelected={(el) => el.handle(film)}
          />
        )}
        <img
          className="FilmImage"
          onClick={() => clickHandler()}
          src={film.poster_path || noImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = noImage;
          }}
          alt="film-logo"
        />
        <div className="FilmTitleContainer">
          <div className="FilmTitle">{film.title}</div>
          <div className="FilmReleaseDate">
            {new Date(film.release_date).getFullYear()}
          </div>
        </div>
        <div className="FilmGenres">
          {Array.isArray(film.genres) ? film.genres.join(', ') : ''}
        </div>
      </div>
    </>
  );
}

FilmItem.propTypes = {
  actions: PropTypes.arrayOf(menuItemType).isRequired,
  film: filmType.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
