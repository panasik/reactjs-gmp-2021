import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import {
  deleteFilm,
  loadFilms,
  setConfirmationDialog,
  setResultPopup,
  setSelectedFilm,
  selectDialogs,
  selectSelectedFilm,
} from '../../../store';
import ConfirmationDialog from '../../general/confimation-dialog/confirmation-dialog';

export default function DeleteDialog() {
  const selectedFilm = useSelector(selectSelectedFilm);
  const dialogs = useSelector(selectDialogs);
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(
      deleteFilm(
        selectedFilm,
        (dis) => {
          dis(
            setResultPopup({
              title: 'Congratulations!',
              description: 'The movie has been deleted successfully',
              type: 'Success',
            }),
          );
          dis(loadFilms());
          dis(setSelectedFilm(null));
          dis(setConfirmationDialog(null));
        },
        (dis, err) => {
          dis(
            setResultPopup({
              title: 'Oops!',
              description: `Can't delete movie. ${err}`,
              type: 'Failure',
            }),
          );
          dis(setSelectedFilm(null));
          dis(setConfirmationDialog(null));
        },
      ),
    );
  };

  return (
    <ConfirmationDialog
      title={dialogs.confirmationDialog.title}
      description={dialogs.confirmationDialog.description}
      onConfirm={onDelete}
      onClose={() => dispatch(setConfirmationDialog(null))}
    />
  );
}
