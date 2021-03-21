import React, {useMemo, useState} from 'react';
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
};

function Tabs(props) {
    const tabsNode = React.createRef();
    const [offset, setOffset] = useState(0);
    const [limit] = useState(10);
    let total = props.tabs.length;

    const visibleTabs = useMemo(() => props.tabs.slice(offset, offset + limit), [props.tabs, offset, limit]);
    const isLastPart = useMemo(() => offset + limit === total, [total, offset, limit]);

    return (
        <>
            <div className='tabs-header-container'>
                <div className='tabs-container' ref={tabsNode}>
                    {
                        <>
                            {offset > 0 && <span id="leftArr"
                                className="arrow"
                                onClick={() => setOffset(offset - 1)} />}

                            {
                                visibleTabs.map(el =>
                                    <div
                                        key={el}
                                        className={`tab ${el === props.activeTab ? 'Active' : ''}`}
                                        onClick={() => props.onTabClicked(el)}>
                                        {el}
                                    </div>
                                )}
                            {!isLastPart && <span id="rightArr"
                                className="arrow"
                                onClick={() => setOffset(offset + 1)} />}
                        </>
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
