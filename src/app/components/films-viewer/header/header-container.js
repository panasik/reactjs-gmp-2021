import Logo from '../../general/logo/logo';
import React from 'react';
import './header-container.scss';
import '../../general/styles/button.scss';
import img from '../../../res/img/netflex-background.jpg';
import {useDispatch, useSelector} from "react-redux";
import {selectFilmDetails} from "../../../store/selectors/film-details.selector";
import {setAddEditDialogOpen, setFilmDetails, setSearchString} from "../../../store/slices";


const ViewerHeader = React.lazy(() => import("./view-header/view-header"));
const FilmDetailsHeader = React.lazy(() => import("./film-details-header/film-details-header"));

export default function HeaderContainer() {
    const filmDetails = useSelector(selectFilmDetails);
    const dispatch = useDispatch();

    return (
        <div className='HeaderContainer' style={{height: (!filmDetails ? '300px' : '100%')}}>
            <img
                src={img}
                alt='header'
                className='HeaderBackground' />
            <div className='HeaderContent'>
                <Logo />
                {
                    filmDetails ?
                    <FilmDetailsHeader
                        film={filmDetails}
                        onGoBack={() => dispatch(setFilmDetails(null))}/>
                    :
                    <ViewerHeader
                        updateSearchStr={str => dispatch(setSearchString(str))}
                        onAddFilm={() => dispatch(setAddEditDialogOpen(true))}/>
                }
            </div>
        </div>
    );
}