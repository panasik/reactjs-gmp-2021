import React, {useState} from 'react';
import './menu-container.scss';
import PropTypes from 'prop-types';

export const menuItemType = PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
});

MenuContainer.propTypes = {
    items: PropTypes.arrayOf(menuItemType).isRequired,
    closable: PropTypes.bool,
    onItemSelected: PropTypes.func.isRequired
}

export default function MenuContainer(props) {
    const [items] = useState(props.items);
    const [displayClose] = useState(props.closable);

    return (
        <div className='menu-container'>
            {
                displayClose &&
                <span
                    className='menu-container-close'
                    onClick={props.onClose}>x</span>
            }
            {
                items.map(item =>
                    <span
                        className='menu-item-container'
                        key={item.id}
                        onClick={() => props.onItemSelected(item)}>
                            {item.title}
                    </span>
                )
            }
        </div>
    );
}
