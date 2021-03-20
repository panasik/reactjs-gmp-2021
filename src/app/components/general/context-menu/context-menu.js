import React from 'react';
import './context-menu.scss';
import PropTypes from 'prop-types';
import MenuContainer, {menuItemType} from '../menu-container/menu-container';
import {useToggle} from "../../../util/hooks/toggle";

ContextMenu.propTypes = {
    items: PropTypes.arrayOf(menuItemType).isRequired,
    onItemSelected: PropTypes.func.isRequired
}

function ContextMenu(props) {
    const [isMenuOpen, setMenuOpen] = useToggle(false);

    const onItemSelected = (el) => {
        setMenuOpen();
        props.onItemSelected(el);
    }

    return (<>
        {
          !isMenuOpen &&
          <div className='context-menu-container '
                onClick={() => setMenuOpen()}>
          </div>
        }
        {
            isMenuOpen &&
            <MenuContainer
                closable={true}
                items={props.items}
                onClick={() => setMenuOpen()}
                onItemSelected={onItemSelected}>
            </MenuContainer>
        }
    </>);
}

export default ContextMenu;