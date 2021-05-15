import React from 'react';
import './menu-container.scss';
import PropTypes from 'prop-types';
import Panel from '../panel/panel';

export const menuItemType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool,
});

function MenuContainer(props) {
  const {
    closable, onClick, onItemSelected, items,
  } = props;
  return (
    <Panel closable={closable} onClose={onClick}>
      {items.map((item) => (
        <span
          className="menu-item-container"
          key={item.id}
          onClick={() => onItemSelected(item)}
        >
          {item.title}
        </span>
      ))}
    </Panel>
  );
}

MenuContainer.propTypes = {
  items: PropTypes.arrayOf(menuItemType).isRequired,
  closable: PropTypes.bool,
  onClick: PropTypes.func,
  onItemSelected: PropTypes.func.isRequired,
};

MenuContainer.defaultProps = {
  closable: false,
  onClick: () => console.error("MenuContainer props onClose isn't provided"),
};

export default MenuContainer;
