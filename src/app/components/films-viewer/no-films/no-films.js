import React, {useEffect} from 'react';
import './no-films.scss';
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectFilms} from "../../../store/selectors";

export default function NoFilms({pathname}) {
    const history = useHistory();
    const films = useSelector(selectFilms);
    
    const getSelectedFilms = () => {
        let filmSelected = /films\/(\d*)(\/)*/.exec(pathname);
        let index = filmSelected && typeof(filmSelected[1]) === "string" && parseInt(filmSelected[1]) || 0;
        return films.find(film => film.id === index);
    }
    const selectedFilm = getSelectedFilms();


    useEffect(() => {
    
        if (films.length && selectedFilm){
            history.push('/films/' + selectedFilm.id + location.search);
        }else if(films.length) {
            history.push('/films' + location.search);
        }
    }, [history, location.search, films.length]);

    return (
        <>
            <div className="NoData">No films found</div>
        </>
    );
}