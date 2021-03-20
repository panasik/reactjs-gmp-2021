import React, { useState } from 'react';
import FilmsContent from './content/film-content';
import Footer from './footer/footer';
import Container from '../general/container/container';
import PropTypes from "prop-types";
import { filmType } from "../../util/prop-types/film.type";
import './films-viewer.scss';

const ViewerHeader = React.lazy(() => import("./header/view-header/view-header"));
const FilmDetailsHeader = React.lazy(() => import("./header/film-details-header/film-details-header"));

FilmViewer.propTypes = {
    films: PropTypes.arrayOf(filmType).isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAddFilm: PropTypes.func.isRequired,
    onEditFilm: PropTypes.func.isRequired,
    onDeleteFilm: PropTypes.func.isRequired,
}

export default function FilmViewer(props) {
    const [activeFilm, setActiveFilm] = useState(null);
    const [searchStr, setSearchStr] = useState('');

    return (
        <>
            <div className='FilmsViewer'>
                <Container
                    header={
                        activeFilm ?
                            <FilmDetailsHeader
                                film={activeFilm}
                                onGoBack={() => setActiveFilm(null)} />
                            :
                            <ViewerHeader
                                updateSearchStr={setSearchStr}
                                onAddFilm={props.onAddFilm} />
                    }
                    footer={
                        <Footer />
                    }>
                    <FilmsContent
                        films={props.films}
                        genres={props.genres}
                        searchStr={searchStr}
                        updateActiveFilm={setActiveFilm}
                        onEditFilm={props.onEditFilm}
                        onDeleteFilm={props.onDeleteFilm}
                    />
                </Container>
            </div>
        </>
    );
}