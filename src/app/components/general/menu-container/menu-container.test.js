import {render, screen} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import MenuContainer from "./menu-container";
import userEvent from "@testing-library/user-event";

describe('MenuPanel', () => {
    const menuItems = [{
        id: 1, title: 'Item1'
    }, {
        id: 2, title: 'Item2'
    }, {
        id: 3, title: 'Item3'
    }, {
        id: 4, title: 'Item4'
    }];

    it('should correctly set init state', () => {
        render(<MenuContainer
            items={menuItems}
            onItemSelected={() => {
            }}/>);

        menuItems.forEach(el => {
            expect(screen.queryAllByText(el.title)[0]).toBeInTheDocument();
        });
    });

    it('should correctly select', (done) => {
        render(<MenuContainer
            items={menuItems}
            onItemSelected={(item) => {
                expect(item).toEqual(menuItems[3]);
                done();
            }}/>);

        const item = screen.getByText(menuItems[3].title);

        expect(item).toBeInTheDocument();

        userEvent.click(item);
    });
});