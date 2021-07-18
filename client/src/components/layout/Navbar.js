import React, {Fragment, useContext} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../img/logo.png'
import PostContext from '../../context/post/postContext';

const NavbarHome = () => {
        const postContext = useContext(PostContext);
        const {setLoading} = postContext;

        return (
            <Fragment>
                <div className="navbar">
                    <div className="navbar-contents">
                        <div className="navbar-logo">
                            <Link to="/" onClick={setLoading}><img src={Logo} alt="Logo" className="logo" /></Link>
                        </div>
                        <div className="nav-link">
                            <Link to="/" onClick={setLoading}>Home</Link>
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


export default NavbarHome;