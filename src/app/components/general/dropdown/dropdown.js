import React, {useState} from 'react';
import './dropdown.scss';
import '../../general/styles/button.scss';
import MenuContainer, {menuItemType} from '../menu-container/menu-container';
import PropTypes from 'prop-types';

Dropdown.propTypes = {
    items: PropTypes.arrayOf(menuItemType).isRequired,
    selected: menuItemType,
    onItemSelected: PropTypes.func.isRequired
}

function Dropdown(props) {
    const [isOpen, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] =
        useState(props.selected || props.items[0]);

    const onItemSelected = (el) => {
        console.log('Filter by ', el.title);
        setSelectedItem(el);
        setOpen(false);
        props.onItemSelected(el);
    }
    return (
        <div className='dropdown-container'>
            <div
                className='dropdown-button'
                onClick={() => setOpen(!isOpen)}>
                {selectedItem.title}
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

export default Dropdown;
