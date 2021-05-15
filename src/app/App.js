import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.scss';
import ErrorBoundary from './components/error-boundary/error-boundary';
import Loading from './components/general/loading/loading';

const FilmsViewer = Loadable({
  loader: () => import('./components/films-viewer/film-viewer'),
  loading: Loading,
});

const Films = Loadable({
  loader: () => import('./components/films-viewer/films/films'),
  loading: Loading,
});

const PageNotFound = Loadable({
  loader: () => import('./page-not-found/page-not-found'),
  loading: Loading,
});

// PATTERN: Lazy loading
const App = ({
  // eslint-disable-next-line react/prop-types
  Router, location, context, store,
}) => (
  <ErrorBoundary>
    <Provider store={store}>
      <Router location={location} context={context}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/films" />} />
          <Route path="/films">
            <FilmsViewer>
              <Films />
            </FilmsViewer>
          </Route>
          <Route path="/page-not-found">
            <PageNotFound />
          </Route>
          <Route
            exact
            path="*"
            render={() => <Redirect to="/page-not-found" />}
          />
        </Switch>
      </Router>
    </Provider>
  </ErrorBoundary>
);

export default App;
