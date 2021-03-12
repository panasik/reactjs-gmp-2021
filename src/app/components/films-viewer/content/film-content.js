import React from 'react';
import './film-content.scss';
import FilmItem, {filmType} from './film-item/film-item';
import Tabs from '../../general/tabs/tabs';
import Dropdown from '../../general/dropdown/dropdown';
import PropTypes from 'prop-types';
import {menuItemType} from "../../general/menu-container/menu-container";

FilmsContent.propTypes = {
    films: PropTypes.arrayOf(filmType),
    sortItems: PropTypes.arrayOf(menuItemType),
    activeSortItem: menuItemType,
    activeTab: PropTypes.string,
    tabs: PropTypes.arrayOf(PropTypes.string),

    updateActiveSortItem: PropTypes.func.isRequired,
    updateActiveTab: PropTypes.func.isRequired,
    onEditFilm: PropTypes.func.isRequired,
    onDeleteFilm: PropTypes.func.isRequired,
}

export default function FilmsContent(props) {

    const actions = [
        {
            id: 0,
            title: 'Edit',
            handle: (film) => {
                props.onEditFilm(film);
            }
        },
        {
            id: 1,
            title: 'Delete', 
            handle: (film) => {
                props.onDeleteFilm(film);
            }
        },
    ];

    return (
        <div className='FilmsContent'>
            <Tabs
                tabs={props.tabs}
                activeTab={props.activeTab}
                onTabClicked={props.updateActiveTab}
                right={
                    <>
                        <div className='SortLabel'>Sort by</div>
                        <Dropdown
                            selected={props.activeSortItem}
                            items={props.sortItems}
                            onItemSelected={props.updateActiveSortItem}
                        />
                    </>
                }>
                {
                    <div className='ContentContainer'>
                        <div className='FilmsCountContainer'>
                            <span className='FilmsCount'>{props.films.length}</span> movies found
                        </div>
                        {
                            props.films.length
                                ?
                                <div className='FilmContainer'>
                                    {
                                        props.films.map(el =>
                                            <FilmItem
                                                key={el.id}
                                                film={el}
                                                actions={actions}/>)
                                    }
                                </div>
                                :
                                <div className="NoData">No films found</div>
                        }
                    </div>
                }
            </Tabs>
        </div>
    );
}