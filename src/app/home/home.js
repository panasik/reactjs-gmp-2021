import React from 'react';
import Footer from '../components/films-viewer/footer/footer';
import Container from '../components/general/container/container';
import './home.scss';
import '../components/general/styles/button.scss';
import Logo from "../components/general/logo/logo";
import {useHistory} from "react-router-dom";
import HeaderContainer from "../components/general/header-container/header-container";


export default function Home() {
    let history = useHistory();
    return (
        <div className='HomeViewer'>
            <Container
                header={
                    <HeaderContainer height={'300px'}>
                        <div className="HomeHeader">
                            <div className="HomeHeaderTitle">Welcome to</div>
                        </div>
                        <div className="HomeHeader"><Logo/></div>
                    </HeaderContainer>
                }
                footer={
                    <Footer/>
                }>
                <div className="Home">
                    <div className="HomeContent">
                        <div className="HomeTitle">Let&apos;s search for movies!</div>
                        <div className="ActionButton"
                            onClick={() => history.push('/films')}>Search
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}