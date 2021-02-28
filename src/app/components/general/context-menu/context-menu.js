import React, {useState} from 'react';
import './context-menu.scss';
import PropTypes from 'prop-types';
import MenuContainer, {menuItemType} from '../menu-container/menu-container';

ContextMenu.propTypes = {
    items: PropTypes.arrayOf(menuItemType).isRequired,
    onItemSelected: PropTypes.func.isRequired
}

function ContextMenu(props) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const onItemSelected = (el) => {
        setMenuOpen(false);
        props.onItemSelected(el);
    }

    return (<>
        { !isMenuOpen &&
        <div className='context-menu-container'
            onClick={() => setMenuOpen(!isMenuOpen)}>
        </div>
        }
        {
            isMenuOpen &&
            <MenuContainer
                closable={true}
                items={props.items}
                onClose={() => setMenuOpen(!isMenuOpen)}
                onItemSelected={onItemSelected}>
            </MenuContainer>
        }
    </>);
}

export default ContextMenu;