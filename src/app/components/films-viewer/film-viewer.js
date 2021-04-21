import React, {useMemo} from 'react';
import Footer from './footer/footer';
import Container from '../general/container/container';
import './films-viewer.scss';
import Tabs from "../../components/general/tabs/tabs";
import Dropdown from "../general/dropdown/dropdown";
import {setSortOrder, setSortType} from "../../store/slices";
import {useDispatch, useSelector} from "react-redux";
import {selectGenres, selectSearchParams} from "../../store/selectors";
import {useHistory, useLocation} from "react-router-dom";
import FilmsHeaderContainer from "./header/films-header-container";
import PropTypes from 'prop-types';

const SelectAllTabName = 'All';

const availableSortItems = [
    {id: 0, title: 'Release Date', filmField: 'release_date'},
    {id: 1, title: 'Title', filmField: 'title'},
    {id: 2, title: 'Rating', filmField: 'vote_average'},
];

FilmsViewer.propTypes = {
    children: PropTypes.object
};


export default function FilmsViewer({children}) {
    const searchParams = useSelector(selectSearchParams);
    const genres = useSelector(selectGenres);
    const dispatch = useDispatch();
    const location = useLocation();

    let activeTab = useMemo(() => searchParams.activeGenre || SelectAllTabName, [searchParams.activeGenre]);
    let activeSortItem = useMemo(() => availableSortItems.find(el => el.filmField === searchParams.sortType), [searchParams.sortType]);
    let tabs = useMemo(() => [SelectAllTabName, ...genres], [genres]);

    const history = useHistory();
    

    const updateActiveTab = (tab) => {
        const search = new URLSearchParams(location.search);
        if (tab !== SelectAllTabName) {
            search.set("genre", tab);
        } else {
            search.delete("genre");
        }
        history.push({
            pathname: location.pathname,
            search: "?" + search.toString()
        });
    };

    const updateSortOrder = () => {
        const sortOrder = searchParams.sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch(setSortOrder(sortOrder));
    };

    return (
        <>
            <div className='FilmsViewer'>
                <Container
                    header={
                        <FilmsHeaderContainer/>
                    }
                    footer={
                        <Footer />
                    }>
                    <div className='FilmsContent'>
                        <Tabs
                            tabs={tabs}
                            activeTab={activeTab}
                            onTabClicked={updateActiveTab}
                            right={
                                <>
                                    <div className='SortLabel'>Sort by</div>
                                    <Dropdown
                                        hideTriangle={true}
                                        selected={activeSortItem}
                                        items={availableSortItems}
                                        onItemSelected={sortBy => dispatch(setSortType(sortBy.filmField))}
                                    />
                                    <div onClick={updateSortOrder}
                                        className={`SortButton ${searchParams.sortOrder === 'asc' ? 'AscSorting' : 'DscSorting'}`}>
                                    </div>
                                </>
                            }>
                            <div className='ContentContainer'>
                                {children}
                            </div>
                        </Tabs>
                    </div>
                </Container>
            </div>  
        </>
    );
}