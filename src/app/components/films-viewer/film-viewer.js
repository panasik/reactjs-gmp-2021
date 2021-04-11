import React from 'react';
import FilmsContent from './content/film-content';
import Footer from './footer/footer';
import Container from '../general/container/container';
import './films-viewer.scss';
import HeaderContainer from "./header/header-container";
import FilmDialogContainer from "../film-dialog/dialog/film-dialog-container";


export default function FilmViewer() {

    return (
        <>
            <div className='FilmsViewer'>
                <Container
                    header={
                        <HeaderContainer/>
                    }
                    footer={
                        <Footer />
                    }>
                    <FilmsContent/>
                </Container>
            </div>

            <FilmDialogContainer/>
        </>
    );
}