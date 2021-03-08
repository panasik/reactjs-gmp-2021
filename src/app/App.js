import React, {Suspense}  from 'react';
import './App.scss';
import ErrorBoundary from './components/error-boundary/error-boundary';
import Loading from './components/general/loading/loading';

const FilmViewerContainer = React.lazy(() => import("./components/films-viewer/film-viewer-container"));

function App() {
    return (
        <React.StrictMode>
           <ErrorBoundary>
                <Suspense fallback={<Loading/>}>
                    <FilmViewerContainer/>
                </Suspense>
            </ErrorBoundary>
        </React.StrictMode>
    );
}

export default App;
