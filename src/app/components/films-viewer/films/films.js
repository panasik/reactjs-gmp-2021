import React from 'react';
import FilmsList from './content/film-list';
import FilmDialogContainer from "../../film-dialog/dialog/film-dialog-container";


export default function Films() {

    return (
        <>
            <FilmsList/>

            <FilmDialogContainer/>
        </>
    );
}