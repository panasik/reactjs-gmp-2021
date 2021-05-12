import React from 'react';
import Footer from '../components/films-viewer/footer/footer';
import Container from '../components/general/container/container';
import './page-not-found.scss';
import '../components/general/styles/button.scss';
import img from '../res/img/page-not-found.png';
import Logo from "../components/general/logo/logo";
import {NavLink} from "react-router-dom";



export default function PageNotFound() {
    return (
        <div className='PageNotFoundViewer'>
                <Container
                    footer={
                        <Footer/>
                    }>
                    <div className="PageNotFound">
                        <Logo/>
                        <div className="PageNotFoundContent">
                            <div className="PageNotFoundTitle">Page Not Found</div>
                            <img
                                src={img}
                                alt='404'
                                className='PageNotFoundImage'/>
                            <NavLink className="ActionButton" to='/'>Go back to home</NavLink>
                        </div>
                    </div>
                </Container>
        </div>
    );
}