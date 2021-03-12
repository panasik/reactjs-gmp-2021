import React, {useState} from 'react';
import './dropdown.scss';
import '../../general/styles/button.scss';
import MenuContainer, {menuItemType} from '../menu-container/menu-container';
import PropTypes from 'prop-types';


function Dropdown(props) {
    const [isOpen, setOpen] = useState(false);

    const onItemSelected = (el) => {
        setOpen(false);
        props.onItemSelected(el);
    }
    return (
        <div className='dropdown-container'>
            <div
                className='dropdown-button'
                onClick={() => setOpen(!isOpen)}>
                {props.selected && props.selected.title || 'Select Option'}
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
