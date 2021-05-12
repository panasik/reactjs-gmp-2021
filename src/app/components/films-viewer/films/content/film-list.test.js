import {render, screen} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import FilmList from "./film-list";

jest.mock('../../../../store', () => ({
    selectFilms: jest.fn(() => ([{id: 1, name: 'Test1'}])),
    loadFilms: jest.fn(),
    setActiveGenre: jest.fn(),
    setAddEditDialogOpen: jest.fn(),
    setConfirmationDialog: jest.fn(),
    setSearchString: jest.fn(),
    setSelectedFilm: jest.fn(),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
    useSelector: jest.fn().mockImplementation(selector => selector()),
    useDispatch: jest
        .fn(() => mockDispatch)
}));

const mockHistory = {push: jest.fn()};

jest.mock('react-router-dom', () => ({
    useHistory: jest.fn(() => mockHistory),
    useLocation: jest.fn(() => ({search:''}))
}));
jest.mock("./film-item/film-item", () => (props) =>
    (<><div className="TestItem"
        onClick={() => props.clickHandler(props.film)}> </div>
        {props.actions.map(el => (
            <div key={Math.random()} onClick={() => el.handle(props.film)}>{el.title}</div>
        ))}
    </>));

import {setAddEditDialogOpen, setSelectedFilm, setConfirmationDialog} from "../../../../store";

describe('FilmList', () => {

    it('should correctly init', () => {
        const {container} = render(<FilmList/>);
        expect(container.querySelector('.TestItem')).toBeInTheDocument();
    });

    it('should correctly select film', () => {
        window.scrollTo = jest.fn();
        const {container} = render(<FilmList/>);
        const tab = container.querySelector('.TestItem');
        userEvent.click(tab);

        expect(mockHistory.push).toHaveBeenCalledWith({
            pathname: `/films/1`,
            search: ''
        });

        expect(window.scrollTo).toHaveBeenCalled();
    });

    it('should correctly select handle edit', () => {
        render(<FilmList/>);
        const edit = screen.getByText(/edit/i);
        console.log(edit);
        userEvent.click(edit);

        expect(mockDispatch).toHaveBeenCalled();
        expect(setSelectedFilm).toHaveBeenCalled();
        expect(setAddEditDialogOpen).toHaveBeenCalledWith(true);
    });

    it('should correctly select handle delete', () => {
        render(<FilmList/>);
        const edit = screen.getByText(/delete/i);
        userEvent.click(edit);

        expect(mockDispatch).toHaveBeenCalled();
        expect(setSelectedFilm).toHaveBeenCalled();
        expect(setConfirmationDialog).toHaveBeenCalled();
    });
});