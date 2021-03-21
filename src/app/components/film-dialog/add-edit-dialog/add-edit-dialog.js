import React, {useEffect, useState} from 'react';
import '../../general/styles/dialog.scss';
import '../../general/styles/button.scss';
import PropTypes from 'prop-types';
import Dialog from '../dialog/dialog';
import {filmType} from '../../../util/prop-types/film.type';
import FormItem from '../../general/form-item/form-item';

const filmFormItems = [{
    label: 'Movie id',
    type: 'Not-Editable',
    showOnlyOnEdit: true,
    filmField: 'id'
}, {
    label: 'Title',
    type: 'Text',
    filmField: 'title'
}, {
    label: 'Release Date',
    type: 'Date',
    filmField: 'release_date'
}, {
    label: 'Movie url',
    type: 'Text',
    filmField: 'poster_path'
}, {
    label: 'Genre',
    type: 'Dropdown',
    filmField: 'genres',
    available: []
}, {
    label: 'Overview',
    type: 'Text',
    filmField: 'overview'
}, {
    label: 'Runtime',
    type: 'Text',
    filmField: 'runtime'
}];

AddEditFilmDialog.propTypes = {
    film: filmType,
    genres: PropTypes.arrayOf(PropTypes.string),
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default function AddEditFilmDialog(props) {
    const isEditMode = !!props.film;
    const [formItems, setFormItems] = useState([]);


    useEffect(() => {
        let items = filmFormItems.map(el => ({...el}));
        items.find(el => el.filmField === 'genres').available = props.genres || [];
        if (!isEditMode) {
            items = items.filter(el => !el.showOnlyOnEdit);
        }
        setFormItems(items);
    }, [props.genres, props.film, isEditMode]);

    const calculateFormState = (film) => {
        const initState = {};
        filmFormItems.forEach(el => initState[el.filmField] = film ? film[el.filmField] : '');
        return initState;
    };

    const [formState, setFormState] = useState(calculateFormState());
    const [initialFormState, setInitialFormState] = useState(calculateFormState());

    useEffect(() => setFormState((state) => ({
        ...state,
        ...calculateFormState(props.film)
    })), [props.film]);

    useEffect(() => setInitialFormState((state) => ({
        ...state,
        ...calculateFormState(props.film)
    })), [props.film]);

    const updateStateField = (fieldName, value) =>
        setFormState({...formState, [fieldName]: value});

    const resetForm = () => {
        setFormState(initialFormState);
    };

    const save = () => {
        const newFilm = {...props.film};
        filmFormItems.forEach(el => {
            newFilm[el.filmField] = formState[el.filmField];
        });
        newFilm.runtime = +newFilm.runtime;
        props.onSave(newFilm);
    };

    return (
        <Dialog onClose={() => props.onClose()}>
            <div className="DialogContainer">
                <div className='DialogTitle'>
                    {isEditMode ? 'Edit Movie' : 'Add Movie'}
                </div>
                {
                    formItems.map(item =>
                        <FormItem
                            key={item.label}
                            label={item.label}
                            type={item.type}
                            value={formState[item.filmField]}
                            available={item.available}
                            updateValue={value => updateStateField(item.filmField, value)} />
                    )
                }
            </div>
            <div className="DialogActionContainer">
                <div key='reset'
                    tabIndex={0}
                    className='button'
                    onClick={resetForm}>
                    Reset
                </div>
                <div key='save'
                    tabIndex={0}
                    className='button'
                    onClick={save}>
                    {isEditMode ? 'Save' : 'Submit'}
                </div>
            </div>
        </Dialog>
    );
}