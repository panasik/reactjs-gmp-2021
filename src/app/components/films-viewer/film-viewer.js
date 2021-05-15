import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from './footer/footer';
import Container from '../general/container/container';
import './films-viewer.scss';
import Tabs from '../general/tabs/tabs';
import Dropdown from '../general/dropdown/dropdown';
import {
  setSortOrder,
  setSortType,
  selectGenres,
  selectSearchParams,
} from '../../store';
import FilmsHeaderContainer from './header/films-header-container';

const SelectAllTabName = 'All';

const availableSortItems = [
  { id: 0, title: 'Release Date', filmField: 'release_date' },
  { id: 1, title: 'Title', filmField: 'title' },
  { id: 2, title: 'Rating', filmField: 'vote_average' },
];

export default function FilmsViewer({ children }) {
  const searchParams = useSelector(selectSearchParams);
  const genres = useSelector(selectGenres);
  const dispatch = useDispatch();
  const location = useLocation();

  const activeTab = useMemo(
    () => searchParams.activeGenre || SelectAllTabName,
    [searchParams.activeGenre],
  );
  const activeSortItem = useMemo(
    () => availableSortItems.find((el) => el.filmField === searchParams.sortType),
    [searchParams.sortType],
  );
  const tabs = useMemo(() => [SelectAllTabName, ...genres], [genres]);

  const history = useHistory();

  const updateActiveTab = (tab) => {
    const search = new URLSearchParams(location.search);
    if (tab !== SelectAllTabName) {
      search.set('genre', tab);
    } else {
      search.set('genre', 'all');
    }
    history.push({
      pathname: location.pathname,
      search: `?${search.toString()}`,
    });
  };

  const updateSortOrder = () => {
    const sortOrder = searchParams.sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSortOrder(sortOrder));
  };

  return (
    <>
      <div className="FilmsViewer">
        <Container header={<FilmsHeaderContainer />} footer={<Footer />}>
          <div className="FilmsContent">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabClicked={updateActiveTab}
              right={(
                <>
                  <div className="SortLabel">Sort by</div>
                  <Dropdown
                    hideTriangle
                    selected={activeSortItem}
                    items={availableSortItems}
                    onItemSelected={(sortBy) => dispatch(setSortType(sortBy.filmField))}
                  />
                  <div
                    onClick={updateSortOrder}
                    className={`SortButton ${
                      searchParams.sortOrder === 'asc'
                        ? 'AscSorting'
                        : 'DscSorting'
                    }`}
                  />
                </>
              )}
            >
              <div className="ContentContainer">{children}</div>
            </Tabs>
          </div>
        </Container>
      </div>
    </>
  );
}

FilmsViewer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
