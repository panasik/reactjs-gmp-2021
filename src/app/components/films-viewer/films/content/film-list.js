import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  selectFilms,
  setAddEditDialogOpen,
  setConfirmationDialog,
  setSelectedFilm,
} from '../../../../store';
import './film-list.scss';
import FilmItem from './film-item/film-item';

export default function FilmsList() {
  const films = useSelector(selectFilms);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const actions = [
    {
      id: 0,
      title: 'Edit',
      handle: (film) => {
        dispatch(setSelectedFilm(film));
        dispatch(setAddEditDialogOpen(true));
      },
    },
    {
      id: 1,
      title: 'Delete',
      handle: (film) => {
        dispatch(setSelectedFilm(film));
        dispatch(
          setConfirmationDialog({
            title: 'Delete Movie',
            description: 'Are you sure you want to delete this movie?',
          }),
        );
      },
    },
  ];

  const viewFilmDetails = (f) => {
    history.push({
      pathname: `/films/${f.id}`,
      search: location.search,
    });
    window.scrollTo(0, 0);
  };

  return (
    <>
      {films.length ? (
        <>
          <div className="FilmsCountContainer">
            <span className="FilmsCount">{films.length}</span>
            movies found
          </div>

          <div className="FilmList">
            {films.map((el) => (
              <FilmItem
                key={el.id}
                film={el}
                actions={actions}
                clickHandler={() => viewFilmDetails(el)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="FilmNoList">No Movie Found</div>
        </>
      )}
    </>
  );
}
