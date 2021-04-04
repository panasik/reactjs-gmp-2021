import React from 'react';
import '../../general/styles/dialog.scss';
import '../../general/styles/button.scss';
import PropTypes from "prop-types";
import Dialog from "../../film-dialog/dialog/dialog";
import {filmType} from "../../../util/prop-types/film.type";


export default function ConfirmationDialog(props) {

    return (
    <Dialog onClose={() => props.onClose()}>
        <div className="DialogContainer">
            <div className='DialogTitle'>{props.title}</div>
            <div className="DialogDescription">
                {props.description}
            </div>
        </div>
        <div className="DialogActionContainer">
            <div key="Confirm" className="button" onClick={() => props.onConfirm()}>
                Confirm
            </div>
        </div>
    </Dialog>
);
    }

ConfirmationDialog.propTypes = {
    film: filmType,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};