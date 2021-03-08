import React from 'react';
import './tabs.scss';
import PropTypes from 'prop-types';

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeTab: PropTypes.string,
    right: PropTypes.node,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onTabClicked: PropTypes.func.isRequired
}

function Tabs(props) {
    return (
        <>
            <div className='tabs-header-container'>
                <div className='tabs-container'>
                    {
                        props.tabs.map(el =>
                            <div
                                key={el}
                                className={`tab ${el ===props.activeTab ? 'Active' : ''}`}
                                onClick={() => props.onTabClicked(el)}>
                                {el}
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
