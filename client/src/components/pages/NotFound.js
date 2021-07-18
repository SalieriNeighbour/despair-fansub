import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const NotFound = () => {
    return (
        <Fragment>
            <Navbar />
            <section id="not-found">
                <div className="not-found-header">
                    <h1>Página não encontrada.</h1>
                    <Link to="/" className="">Clique aqui para retornar à página inicial.</Link>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default NotFound;