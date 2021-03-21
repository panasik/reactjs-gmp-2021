import React, {Suspense} from 'react';
import './App.scss';
import ErrorBoundary from './components/error-boundary/error-boundary';
import Loading from './components/general/loading/loading';
import {Provider} from 'react-redux';
import store from "./store";

const FilmViewerContainer = React.lazy(() => import("./components/films-viewer/film-viewer-container"));

function App() {
    return (
        <React.StrictMode>
            <ErrorBoundary>
                <Provider store={store}>
                    <Suspense fallback={<Loading />}>
                        <FilmViewerContainer />
                    </Suspense>
                </Provider>
            </ErrorBoundary>
        </React.StrictMode>
    );
}

export default App;
