import React from 'react';
import Header from './header/header';
import FilmsContent from './content/film-content';
import Footer from './footer/footer';
import Container from '../general/container/container';
import PropTypes from "prop-types";
import {filmType} from "./content/film-item/film-item";
import {menuItemType} from "../general/menu-container/menu-container";
import './films-viewer.scss';

FilmViewer.propTypes = {
    films: PropTypes.arrayOf(filmType),
    activeSortItem: menuItemType,
    sortItems: PropTypes.arrayOf(menuItemType),
    activeTab: PropTypes.string,
    tabs: PropTypes.arrayOf(PropTypes.string),

    updateSearchStr: PropTypes.func.isRequired,
    updateActiveSortItem: PropTypes.func.isRequired,
    updateActiveTab: PropTypes.func.isRequired,
    onAddFilm: PropTypes.func.isRequired,
    onEditFilm: PropTypes.func.isRequired,
    onDeleteFilm: PropTypes.func.isRequired,
}

export default function FilmViewer(props) {

    return (
        <>
            <div className='FilmsViewer'>
                <Container
                    header={
                        <Header
                            updateSearchStr={props.updateSearchStr}
                            onAddFilm={props.onAddFilm}/>
                    }
                    footer={
                        <Footer/>
                    }>
                    <FilmsContent
                        films={props.films}
                        activeTab={props.activeTab}
                        activeSortItem={props.activeSortItem}
                        sortItems={props.sortItems}
                        tabs={props.tabs}
                        updateActiveSortItem={props.updateActiveSortItem}
                        updateActiveTab={props.updateActiveTab}
                        onEditFilm={props.onEditFilm}
                        onDeleteFilm={props.onDeleteFilm}
                    />
                </Container>
            </div>
        </>
    );
}