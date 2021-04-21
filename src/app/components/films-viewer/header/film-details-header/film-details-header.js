import React, {useEffect} from 'react';
import './film-details-header.scss';
import '../../../general/styles/button.scss';
import noImage from "../../../../res/img/no-image.png";
import Loading from "../../../general/loading/loading";
import {loadFilmDetails} from "../../../../store/slices";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectFilmDetails} from "../../../../store/selectors/film-details.selector";
import HeaderContainer from "../../../general/header-container/header-container";


export default function FilmDetailsHeader() {
    const {filmId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const filmDetails = useSelector(selectFilmDetails);
    const getRateColor = () => {
        if (filmDetails) {
            if (filmDetails.vote_average >= 7) return 'Good';
            if (filmDetails.vote_average >= 4) return 'Normal';
            return 'Bad';
        }
    };

    useEffect(() => {
        dispatch(loadFilmDetails(filmId, () => {} , () => {
            history.push("/page-not-found");
        }));
    }, [dispatch, filmId, history]);

    const goBack = () => {
        history.push({
            pathname: `/films`,
            search: location.search
        });
    };

    return (
        <HeaderContainer>
            <div className='FilmDetailsBack button-header'
                onClick={goBack}>Back
            </div>
            <div className='FilmDetailsContainer'>
                {
                    filmDetails ?
                        <> <img className='FilmDetailsImage'
                            src={filmDetails.poster_path || noImage}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = noImage;
                            }}
                            alt='film-logo' />
                            <div className="FilmDetails">
                                <div className='FilmTitleContainer'>
                                    <div className="FilmTitle">{filmDetails.title}</div>
                                    <div className={"FilmRate " + getRateColor()}>{filmDetails.vote_average?.toFixed(1) || 0}</div>
                                </div>
                                <div className='FilmGenres'>{Array.isArray(filmDetails.genres) ? filmDetails.genres.join(', ') : ''}</div>
                                <div className="FilmData">
                                    <div className="FilmReleaseDate">{(new Date(filmDetails.release_date)).getFullYear()}</div>
                                    <div className="FilmRuntime">{filmDetails.runtime && filmDetails.runtime + ' min'}</div>
                                </div>
                                <div className="FilmOverview">{filmDetails.overview}</div>
                            </div>
                        </>
                        : <Loading />
                }
            </div>
        </HeaderContainer>
    );
}