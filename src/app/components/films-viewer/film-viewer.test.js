import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import FilmViewer from './film-viewer';
import { selectSearchParams, setSortOrder, setSortType } from '../../store';

jest.mock('../../store', () => ({
  selectGenres: jest.fn(() => []),
  selectSearchParams: jest.fn(() => ({
    sortType: 'release_date',
    sortOrder: 'desc',
    limit: 20,
  })),
  setSortOrder: jest.fn(),
  setSortType: jest.fn(),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((selector) => selector()),
  useDispatch: jest.fn(() => mockDispatch),
}));

const mockHistory = { push: jest.fn() };

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => mockHistory),
  useLocation: jest.fn(() => ({})),
}));
jest.mock('./header/films-header-container', () => () => <div>Test</div>);
jest.mock('../../components/general/tabs/tabs', () => ({
  // eslint-disable-next-line react/prop-types
  onTabClicked, activeTab, children, right,
}) => (
  <div className="TestTab" onClick={() => onTabClicked(activeTab)}>
    {children}
    {right}
  </div>
));
jest.mock('../general/dropdown/dropdown', () => ({
  // eslint-disable-next-line react/prop-types
  onItemSelected,
}) => (
  <div onClick={() => onItemSelected({ filmField: 'any' })}>TestItem</div>
));

describe('FilmViewer', () => {
  it('should correctly init', () => {
    const { container } = render(
      <FilmViewer>
        <div className="TestClass" />
      </FilmViewer>,
    );
    expect(container.querySelector('.TestClass')).toBeInTheDocument();
  });

  it('should correctly select tab', () => {
    const { container } = render(<FilmViewer />);
    const tab = container.querySelector('.TestTab');
    userEvent.click(tab);

    expect(mockHistory.push).toHaveBeenCalled();
  });

  it('should correctly select active tab', () => {
    selectSearchParams.mockReturnValueOnce({
      sortType: 'release_date',
      sortOrder: 'desc',
      limit: 20,
      activeGenre: 'Test',
    });

    const { container } = render(<FilmViewer />);
    const tab = container.querySelector('.TestTab');
    userEvent.click(tab);

    expect(mockHistory.push).toHaveBeenCalled();
  });

  it('should correctly select sortBy', () => {
    render(<FilmViewer />);
    const item = screen.getByText('TestItem');
    userEvent.click(item);

    expect(setSortType).toHaveBeenCalledWith('any');
  });

  it('should correctly select sort order', () => {
    const { container } = render(<FilmViewer />);
    const icon = container.querySelector('.SortButton ');
    userEvent.click(icon);

    expect(setSortOrder).toHaveBeenCalledWith('asc');
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should correctly select sort order', () => {
    selectSearchParams.mockReturnValueOnce({
      sortType: 'release_date',
      sortOrder: 'asc',
      limit: 20,
      activeGenre: 'Test',
    });
    const { container } = render(<FilmViewer />);

    const icon = container.querySelector('.SortButton ');
    userEvent.click(icon);

    expect(setSortOrder).toHaveBeenCalledWith('desc');
  });
});
