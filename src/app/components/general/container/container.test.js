import {render} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Container from "./container";

describe('Container', () => {
    it('should correctly set init state', () => {
        const {container} = render(<Container
            header={<div className="TestHeaderClass"> </div>}
            footer={<div className="TestFooterClass"> </div>}>

            <div className="TestClass">
            </div>
        </Container>);

        const header = container.querySelector('.TestHeaderClass');
        const footer = container.querySelector('.TestFooterClass');
        const containerContext = container.querySelector('.TestClass');

        expect(header).toBeInTheDocument();
        expect(footer).toBeInTheDocument();
        expect(containerContext).toBeInTheDocument();
    });
});