import React, {useEffect} from 'react';
import '../../general/styles/button.scss';
import {useDispatch, useSelector} from "react-redux";
import {setAddEditDialogOpen, setSearchString, selectSearchParams, setActiveGenre, setSelectedFilm} from "../../../store";
import {Redirect, Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import ViewerHeader from './view-header/view-header';
import FilmDetailsHeader from './film-details-header/film-details-header';


export default function FilmsHeaderContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const genre = query.get("genre");
    const title = query.get("title");
    const searchParams = useSelector(selectSearchParams);
    const match = useRouteMatch();

    const updateSearchStr = str => {
        if (str) {
            history.push(`/films?title=${str}${genre ? '&genre=' + genre : ''}`);
        } else {
            dispatch(setSearchString(null));
            history.push(`/films${genre ? '?genre=' + genre : ''}`);
        }
    };

    useEffect(() => {
        if (title && genre === "all") {
            dispatch(setActiveGenre(null));
        } else if (title && genre) {
            dispatch(setActiveGenre(genre));
        }
        dispatch(setSearchString(title));
    }, [genre, title, dispatch]);


    const openAddDialog = () => {
        dispatch(setSelectedFilm(null));
        dispatch(setAddEditDialogOpen(true));
    };

    return (
        <Switch>
            <Route exact
                path={match.path}>
                    <ViewerHeader
                        searchString={searchParams.searchString}
                        updateSearchStr={updateSearchStr}
                        onAddFilm={openAddDialog}/>
            </Route>
            <Route exact path={`${match.path}/:filmId`}>
                    <FilmDetailsHeader/>
            </Route>
            <Route path="*"
                render={() => (
                    <Redirect to="/page-not-found"/>
                )}/>
        </Switch>
    );
}