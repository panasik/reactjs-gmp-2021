import {render} from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import ErrorBoundary from "./error-boundary";

const ErrorComponent = () => {throw 'error';};

describe('AppErrorBoundary', () => {

    it('should correctly init', () => {
        const {container} = render(<ErrorBoundary>
            <div className='TestClass'>

            </div>
        </ErrorBoundary>);
        expect(container.querySelector('.TestClass')).toBeInTheDocument();
    });

    it('should correctly handle error', () => {
        const {container} = render(<ErrorBoundary>
            <ErrorComponent/>
        </ErrorBoundary>);

        expect(container.querySelector('.ErrorPage')).toBeInTheDocument();
    });
});