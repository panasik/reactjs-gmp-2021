import React, {useState} from 'react';
import './content.scss';
import image_1 from '../../res/img/film-image-1.jpg';
import image_2 from '../../res/img/film-image-2.jpeg';
import image_3 from '../../res/img/film-image-3.jpg';
import image_4 from '../../res/img/film-image-4.jpg';
import ItemMovie from '../general/item-movie/item-movie';
import Tabs from '../general/tabs/tabs';
import Dropdown from '../general/dropdown/dropdown';

const tabs = [
    {id: 0, title: 'ALL', active: true},
    {id: 1, title: 'DOCUMENTARY'},
    {id: 2, title: 'COMEDY'},
    {id: 3, title: 'HORROR'},
    {id: 4, title: 'CRIME'},
];

const filterFilms = [
    {id: 0, title: 'RELEASE DATE'},
    {id: 1, title: 'TITLE'},
    {id: 2, title: 'GENRE'},
    {id: 3, title: 'RUNTIME'},
];

const releaseDate = [
    {id: 0, data: '2012'},
    {id: 1, data: '2014'},
    {id: 2, data: '2017'},
    {id: 3, data: '2021'}
]

const loadedFilms = Array.from(Array(25).keys()).map(id => (
    {
        id: id,
        title: 'Film_'+ id,
        releaseDate: [releaseDate[Math.floor((Math.random() * 3 + 1))].data],
        movieUrl: 'http://host.com',
        image: id % 7 === 0 ? undefined : id % 9 === 0 ? image_1 : id % 5 === 0 ? image_2 : id % 2 ? image_3 : image_4,
        genres: [tabs[Math.floor((Math.random() * 4 + 1))].title],
        description: 'Description_' + id,
        runtime: '23:50'
    }));

function Content() {
    const [films, setFilms] = useState(loadedFilms);
    const [filter, setFilter] = useState(filterFilms[0]);

    const onTabClicked = (element) => {
        if (element.id === 0) {
            setFilms(loadedFilms);
        } else {
            setFilms(loadedFilms.filter(el => el.genres.includes(element.title)));
        }
    }

    const onFilterSelected = (element) => {
        setFilter(element);
        console.log('Filter by ', element.title);
    }

    const perform = (action, film) => {
        console.log(action.title, film.title);
    }

    return (
        <div className='content-container'>
            <Tabs
                tabs={tabs}
                right={
                    <>
                        <div className='sort-label'>Sort by</div>
                        <Dropdown
                            selected={filter}
                            items={filterFilms}
                            onItemSelected={onFilterSelected}
                        />
                    </>
                }
                onTabClicked={(el) => onTabClicked(el)}>
                {
                    <div className='films-count-container'>
                        <div className='count-container'>
                            <span className='films-container'>{films.length}</span> movies found
                        </div>
                        {
                            films.length ?
                                <div className='film-container'>{
                                    films.map(el =>
                                    <ItemMovie
                                        key={el.id}
                                        movie={el}
                                        onMenuItemSelected={(a) => perform(a, el)}/>)
                                }
                                </div>

                                :
                                <div className="not-found-film-container">No films found</div>
                        }

                    </div>
                }
            </Tabs>
        </div>
    );
}

export default Content;
