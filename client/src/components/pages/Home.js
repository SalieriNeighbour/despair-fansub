import React, {Fragment} from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const Home = () => {
    return(
        <Fragment>
            <Navbar />
            <section id="home">
                <h1>Home</h1>
            </section>
            <Footer />
        </Fragment>
    );
}

export default Home;