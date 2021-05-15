import React, { useMemo, useState } from 'react';
import './tabs.scss';
import PropTypes from 'prop-types';

function Tabs(props) {
  const tabsNode = React.createRef();
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const {
    tabs, activeTab, onTabClicked, right, children,
  } = props;
  const total = tabs.length;

  const visibleTabs = useMemo(
    () => tabs.slice(offset, offset + limit),
    [tabs, offset, limit],
  );
  const isLastPart = useMemo(
    () => offset + limit === total,
    [total, offset, limit],
  );

  return (
    <>
      <div className="tabs-header-container">
        <div className="tabs-container" ref={tabsNode}>
          <>
            {offset > 0 && (
              <span
                id="leftArr"
                className="arrow"
                onClick={() => setOffset(offset - 1)}
              />
            )}

            {visibleTabs.map((el) => (
              <div
                key={el}
                className={`tab ${el === activeTab ? 'Active' : ''}`}
                onClick={() => onTabClicked(el)}
              >
                {el}
              </div>
            ))}
            {!isLastPart && (
              <span
                id="rightArr"
                className="arrow"
                onClick={() => setOffset(offset + 1)}
              />
            )}
          </>
        </div>
        {right && <div className="right-side">{right}</div>}
      </div>
      <div className="tabs-content-container">{children}</div>
    </>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.string,
  right: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onTabClicked: PropTypes.func.isRequired,
};

Tabs.defaultProps = {
  activeTab: '',
  right: null,
};

export default Tabs;
