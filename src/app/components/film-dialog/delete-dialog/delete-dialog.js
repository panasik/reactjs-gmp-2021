import React from 'react';
import '../../general/styles/dialog.scss';
import '../../general/styles/button.scss';
import PropTypes from "prop-types";
import Dialog from "../dialog/dialog";
import { filmType } from "../../../util/prop-types/film.type";


const DeleteDialog = (props) => (
    <Dialog onClose={() => props.onClose()}>
        <div className="DialogContainer">
            <div className='DialogTitle'>Delete Movie</div>
            <div className="DialogDescription">
                Are you sure you want to delete this movie?
            </div>
        </div>
        <div className="DialogActionContainer">
            <div key="Confirm" className="button" onClick={() => props.onDelete(props.film)}>
                Confirm
            </div>
        </div>
    </Dialog>
);

DeleteDialog.propTypes = {
    film: filmType,
    onDelete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

export default DeleteDialog;