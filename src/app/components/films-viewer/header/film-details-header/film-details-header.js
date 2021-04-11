import React from 'react';
import './film-details-header.scss';
import PropTypes from 'prop-types';
import '../../../general/styles/button.scss';
import {filmType} from "../../../../util/prop-types/film.type";
import noImage from "../../../../res/img/no-image.png";

FilmDetailsHeader.propTypes = {
    film: filmType.isRequired,
    onGoBack: PropTypes.func.isRequired
};

export default function FilmDetailsHeader(props) {
    const getRateColor = () => {
        if (props.film.vote_average >= 7) return 'Good';
        if (props.film.vote_average >= 4) return 'Normal';
        return 'Bad';
    };
    return (
        <>
            <div className='FilmDetailsBack button-header'
                onClick={() => props.onGoBack()}>Back
            </div>
            <div className='FilmDetailsContainer'>
                <img className='FilmDetailsImage'
                    src={props.film.poster_path || noImage}
                    onError={(e)=>{e.target.onerror = null; e.target.src = noImage;}}
                    alt='film-logo' />
                <div className="FilmDetails">
                    <div className='FilmTitleContainer'>
                        <div className="FilmTitle">{props.film.title}</div>
                        <div className={"FilmRate " + getRateColor()}>{props.film.vote_average?.toFixed(1) || 0}</div>
                    </div>
                    <div className='FilmGenres'>{Array.isArray(props.film.genres) ? props.film.genres.join(', ') : ''}</div>
                    <div className="FilmData">
                    <div className="FilmReleaseDate">{(new Date(props.film.release_date)).getFullYear()}</div>
                        <div className="FilmRuntime">{props.film.runtime && props.film.runtime + ' min'}</div>
                    </div>
                    <div className="FilmOverview">{props.film.overview}</div>
                </div>
            </div>
        </>
    );
}