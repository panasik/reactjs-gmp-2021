import React, {Suspense, useEffect, useState} from 'react';
import FilmViewer from "./film-viewer";
import PropTypes from 'prop-types';
import Loading from "../general/loading/loading";
import {usePrevState} from "../../util/hooks/prev-state";
import {connect} from "react-redux";
import {filmType} from "../../util/prop-types/film.type";
import {addFilm, loadFilms, updateFilm, deleteFilm} from "../../store/actions/films";

const AddEditFilmDialog = React.lazy(() => import("../film-dialog/add-edit-dialog/add-edit-dialog"));
const DeleteDialog = React.lazy(() => import("../film-dialog/delete-dialog/delete-dialog"));

function FilmViewerContainer({loadFilms, addFilm, updateFilm, deleteFilm, filmItems, filmViewer}) {
    const [isAddEditDialogOpen, setAddEditDialogOpen, wasAddEditDialogOpen] = usePrevState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen, wasDeleteDialogOpen] = usePrevState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);


    useEffect(() => {
        loadFilms(filmViewer);
    }, [loadFilms, filmViewer]);

    useEffect(() => {
        if ((wasAddEditDialogOpen && !isAddEditDialogOpen) ||
            (wasDeleteDialogOpen && !isDeleteDialogOpen)) {
                loadFilms(filmViewer);
        }
    }, [isAddEditDialogOpen, isDeleteDialogOpen, wasAddEditDialogOpen, wasDeleteDialogOpen, loadFilms, filmViewer]);


    const saveFilm = (film) => {
        if (selectedFilm) {
            setSelectedFilm(null);
            updateFilm(film);
        } else {
            addFilm(film);
        }
        loadFilms();
        setAddEditDialogOpen(false);
    };

    const deleteCurrFilm = (film) => {
        setSelectedFilm(null);
        deleteFilm(film);
        loadFilms(filmViewer);
        setDeleteDialogOpen(false);
    };

    const onAddFilm = () => {
        setSelectedFilm(null);
        setAddEditDialogOpen(true);
    };

    const onEditFilm = (film) => {
        setSelectedFilm(film);
        setAddEditDialogOpen(true);
    };

    const onDeleteFilm = (film) => {
        setSelectedFilm(film);
        setDeleteDialogOpen(true);
    };

    return (
        <>
            <FilmViewer
                onAddFilm={onAddFilm}
                onEditFilm={onEditFilm}
                onDeleteFilm={onDeleteFilm}
            />
            {
                isAddEditDialogOpen &&
                <Suspense fallback={<Loading />}>
                    <AddEditFilmDialog
                        film={selectedFilm}
                        genres={filmItems.genres || []}
                        onSave={saveFilm}
                        onClose={() => setAddEditDialogOpen(false)} />
                </Suspense>
            }
            {
                isDeleteDialogOpen &&
                <Suspense fallback={<Loading />}>
                    <DeleteDialog
                        film={selectedFilm}
                        onDelete={deleteCurrFilm}
                        onClose={() => setDeleteDialogOpen(false)} />
                </Suspense>
            }
        </>
    );
}

FilmViewerContainer.propTypes = {
    loadFilms: PropTypes.func.isRequired,
    addFilm: PropTypes.func.isRequired,
    updateFilm: PropTypes.func.isRequired,
    deleteFilm: PropTypes.func.isRequired,
    filmViewer: PropTypes.shape()
};

function mapStateToProps(state) {
    const {filmItems, filmViewer} = state;

    return {filmItems, filmViewer};
}

function mapDispatchToProps(dispatch) {
    return {
        loadFilms: params => dispatch(loadFilms(params)),
        addFilm: film => dispatch(addFilm(film)),
        updateFilm: film => dispatch(updateFilm(film)),
        deleteFilm: film => dispatch(deleteFilm(film))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmViewerContainer);