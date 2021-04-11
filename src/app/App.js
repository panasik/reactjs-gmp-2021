import React, {Suspense} from 'react';
import './App.scss';
import ErrorBoundary from './components/error-boundary/error-boundary';
import Loading from './components/general/loading/loading';
import {Provider} from 'react-redux';
import store from "./store";

const FilmViewer = React.lazy(() => import("./components/films-viewer/film-viewer"));

function App() {
    return (
        <React.StrictMode>
            <ErrorBoundary>
                <Provider store={store}>
                    <Suspense fallback={<Loading />}>
                        <FilmViewer />
                    </Suspense>
                </Provider>
            </ErrorBoundary>
        </React.StrictMode>
    );
}

export default App;
