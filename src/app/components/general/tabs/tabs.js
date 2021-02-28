import React, {useState} from 'react';
import './tabs.scss';
import PropTypes from 'prop-types';

export const tabItemType = PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    active: PropTypes.bool
});

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(tabItemType).isRequired,
    right: PropTypes.node,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onTabClicked: PropTypes.func.isRequired
}

function Tabs(props) {
    if (props.tabs.every(el => !el.active)) {
        props.tabs[0].active = true;
    }

    const [tabs, setTabs] = useState(props.tabs);

    const onTabClick = (el) => {
        const cur = tabs.find(e => e.active);
        cur.active = false;
        el.active = true;
        setTabs([...tabs]);
        props.onTabClicked(el);
    }
    return (
        <>
            <div className='tabs-header-container'>
                <div className='tabs-container'>
                    {
                        props.tabs.map(el =>
                            <div
                                key={el.id}
                                className={`tab ${el.active ? 'Active' : ''}`}
                                onClick={() => onTabClick(el)}>
                                {el.title}
                            </div>
                        )
                    }
                </div>
                {
                    props.right &&
                    <div className='right-side'>
                        {props.right}
                    </div>
                }
            </div>
            <div className='tabs-content-container'>
                {props.children}
            </div>
        </>
    );
}

export default Tabs;
