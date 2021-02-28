import React from 'react';
import './App.scss';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Container from './components/general/container/container';
import Content from './components/content/content';
import ErrorBoundary from './components/error-boundary/error-boundary';

function App() {
    return (
        <div className="app-content">
           <ErrorBoundary>
                <Container
                    header={<Header />}
                    footer={<Footer/>}>
                        <Content/>
                </Container>
            </ErrorBoundary>
        </div>
    );
}

export default App;
