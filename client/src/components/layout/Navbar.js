import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/logo.png'

class NavbarHome extends React.Component {
    constructor() {
        super();
        this.click_count = 0;
        this.overlayRef = React.createRef();
        this.hamburgerIconRef = React.createRef();
        this.xIconRef = React.createRef();
        this.hamburgerToggle = this.hamburgerToggle.bind(this);
    }

    hamburgerToggle() {
        if (this.click_count % 2 === 0) {
            this.overlayRef.current.classList.remove("hide");
            this.hamburgerIconRef.current.classList.add("hide");
            this.xIconRef.current.classList.remove("hide");
            this.click_count++;
        } else {
            this.overlayRef.current.classList.add("hide");
            this.hamburgerIconRef.current.classList.remove("hide");
            this.xIconRef.current.classList.add("hide");
            this.click_count++;
        }
    }

    render() {
        return (
            <Fragment>
                <div ref={this.overlayRef} id="overlay-options" className="overlay-options hide">
                    <div className="overlay-options-content">
                        <Link to="/">Home</Link>
                        <Link to="/browsingprojects/em-andamento">Projetos Em Andamento</Link>
                        <Link to="/browsingprojects/concluidos">Projetos Concluídos</Link>
                        <Link to="/contato">Contato</Link>
                    </div>
                </div>
                <div className="navbar">
                    <div className="navbar-contents">
                        <div className="navbar-logo">
                            <Link to="/"><img src={Logo} alt="Logo" className="logo" /></Link>
                        </div>
                        <div className="nav-link">
                            <Link to="/">Home</Link>
                        </div>
                        <div className="dropdown">
                            <div className="nav-link">
                                <button className="dropbtn">Projetos<i className="fas fa-angle-down"></i></button>
                            </div>
                            <div className="dropdown-content">
                                <div className="nav-link">
                                    <Link to="/browsingprojects/em-andamento">Em Andamento</Link>
                                </div>
                                <div className="nav-link">
                                    <Link to="/browsingprojects/concluidos">Concluídos</Link>
                                </div>
                            </div>
                        </div>
                        <div className="nav-link">
                            <Link to="/contato">Contato</Link>
                        </div>
                    </div>
                </div>
                <button onClick={this.hamburgerToggle} id="hamburger-menu" className="hamburger-menu">
                    <i ref={this.hamburgerIconRef} id="hamburger-icon" className="fas fa-bars"></i>
                    <i ref={this.xIconRef} id="x-icon" className="fas fa-times hide"></i>
                </button>
            </Fragment>
        )
    }
}

export default NavbarHome;