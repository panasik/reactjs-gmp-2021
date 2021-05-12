import React from 'react';
import './error-boundary.scss';
import PropTypes from 'prop-types';
import Container from '../general/container/container';
import Footer from "../../components/films-viewer/footer/footer";
import Logo from "../general/logo/logo";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(){
        return {hasError: true};
    }

    render(){
        if(this.state.hasError){
            return (
                <Container
                    footer={
                        <Footer/>
                    }>
                    <div className="ErrorPage">
                        <Logo/>
                        <div className="ErrorPageTitle">Sorry, we are aware of this error and are fixing it</div>
                    </div>
                </Container>);
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.element
};

export default ErrorBoundary;
