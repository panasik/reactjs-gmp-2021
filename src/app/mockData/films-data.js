import image_1 from '../res/img/film-image-1.jpg';
import image_2 from '../res/img/film-image-2.jpeg';
import image_3 from '../res/img/film-image-3.jpg';
import image_4 from '../res/img/film-image-4.jpg';
import { v4 as uuidv4 } from 'uuid';

const imgs = [image_1, image_2, image_3, image_4];
const releaseDate = ['2000-10-12', '2007-01-03', '2015-10-07', '2020-05-05'];

export const genres = ['Documentary', 'Comedy', 'Horror', 'Crime'];

export const allFilms = Array.from(Array(20).keys()).map(el => (
    {
        id: uuidv4(),
        title: `Film ${el}`,
        releaseDate: releaseDate[Math.floor(Math.random() * releaseDate.length)],
        url: 'http://test.com',
        image: imgs[el%7],
        genres: [genres[Math.floor(Math.random() * genres.length)]],
        overview: 'Loooooooooooooooooong teeeeeeeeeeeeeeeeextttttttttt',
        runtime: '1:35'
    }));