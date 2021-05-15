import React, { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../general/loading/loading';
import { selectDialogs, setResultPopup } from '../../../store';
import AddEditFilmDialog from './add-edit-dialog/add-edit-film-dialog';
import DeleteDialog from './delete-dialog';
import ResultPopup from '../../general/result-popup/result-popup';

// PATTERN: Conditional rendering
export default function FilmDialogContainer() {
  const dialogs = useSelector(selectDialogs);
  const dispatch = useDispatch();

  return (
    <>
      {dialogs.isAddEditDialogOpen && (
        <Suspense fallback={<Loading />}>
          <AddEditFilmDialog />
        </Suspense>
      )}
      {!!dialogs.resultPopup && (
        <Suspense fallback={<Loading />}>
          <ResultPopup
            title={dialogs.resultPopup.title}
            description={dialogs.resultPopup.description}
            type={dialogs.resultPopup.type}
            onClose={() => dispatch(setResultPopup(null))}
          />
        </Suspense>
      )}
      {!!dialogs.confirmationDialog && (
        <Suspense fallback={<Loading />}>
          <DeleteDialog />
        </Suspense>
      )}
    </>
  );
}
