import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './item-movie.scss';
import noImage from '../../../res/img/no-image.png';
import ContextMenu from '../context-menu/context-menu';

const contextMenuItems = [
    {id: 0, title: 'Edit'},
    {id: 1, title: 'Delete'},
];

ItemMovie.propTypes = {
    film: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        releaseDate: PropTypes.string.isRequired,
        overview: PropTypes.string
    }),
    onMenuItemSelected: PropTypes.func.isRequired
}

function ItemMovie(props) {
    const [movie] = useState(props.movie);
    const [displayMenuIcon, setDisplayMenuIcon] = useState(false);

    const onMenuItemSelected = (el) => {
        setDisplayMenuIcon(false);
        props.onMenuItemSelected(el);
    }


    return (
        <div className='item-movie-container'>
            <img className='image-movie-container'
                src={movie.image || noImage}
                alt='film-image'
                onClick={() => setDisplayMenuIcon(!displayMenuIcon)}>
            </img>
            {displayMenuIcon &&
            <ContextMenu
                items={contextMenuItems}
                onItemSelected={onMenuItemSelected}>
            </ContextMenu>}
            <div className='movie-container'>
                <div className='movie-title'>{movie.title}</div>
                <div className='movie-release-date'>{movie.releaseDate}</div>
            </div>
            <div className='movie-description'>{movie.description || ''}</div>
        </div>);
}

export default ItemMovie;
