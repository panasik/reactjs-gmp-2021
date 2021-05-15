import fetch from 'node-fetch';
import { FilmApi, moviesUrl } from './films.api';

jest.mock('node-fetch', () => jest.fn());

describe('FilmApi', () => {
  const film = { id: 5 };

  beforeEach(() => {
    fetch.mockClear();
  });

  it('should perform createFilm', (done) => {
    fetch.mockReturnValueOnce(Promise.resolve({ ok: true }));
    FilmApi.createFilm().then((el) => {
      expect(el).toEqual({ ok: true });
      done();
    });
  });

  it('should handle error in createFilm', (done) => {
    fetch.mockReturnValueOnce(
      Promise.resolve({ ok: false, text: () => Promise.resolve('error') }),
    );
    FilmApi.createFilm().catch((el) => {
      expect(el).toEqual('error');
      done();
    });
  });

  it('should perform deleteFilm', (done) => {
    fetch.mockReturnValueOnce(Promise.resolve({ ok: true }));
    FilmApi.deleteFilm(film).then((el) => {
      expect(el).toEqual({ ok: true });
      expect(fetch).toHaveBeenCalledWith(`${moviesUrl}/${film.id}`, {
        method: 'DELETE',
      });
      done();
    });
  });

  it('should handle error in deleteFilm', (done) => {
    fetch.mockReturnValueOnce(
      Promise.resolve({ ok: false, text: () => Promise.resolve('error') }),
    );
    FilmApi.deleteFilm(film).catch((el) => {
      expect(el).toEqual('error');
      done();
    });
  });

  it('should perform updateFilm', (done) => {
    fetch.mockReturnValueOnce(Promise.resolve({ ok: true }));
    FilmApi.updateFilm(film).then((el) => {
      expect(el).toEqual({ ok: true });
      expect(fetch).toHaveBeenCalled();
      expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify(film));
      done();
    });
  });

  it('should handle error in updateFilm', (done) => {
    fetch.mockReturnValueOnce(
      Promise.resolve({ ok: false, text: () => Promise.resolve('error') }),
    );
    FilmApi.updateFilm(film).catch((el) => {
      expect(el).toEqual('error');
      done();
    });
  });

  it('should perform loadFilmById', (done) => {
    fetch.mockReturnValueOnce(
      Promise.resolve({ ok: true, json: () => Promise.resolve(film) }),
    );
    FilmApi.loadFilmById(film.id).then((el) => {
      expect(el).toEqual(film);
      expect(fetch).toHaveBeenCalledWith(`${moviesUrl}/${film.id}`);
      done();
    });
  });

  it('should handle error in loadFilmById', (done) => {
    fetch.mockReturnValueOnce(
      Promise.resolve({ ok: false, text: () => Promise.resolve('error') }),
    );
    FilmApi.loadFilmById(film.id).catch((el) => {
      expect(el).toEqual('error');
      done();
    });
  });

  it('should perform loadFilms', (done) => {
    fetch.mockReturnValueOnce(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [film] }),
      }),
    );
    FilmApi.loadFilms({ sortOrder: 'desc' }).then((el) => {
      expect(el).toEqual([film]);
      expect(fetch).toHaveBeenCalled();
      done();
    });
  });

  it('should correctly calcQueryStr in loadFilms', (done) => {
    fetch.mockReturnValueOnce(
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
    );
    FilmApi.loadFilms({
      sortType: 'test',
      sortOrder: 'asc',
      activeGenre: 'genre',
      searchString: 'str',
    }).then(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${moviesUrl}?limit=10&sortBy=test&sortOrder=asc&filter=genre&search=str&searchBy=title`,
      );
      done();
    });
  });

  it('should handle error in loadFilms', (done) => {
    fetch.mockReturnValueOnce(
      Promise.resolve({ ok: false, text: () => Promise.resolve('error') }),
    );
    FilmApi.loadFilms().catch((el) => {
      expect(el).toEqual('error');
      done();
    });
  });
});
