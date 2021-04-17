import React, {Suspense} from 'react';
import './App.scss';
import ErrorBoundary from './components/error-boundary/error-boundary';
import Loading from './components/general/loading/loading';
import {Provider} from 'react-redux';
import store from "./store";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

const FilmsViewer = React.lazy(() => import("./components/films-viewer/film-viewer"));
const Films = React.lazy(() => import("./components/films-viewer/films/films"));
const PageNotFound = React.lazy(() => import("./page-not-found/page-not-found"));
const NoFilms = React.lazy(() => import("./components/films-viewer/no-films/no-films"));
const Home = React.lazy(() => import("./home/home"));

function App() {
    return (
        <React.StrictMode>
            <ErrorBoundary>
                <Provider store={store}>
                    <Router>
                        <Switch>
                            <Route exact
                                path="/"
                                render={() => (
                                    <Redirect to="/home" />
                                )} />
                            <Route exact path="/home">
                                <Suspense fallback={<Loading />}>
                                    <Home />
                                </Suspense>
                            </Route>
                            <Route exact path="/no-films">
                                <Suspense fallback={<Loading />}>
                                    <FilmsViewer><NoFilms pathname={location.pathname}/></FilmsViewer>
                                </Suspense>
                            </Route>
                            <Route path="/films">
                                <Suspense fallback={<Loading />}>
                                    <FilmsViewer><Films /></FilmsViewer>
                                </Suspense>
                            </Route>
                            <Route exact path="/page-not-found">
                                <Suspense fallback={<Loading />}>
                                    <PageNotFound />
                                </Suspense>
                            </Route>
                            <Route path="*"
                                render={() => (
                                    <Redirect to="/page-not-found" />
                                )} />
                        </Switch>
                    </Router>
                </Provider>
            </ErrorBoundary>
        </React.StrictMode>
    );
}

export default App;
