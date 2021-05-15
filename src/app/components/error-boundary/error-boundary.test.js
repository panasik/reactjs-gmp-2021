import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import ErrorBoundary from './error-boundary';

describe('AppErrorBoundary', () => {
  it('should correctly init', () => {
    const { container } = render(
      <ErrorBoundary>
        <div className="TestClass" />
      </ErrorBoundary>,
    );
    expect(container.querySelector('.TestClass')).toBeInTheDocument();
  });
});
