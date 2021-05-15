import React from 'react';
import './context-menu.scss';
import PropTypes from 'prop-types';
import MenuContainer, { menuItemType } from '../menu-container/menu-container';
import useToggle from '../../../util/hooks/toggle';

function ContextMenu({
  items, onItemSelected,
}) {
  const [isMenuOpen, setMenuOpen] = useToggle(false);

  const itemSelected = (el) => {
    setMenuOpen();
    onItemSelected(el);
  };

  return (
    <>
      {!isMenuOpen && (
        <div
          className="context-menu-container "
          onClick={() => setMenuOpen()}
        />
      )}
      {isMenuOpen && (
        <MenuContainer
          closable
          items={items}
          onClick={() => setMenuOpen()}
          onItemSelected={itemSelected}
        />
      )}
    </>
  );
}

ContextMenu.propTypes = {
  items: PropTypes.arrayOf(menuItemType).isRequired,
  onItemSelected: PropTypes.func.isRequired,
};

export default ContextMenu;
