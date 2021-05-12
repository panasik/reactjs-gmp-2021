import {render} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import ErrorBoundary from "./error-boundary";
import e from "express";

const ErrorComponent = () => (render());

describe('AppErrorBoundary', () => {

    it('should correctly init', () => {
        const {container} = render(<ErrorBoundary>
            <div className='TestClass'>

            </div>
        </ErrorBoundary>);
        expect(container.querySelector('.TestClass')).toBeInTheDocument();
    });
});