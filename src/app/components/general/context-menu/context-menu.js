import React, {useState} from 'react';
import './context-menu.scss';
import PropTypes from 'prop-types';
import MenuContainer, {menuItemType} from '../menu-container/menu-container';

ContextMenu.propTypes = {
    items: PropTypes.arrayOf(menuItemType).isRequired,
    children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired,
    onItemSelected: PropTypes.func.isRequired
}

function ContextMenu(props) {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [displayMenuIcon, setDisplayMenuIcon] = useState(false);

    const onItemSelected = (el) => {
        setMenuOpen(false);
        props.onItemSelected(el);
    }

    return (<>
        {
          displayMenuIcon && !isMenuOpen &&
          <div className='context-menu-container '
                          onClick={() => setMenuOpen(!isMenuOpen)}>
          </div>
        }
        {
          props.children &&
          React.cloneElement(props.children, {onClick: () => setDisplayMenuIcon(!displayMenuIcon)})
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