import React from 'react';
import '../../../general/styles/dialog.scss';
import '../../../general/styles/button.scss';
import '../../../general/styles/form.scss';
import PropTypes from "prop-types";
import {filmType} from "../../../../util/prop-types/film.type";
import * as Yup from 'yup';
import {Field, Form, withFormik} from "formik";
import DropdownSelector from "../../../../components/general/dropdown-selector/dropdown-selector";
import FormItem from "../../../../components/general/form-item/form-item";

const FilmSchema = Yup.object().shape({
    id: Yup.string(),
    title: Yup.string()
        .required('Please enter title'),
    release_date: Yup.date()
        .required('Please select release date'),
    poster_path: Yup.string()
        .url('Invalid url')
        .required('Please enter URL to movie poster'),
    genres: Yup.array()
        .of(Yup.string())
        .required('Please select at least one genre'),
    overview: Yup.string()
        .required('Please enter overview'),
    runtime: Yup.number()
        .min(1, 'Runtime can\'t be less than 0')
        .required('Please enter runtime in minutes'),
});

AddEditFilmForm.propTypes = {
    film: filmType,
    genres: PropTypes.arrayOf(PropTypes.string),
    onSave: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired
};

function AddEditFilmForm({film, genres, setFieldValue, handleReset}) {
    const isEditMode = film && film.id;

    return (
        <Form>
            <div className="DialogContainer">
                <div className='DialogTitle'>
                    {isEditMode ? 'Edit Movie' : 'Add Movie'}
                </div>

                {isEditMode &&
                <Field name="id">
                    {({field}) => (
                        <label className='FormItemLabel'>Movie ID
                            <div className="NotEditableFormItem">{field.value}</div>
                        </label>
                    )}
                </Field>
                }

                <FormItem
                    name="title"
                    label="Title"
                    type='text'>
                </FormItem>

                <FormItem
                    name="release_date"
                    label="Release Date"
                    type='date'>
                </FormItem>

                <FormItem
                    name="poster_path"
                    label="Movie Poster URL"
                    type='text'>
                </FormItem>

                <Field name='genres'>
                    {({field, meta,}) => (<>
                            <label className='FormItemLabel'>Genres
                            </label>
                            <DropdownSelector
                                defaultTitle='Select Genres'
                                markInvalid={!!meta.error}
                                available={genres || []}
                                onSelect={(items) => setFieldValue('genres', items)}
                                {...field}/>

                            {meta.error && (
                                <div className="InputError">{meta.error}</div>
                            )}
                        </>
                    )}
                </Field>

                <FormItem
                    name="overview"
                    label="Overview"
                    type='text'>
                </FormItem>

                <FormItem
                    name="runtime"
                    label="Runtime"
                    type='text'>
                </FormItem>

            </div>
            <div className="DialogActionContainer">
                <div key='reset'
                    tabIndex={0}
                    className='ActionButton'
                    onClick={handleReset}>
                    Reset
                </div>
                <button type="submit"
                    tabIndex={0}
                    className='PrimaryButton'>
                    {isEditMode ? 'Save' : 'Submit'}
                </button>
            </div>
        </Form>
    );
}

const AddEditFilmFormikWrapper = withFormik({

    validationSchema: FilmSchema,
    validateOnChange: false,
    validateOnBlur: false,

    mapPropsToValues: ({film}) => {
        if (!film) {
            return {title: '', release_date: '', poster_path: '', genres: [], overview: '', runtime: ''};
        }
        return {
            id: film.id,
            title: film.title || '',
            release_date: film.release_date || '',
            poster_path: film.poster_path || '',
            genres: film.genres || [],
            overview: film.overview || '',
            runtime: film.runtime || ''
        };
    },

    handleSubmit: (values, {props}) =>
        props.onSave({
            ...values,
            runtime: +values.runtime,
            vote_average: values.vote_average || 0
        }),
    handleReset: (values, {film}) => { 
        values = film;
    }
})(AddEditFilmForm);

export default AddEditFilmFormikWrapper;