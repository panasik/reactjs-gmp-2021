import React, {useMemo} from 'react';
import './dropdown-selector.scss';
import '../../general/styles/button.scss';
import PropTypes from 'prop-types';
import Checkbox from "../checkbox/checkbox";
import Panel from "../panel/panel";
import {useToggle} from "../../../util/hooks/toggle";


DropdownSelector.propTypes = {
    defaultTitle: PropTypes.string,
    selected: PropTypes.arrayOf(PropTypes.string),
    available: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect: PropTypes.func.isRequired
};

export default function DropdownSelector(props) {
    const [isOpen, setOpen] = useToggle(false);

    let allItems = useMemo(() => {
        const items = props.available.map(el => ({title: el}));
        if (Array.isArray(props.selected) && props.selected.length) {
            items.forEach(el => {
                    el.checked = props.selected.includes(el.title);
                }
            );
        }
        return items;
    }, [props.available, props.selected]);

    const selectedTitles = useMemo(() =>
            allItems.filter(el => el.checked).map(el => el.title),
        [allItems]);

        const title = useMemo(() =>
        selectedTitles.length ? selectedTitles.join(', ') : props.defaultTitle,
    [selectedTitles, props.defaultTitle]);

    const onCheck = (el, state) => {
        const selected = [...selectedTitles];
        if (state){
            selected.push(el.title);
        } else {
            selected.splice(selected.indexOf(el.title), 1);
        }
        props.onSelect(selected);
    };
    return (
        <>
            <div className="DropdownSelector">
                <div
                    tabIndex={0}
                    className='Input FormItemInput DropdownButtonTriangle DropdownSelectorButton'
                    onKeyDown={event => event.key === "Enter" &&  setOpen()}
                    onClick={() => setOpen()}>
                    {title}
                </div>
                {
                    isOpen &&
                    <Panel>
                        {allItems.map(el =>
                            <Checkbox
                                key={el.title}
                                title={el.title}
                                checked={!!el.checked}
                                onCheck={isChecked => onCheck(el, isChecked)}/>)
                        }
                    </Panel>
                }
            </div>
        </>
    );
}