import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/logo.png'

class NavbarHome extends React.Component {
    render () {
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
                                <button className="dropbtn">Projetos</button>
                            </div>
                            <div className="dropdown-content">
                                <div className="nav-link">
                                    <Link to="/em-andamento">Em Andamento</Link>
                                </div>
                                <div className="nav-link">
                                    <Link to="/completos">Completos</Link>
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
}

export default NavbarHome;