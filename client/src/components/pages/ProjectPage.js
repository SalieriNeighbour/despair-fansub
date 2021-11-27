import React, {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

import ProjectContext from '../../context/project/projectContext';
import AuthContext from '../../context/auth/authContext';

import Spinner from '../img/spinner.gif';

const ProjectPage = props => {
    const { match: {params} } = props;

    const projectContext = useContext(ProjectContext);
    const authContext = useContext(AuthContext);

    const {project_info, loading, loadProject, error, deleteProject} = projectContext;
    const {loadAdmin, loading: loading_admin, isAuthenticated} = authContext;


    useEffect(() => {
        loadProject(params.project_id);
        loadAdmin();

        // eslint-disable-next-line
    }, [])

    const onSubmitDelete = () => {
        deleteProject(params.project_id);
        props.history.push('/');
    }

    return (
        <Fragment>
            <Navbar />
            <section id="project-page">
                <div className="project-page">
                    {(!loading && !error && project_info) ? (
                        <div className="project-page-contents">
                            <div className="side-bar">
                                <img src={project_info.cover} alt="" />
                                {project_info.tradutor ? (
                                    <div className="info-item">
                                        <p>Tradutor</p>
                                        <span>{project_info.tradutor}</span>
                                    </div>
                                ) : (<Fragment></Fragment>)}
                                {project_info.typesetter ? (
                                    <div className="info-item">
                                        <p>Typesetter</p>
                                        <span>{project_info.typesetter}</span>
                                    </div>
                                ) : (<Fragment></Fragment>)}
                                {project_info.encoder ? (
                                    <div className="info-item">
                                        <p>Encoder</p>
                                        <span>{project_info.encoder}</span>
                                    </div>
                                ) : (<Fragment></Fragment>)}
                                {project_info.revisor ? (
                                    <div className="info-item">
                                        <p>Revisor</p>
                                        <span>{project_info.revisor}</span>
                                    </div>
                                ) : (<Fragment></Fragment>)}
                                {project_info.quality_checker ? (
                                    <div className="info-item">
                                        <p>Quality Checker</p>
                                        <span>{project_info.quality_checker}</span>
                                    </div>
                                ) : (<Fragment></Fragment>)}
                                {project_info.karaoke ? (
                                    <div className="info-item">
                                        <p>Karaoke</p>
                                        <span>{project_info.karaoke}</span>
                                    </div>
                                ) : (<Fragment></Fragment>)}
                                {project_info.timer ? (
                                    <div className="info-item">
                                        <p>Timer</p>
                                        <span>{project_info.timer}</span>
                                    </div>
                                ) : (<Fragment></Fragment>)}
                                {project_info.logo_creator ? (
                                    <div className="info-item">
                                        <p>Logo Creator</p>
                                        <span>{project_info.logo_creator}</span>
                                    </div>
                                ) : (<Fragment></Fragment>)}
                            </div>
                            <div className="main-section">
                                <div className="top-section">
                                    <img src={project_info.cover} alt="" />
                                    <h1>{project_info.title} <span>{project_info.year}</span></h1>
                                    <p>{"Sinopse: " + project_info.synopsis}</p>
                                    <p>Total de episódios: {Object.keys(project_info.eps).length + "/" + project_info.num_eps}</p>
                                    {(!loading_admin && isAuthenticated) ? (
                                        <div className="project-buttons">
                                            <Link to={`/project/edit/${params.project_id}`}><i className="fas fa-pencil-alt"></i></Link>
                                            <div className="project-delete-form">
                                                <form onSubmit={onSubmitDelete}><button type="submit"><i className="fas fa-trash-alt"></i></button></form>
                                            </div>
                                        </div>
                                    ) : (<Fragment></Fragment>)}
                                </div>
                                <div className="project-content-section">
                                    {project_info.batch_link ? (
                                        <a href={project_info.batch_link}>Acesse o página com o download de todos os episódios!</a>
                                    ) : <Fragment></Fragment>}
                                    {Object.keys(project_info.eps).map((key, idx) => {
                                        return(
                                            <div key={idx} className="project-episode-item">
                                                <div className="project-episode-item-header">
                                                    <h4>Episódio {idx+1}</h4>
                                                </div>
                                                <div className="project-episode-item-body">
                                                    <div className="body-img">
                                                        <img src={project_info.eps[key].print} alt="" />
                                                    </div>
                                                    <div className="body-info">
                                                        <p>Fonte: {project_info.source}</p>
                                                        <p>Resolução: {project_info.qualidade}</p>
                                                        <p>Vídeo: {project_info.video}</p>
                                                        <p>Áudio: {project_info.audio}</p>
                                                        <div className="episode-link">
                                                            <p>Episódio:</p> <a href={project_info.eps[key].link} target="_blank" rel="noopener noreferrer">OneDrive</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (<div className="spinner-div"><img src={Spinner} alt="" /></div>)}
                    
                </div>
            </section>
            <Footer />
        </Fragment>
    )
}

export default ProjectPage;