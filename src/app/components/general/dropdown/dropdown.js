import React, { useMemo } from 'react';
import './dropdown.scss';
import '../../general/styles/button.scss';
import MenuContainer, { menuItemType } from '../menu-container/menu-container';
import PropTypes from 'prop-types';
import { useToggle } from "../../../util/hooks/toggle";

function Dropdown(props) {
    const [isOpen, setOpen] = useToggle();

    const title = useMemo(() => props.selected && props.selected.title || 'Select Option',
        [props.selected.title]);

    const onItemSelected = (el) => {
        setOpen();
        props.onItemSelected(el);
    }
    return (
        <div className='dropdown-container'>
            <div
                className='dropdown-button'
                onClick={() => setOpen()}>
                {title}
            </div>
            {
                isOpen &&
                <MenuContainer
                    items={props.items}
                    onItemSelected={onItemSelected}>
                </MenuContainer>
            }
        </div>
    );
}

Dropdown.propTypes = {
    items: PropTypes.arrayOf(menuItemType).isRequired,
    selected: menuItemType,
    onItemSelected: PropTypes.func.isRequired
}

export default Dropdown;
