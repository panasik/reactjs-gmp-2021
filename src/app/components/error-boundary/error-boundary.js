import React from 'react';
import './error-boundary.scss';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false};
    }

    static getDerivedStateFromError(){
        return { hasError: true };
    }

    componentDidCatch(error, infoError){
        console.error(error, infoError);
    }

    render(){
        if(this.state.hasError){
            return <div className="error-info">Sorry, we are aware of this error and are fixing it</div>
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.element
}

export default ErrorBoundary;
