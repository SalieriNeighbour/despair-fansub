import React, {Fragment, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

import ProjectContext from '../../context/project/projectContext';
import AuthContext from '../../context/auth/authContext';

import Spinner from '../img/spinner.gif';

const BrowsingProjects = props => {
    const { match: {params} } = props;

    const projectContext = useContext(ProjectContext);
    const authContext = useContext(AuthContext);

    const {projects, loading, loadProjects, preSetProjectInfo} = projectContext;
    const {loadAdmin, loading: loading_admin, isAuthenticated} = authContext;

    useEffect(() => {
        loadProjects();
        loadAdmin();

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (params.project_status !== 'em-andamento' && params.project_status !== 'concluidos') {
            props.history.push('/404')
        }

        // eslint-disable-next-line
    }, [params.project_status]);

    const linkTextHandler = title => {
        title = title.replace(/[^a-z0-9\s-]/ig,'').trim().replace(/\s+/g, '-').toLowerCase();
        return title;
    }

    const onClickProject = idx => preSetProjectInfo(projects[idx]);

    return (
        <Fragment>
            <Navbar />
            <section id="browsing-projects">
                <div className="browsing-projects">
                    <div className="browsing-projects-header">
                        <h1>Projetos {params.project_status === "em-andamento" ? "em andamento" : "concluídos"}</h1>
                        {(!loading_admin && !loading && isAuthenticated) ? (<Link to='/novoprojeto' className="btn">Criar Projeto</Link>) : <Fragment></Fragment>}
                    </div>
                    <div className="browsing-projects-content">
                        {(!loading && projects) ? (
                            <Fragment>{projects.map((project, idx) => {
                                return (
                                    <div key={idx}>{params.project_status === project.status ? (
                                        <div className="browsing-projects-item">
                                            <div onClick={() => onClickProject(idx)} className="project-cover">
                                                <Link to={`/project/${project._id}/${linkTextHandler(project.title)}`}><img src={project.cover} alt="" /> <span>{project.qualidade.split("x")[1] + "p"}</span></Link>
                                            </div>
                                            <div onClick={() => onClickProject(idx)} className="project-info">
                                                <Link to={`/project/${project._id}/${linkTextHandler(project.title)}`}>{project.title}</Link>
                                                <p>{project.year}</p>
                                            </div>
                                        </div>
                                    ) : (<Fragment></Fragment>)}</div>
                                )
                            })}</Fragment>
                        ) : (<div className="spinner-div"><img src={Spinner} alt="" /></div>)}
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default BrowsingProjects;