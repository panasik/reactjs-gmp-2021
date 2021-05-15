import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './dropdown.scss';
import '../styles/button.scss';
import MenuContainer, { menuItemType } from '../menu-container/menu-container';
import useToggle from '../../../util/hooks/toggle';

function Dropdown(props) {
  const [isOpen, setOpen] = useToggle();
  const {
    selected, onItemSelected, hideTriangle, items,
  } = props;

  const title = useMemo(
    () => (selected && selected.title) || 'Select Option',
    [selected],
  );

  const itemSelected = (el) => {
    setOpen();
    onItemSelected(el);
  };
  return (
    <div className="dropdown-container">
      <div
        className={`DropdownButton ${
          hideTriangle && 'DropdownButtonTriangle'
        }`}
        onClick={() => setOpen()}
      >
        {title}
      </div>
      {isOpen && (
        <MenuContainer
          items={items}
          onItemSelected={itemSelected}
        />
      )}
    </div>
  );
}

Dropdown.propTypes = {
  items: PropTypes.arrayOf(menuItemType).isRequired,
  selected: menuItemType,
  hideTriangle: PropTypes.bool,
  onItemSelected: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  selected: [],
  hideTriangle: false,
};

export default Dropdown;
