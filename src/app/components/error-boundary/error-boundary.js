import React from 'react';
import './error-boundary.scss';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false};
    }

    static getDerivedStateFromError(error){
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

export default ErrorBoundary;
