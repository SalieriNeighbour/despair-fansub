import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const BrowsingProjects = props => {
    const { match: {params} } = props;


    useEffect(() => {
        if (params.project_status !== 'em-andamento' && params.project_status !== 'concluidos') {
            props.history.push('/404')
        }
        // eslint-disable-next-line
    }, [params.project_status]);

    return (
        <Fragment>
            <Navbar />
            <section id="browsing-projects">
                <div className="browsing-projects">
                    <div className="browsing-projects-header">
                        <h1>Projetos {params.project_status === "em-andamento" ? "em andamento" : "concluídos"}</h1>
                    </div>
                    <div className="browsing-projects-content">
                        <div className="browsing-projects-item">
                            <div className="project-cover">
                                <Link to='/project/(project-title)'><img src="https://cdn.myanimelist.net/images/anime/5/64671.jpg" alt="" /></Link>
                            </div>
                            <div className="project-info">
                                <Link to='/project/(project-title)'>Ashita no Joe</Link>
                                <p>1970</p>
                            </div>
                        </div>
                        <div className="browsing-projects-item">
                            <div className="project-cover">
                                <Link to='/'><img src="https://cdn.myanimelist.net/images/anime/7/56643.jpg" alt="" /></Link>
                            </div>
                            <div className="project-info">
                                <Link to='/'>Chuunibyou Demo Koi ga Shitai! Ren</Link>
                                <p>2014</p>
                            </div>
                        </div>
                        <div className="browsing-projects-item">
                            <div className="project-cover">
                                <Link to='/'><img src="https://cdn.myanimelist.net/images/anime/1365/106794.jpg" alt="" /></Link>
                            </div>
                            <div className="project-info">
                                <Link to='/'>Asatir: Mirai no Mukashi Banashi</Link>
                                <p>2020</p>
                            </div>
                        </div>
                        <div className="browsing-projects-item">
                            <div className="project-cover">
                                <Link to='/'><img src="https://cdn.myanimelist.net/images/anime/8/60781.jpg" alt="" /></Link>
                            </div>
                            <div className="project-info">
                                <Link to='/'>Cardcaptor Sakura</Link>
                                <p>1998</p>
                            </div>
                        </div>
                        <div className="browsing-projects-item">
                            <div className="project-cover">
                                <Link to='/'><img src="https://cdn.myanimelist.net/images/anime/1/1852.jpg" alt="" /></Link>
                            </div>
                            <div className="project-info">
                                <Link to='/'>Hidamari Sketch</Link>
                                <p>2007</p>
                            </div>
                        </div>
                        <div className="browsing-projects-item">
                            <div className="project-cover">
                                <Link to='/'><img src="https://cdn.myanimelist.net/images/anime/1139/105873.jpg" alt="" /></Link>
                            </div>
                            <div className="project-info">
                                <Link to='/'>Kitsutsuki Tanteidokoro</Link>
                                <p>2020</p>
                            </div>
                        </div>
                        <div className="browsing-projects-item">
                            <div className="project-cover">
                                <Link to='/'><img src="https://cdn.myanimelist.net/images/anime/10/18793.jpg" alt="" /></Link>
                            </div>
                            <div className="project-info">
                                <Link to='/'>Monster</Link>
                                <p>2020</p>
                            </div>
                        </div>
                        <div className="browsing-projects-item">
                            <div className="project-cover">
                                <Link to='/'><img src="https://cdn.myanimelist.net/images/anime/12/18520.jpg" alt="" /></Link>
                            </div>
                            <div className="project-info">
                                <Link to='/'>Monster</Link>
                                <p>2020</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default BrowsingProjects;