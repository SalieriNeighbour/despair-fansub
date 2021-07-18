import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/logo.png'

const NavbarHome = () => {
        return (
            <Fragment>
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
            </Fragment>
        )
    }


export default NavbarHome;