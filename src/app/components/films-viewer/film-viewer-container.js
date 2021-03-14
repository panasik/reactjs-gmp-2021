import React, { Suspense, useEffect, useState } from 'react';
import FilmViewer from "./film-viewer";
import { allFilms, genres as allGenres } from "../../mockData/films-data";
import Loading from "../general/loading/loading";
import { usePrevState } from "../../util/hooks/prev-state";

const AddEditFilmDialog = React.lazy(() => import("../film-dialog/add-edit-dialog/add-edit-dialog"));
const DeleteDialog = React.lazy(() => import("../film-dialog/delete-dialog/delete-dialog"));

export default function FilmViewerContainer() {
    const [isAddEditDialogOpen, setAddEditDialogOpen, wasAddEditDialogOpen] = usePrevState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen, wasDeleteDialogOpen] = usePrevState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [genres, setGenres] = useState([]);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        setTimeout(() => setGenres([...allGenres]), 1000);
        setTimeout(() => setFilms([...allFilms]), 1000);
    }, []);

    useEffect(() => {
        if ((wasAddEditDialogOpen && !isAddEditDialogOpen) ||
            (wasDeleteDialogOpen && !isDeleteDialogOpen)) {
            // data loading
            setTimeout(() => setFilms([...allFilms]), 2000);
        }
    }, [isAddEditDialogOpen, isDeleteDialogOpen]);


    const saveFilm = (film) => {
        if (selectedFilm) {
            setSelectedFilm(null);
            allFilms.splice(allFilms.findIndex(item => item.id === film.id), 1, film);
        } else {
            allFilms.push({
                ...film,
                id: allFilms.reduce((acc, cur) => acc < cur.id ? cur.id : acc, 0) + 1
            })
        }
        setAddEditDialogOpen(false);
    }

    const deleteFilm = (film) => {
        setSelectedFilm(null);
        allFilms.splice(allFilms.findIndex(item => item.id === film.id), 1);
        setDeleteDialogOpen(false);
    }

    const onAddFilm = () => {
        setSelectedFilm(null);
        setAddEditDialogOpen(true);
    }

    const onEditFilm = (film) => {
        setSelectedFilm(film);
        setAddEditDialogOpen(true);
    }

    const onDeleteFilm = (film) => {
        setSelectedFilm(film);
        setDeleteDialogOpen(true);
    }

    return (
        <>
            <FilmViewer
                films={films}
                genres={genres}
                onAddFilm={onAddFilm}
                onEditFilm={onEditFilm}
                onDeleteFilm={onDeleteFilm}
            />
            {
                isAddEditDialogOpen &&
                <Suspense fallback={<Loading />}>
                    <AddEditFilmDialog
                        film={selectedFilm}
                        genres={genres}
                        onSave={saveFilm}
                        onClose={() => setAddEditDialogOpen(false)} />
                </Suspense>
            }
            {
                isDeleteDialogOpen &&
                <Suspense fallback={<Loading />}>
                    <DeleteDialog
                        film={selectedFilm}
                        onDelete={deleteFilm}
                        onClose={() => setDeleteDialogOpen(false)} />
                </Suspense>
            }
        </>
    );
}