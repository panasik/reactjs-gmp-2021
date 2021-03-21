import React from 'react';
import FilmsContent from './content/film-content';
import Footer from './footer/footer';
import Container from '../general/container/container';
import PropTypes from "prop-types";
import {filmType} from "../../util/prop-types/film.type";
import './films-viewer.scss';
import {connect} from "react-redux";
import {setActiveFilm, setActiveGenre, setSearchString, setSortOrder, setSortType} from "../../store/actions";

const ViewerHeader = React.lazy(() => import("./header/view-header/view-header"));
const FilmDetailsHeader = React.lazy(() => import("./header/film-details-header/film-details-header"));

FilmViewer.propTypes = {
    films: PropTypes.arrayOf(filmType).isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    filmViewer: PropTypes.shape(),
    onAddFilm: PropTypes.func.isRequired,
    onEditFilm: PropTypes.func.isRequired,
    onDeleteFilm: PropTypes.func.isRequired,
    updateActiveFilm: PropTypes.func.isRequired,
    updateSearchStr: PropTypes.func.isRequired,
    updateActiveGenre: PropTypes.func.isRequired,
    updateSortType: PropTypes.func.isRequired,
    updateSortOrder: PropTypes.func.isRequired
};

function FilmViewer(props) {

    return (
        <>
            <div className='FilmsViewer'>
                <Container
                    header={
                        props.filmViewer.activeFilm ?
                            <FilmDetailsHeader
                            film={props.filmViewer.activeFilm}
                            onGoBack={() => props.updateActiveFilm(null)} />
                            :
                            <ViewerHeader
                                updateSearchStr={str => props.updateSearchStr(str, props.filmViewer)}
                                onAddFilm={props.onAddFilm} />
                    }
                    footer={
                        <Footer />
                    }>
                    <FilmsContent
                        films={props.films}
                        genres={props.genres}
                        activeGenre={props.filmViewer.activeGenre}
                        sortType={props.filmViewer.sortType}
                        sortOrder={props.filmViewer.sortOrder}
                        searchStr={props.filmViewer.searchString}
                        updateActiveFilm={props.updateActiveFilm}
                        updateActiveGenre={genre => props.updateActiveGenre(genre, props.filmViewer)}
                        updateSortType={sortType => props.updateSortType(sortType, props.filmViewer)}
                        updateSortOrder={sortOrder => props.updateSortOrder(sortOrder, props.filmViewer)}
                        onEditFilm={props.onEditFilm}
                        onDeleteFilm={props.onDeleteFilm}
                    />
                </Container>
            </div>
        </>
    );
}

function mapStateToProps(state) {
    const {films, filmViewer, genres} = state;

    return {films, filmViewer, genres};
}

function mapDispatchToProps(dispatch) {
    return {
        updateActiveFilm: film => dispatch(setActiveFilm(film)),
        updateSearchStr: (str, params) => dispatch(setSearchString(str, params || {})),
        updateActiveGenre: (genre, params) => dispatch(setActiveGenre(genre, params || {})),
        updateSortType: (sortType, params) => dispatch(setSortType(sortType, params || {})),
        updateSortOrder: (sortOrder, params) => dispatch(setSortOrder(sortOrder, params || {})),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmViewer);