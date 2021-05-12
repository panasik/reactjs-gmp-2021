import React, {Suspense} from 'react';
import Loading from "../../../components/general/loading/loading";
import {useDispatch, useSelector} from "react-redux";
import {selectDialogs, setResultPopup} from "../../../store";
import AddEditFilmDialog from "./add-edit-dialog/add-edit-film-dialog";
import DeleteDialog from "./delete-dialog";
import ResultPopup from "../../../components/general/result-popup/result-popup";

export default function FilmDialogContainer() {

    const dialogs = useSelector(selectDialogs);
    const dispatch = useDispatch();

    return (<>
            {
                dialogs.isAddEditDialogOpen &&
                <Suspense fallback={<Loading/>}>
                    <AddEditFilmDialog/>
                </Suspense>
            }
            {
                !!dialogs.resultPopup &&
                <Suspense fallback={<Loading/>}>
                    <ResultPopup
                        title={dialogs.resultPopup.title}
                        description={dialogs.resultPopup.description}
                        type={dialogs.resultPopup.type}
                        onClose={() => dispatch(setResultPopup(null))}/>
                </Suspense>
            }
            {
                !!dialogs.confirmationDialog &&
                <Suspense fallback={<Loading/>}>
                    <DeleteDialog/>
                </Suspense>
            }
        </>
    );
}