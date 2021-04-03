import {ACTIONS} from '../actions';

const calculateAllGenres = (genres, films) => films.reduce((acc, cur) => {
  acc.push(...cur.genres.filter(g => !acc.includes(g) && !genres.includes(g)));
  return acc;
}, genres);

export function filmItems(state = [], action) {
  switch (action.type) {
    case ACTIONS.SET_ALL_FILM_ITEMS:
      return {films: [...action.payload ], genres: calculateAllGenres([], action.payload || [])};
    default: 
      return state;
  }
}