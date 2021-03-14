import React from 'react';
import './menu-container.scss';
import PropTypes from 'prop-types';
import Panel from "../panel/panel";

export const menuItemType = PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    selected: PropTypes.bool
});

const MenuContainer = (props) => (
    <Panel closable={props.closable} onClose={props.onClick}>
        {
            props.items.map(item =>
                <span
                    className='menu-item-container'
                    key={item.id}
                    onClick={() => props.onItemSelected(item)}>
                    {item.title}
                </span>
            )
        }
    </Panel>
);

MenuContainer.propTypes = {
    items: PropTypes.arrayOf(menuItemType).isRequired,
    closable: PropTypes.bool,
    onClose: PropTypes.func,
    onItemSelected: PropTypes.func.isRequired
}

export default MenuContainer;
