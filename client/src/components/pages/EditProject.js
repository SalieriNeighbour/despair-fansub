import React, { Fragment, useContext, useState, useEffect, useRef } from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import ProjectContext from '../../context/project/projectContext';
import AuthContext from '../../context/auth/authContext';

import Spinner from '../img/spinner.gif';

const EditProject = props => {
    const { match: { params } } = props;

    const successMsgRef = React.createRef();
    const errorMsgRef = React.createRef();
    const projectFormRef = React.createRef();

    const projectContext = useContext(ProjectContext);
    const authContext = useContext(AuthContext);

    const { loadProject, project_info, loading, editProject, error, resetError } = projectContext;
    const { loadAdmin } = authContext;

    useEffect(() => {
        loadAdmin();
        loadProject(params.project_id);

        // eslint-disable-next-line
    }, []);

    let submitted = useRef(false);

    useEffect(() => {
        if (error) {
            errorMsgRef.current.classList.add("float-in");
            resetError();
            submitted.current = false;
        } else if (!loading && submitted.current) {
            submitted.current = false;
            successMsgRef.current.classList.add("float-in");
            projectFormRef.current.reset();
        };
        // eslint-disable-next-line
    }, [error, loading, submitted.current]);

    const [project, setProject] = useState({
        title: '',
        synopsis: '',
        classification: '',
        num_eps: '',
        year: '',
        cover: '',
        qualidade: '',
        video: '',
        source: '',
        audio: '',
        tradutor: '',
        typesetter: '',
        encoder: '',
        quality_checker: '',
        karaoke: '',
        revisor: '',
        timer: '',
        logo_creator: '',
        eps: {},
        status: '',
        batch_link: ''
    });

    useEffect(() => {
        if (!loading) {
            setProject({
                title: project_info.title,
                synopsis: project_info.synopsis,
                classification: project_info.classification,
                num_eps: project_info.num_eps,
                year: project_info.year,
                cover: project_info.cover,
                qualidade: project_info.qualidade,
                video: project_info.video,
                source: project_info.source,
                audio: project_info.audio,
                tradutor: project_info.tradutor,
                typesetter: project_info.typesetter,
                encoder: project_info.encoder,
                quality_checker: project_info.quality_checker,
                karaoke: project_info.karaoke,
                revisor: project_info.revisor,
                timer: project_info.timer,
                logo_creator: project_info.logo_creator,
                eps: project_info.eps,
                status: project_info.status,
                batch_link: project_info.batch_link
            })
        }

        // eslint-disable-next-line
    }, [loading]);

    const { title, synopsis, classification, num_eps, year, cover, qualidade, video, source, audio, tradutor, typesetter, encoder, quality_checker, karaoke, revisor, timer, logo_creator, eps, status, batch_link } = project;

    const onChange = e => {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    const onChangeEp = e => {
        if (!eps[e.target.name.split('-')[1]]) {
            setProject({ ...project, eps: { ...eps, [e.target.name.split('-')[1]]: { link: '', print: '' } } })
        }
        let replacementObject = eps;
        replacementObject[e.target.name.split('-')[1]] = { ...replacementObject[e.target.name.split('-')[1]], [e.target.name.split('-')[2]]: e.target.value };
        setProject({ ...project, eps: replacementObject });
    }

    const onSubmit = e => {
        e.preventDefault();
        editProject({
            title,
            synopsis,
            classification,
            num_eps,
            year,
            cover,
            qualidade,
            video,
            source,
            audio,
            tradutor,
            typesetter,
            encoder,
            quality_checker,
            karaoke,
            revisor,
            timer,
            logo_creator,
            eps,
            status,
            batch_link
        }, params.project_id);
        submitted.current = true;
        window.scrollTo(0, 0)
    };

    const removeErrorMsg = () => errorMsgRef.current.classList.remove('float-in');
    const removeSuccessMsg = () => successMsgRef.current.classList.remove('float-in');

    return (
        <Fragment>
            <div ref={successMsgRef} className="msg success-msg"><h5>Projeto editado com sucesso.</h5><span><i onClick={removeSuccessMsg} className="fas fa-times"></i></span></div>
            <div ref={errorMsgRef} className="msg error-msg"><h5>Input inválido.</h5><span><i onClick={removeErrorMsg} className="fas fa-times"></i></span></div>
            <Navbar />
            <section className="novo-projeto" id="editar-projeto">
                {!loading ? (
                    <div className="form-card">
                        <h3>Editar Projeto</h3>
                        <form ref={projectFormRef} onSubmit={onSubmit} autoComplete="off" className="newpost-form">
                            <div className="form-item">
                                <label htmlFor="project-title">Título</label>
                                <input value={title} onChange={onChange} name="title" id="project-title" type="text" placeholder="Insira o título do anime." className="form-input" required />
                            </div>
                            <div className="project-middle-section">
                                <div className="form-item">
                                    <label htmlFor="project-synopsis">Sinopse</label>
                                    <textarea value={synopsis} onChange={onChange} name="synopsis" id="project-synopsis" placeholder="Insira a sinopse do anime (1 parágrafo)." className="form-input" required />
                                </div>
                                <div className="side-items">
                                    <div className="form-item">
                                        <label htmlFor="project-classification">Tipo do Anime</label>
                                        <input value={classification} onChange={onChange} name="classification" id="project-classification" type="text" placeholder="Insira o tipo do anime. (ex: TV/Filme/Especial/OVA)" className="form-input" required />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="project-year">Ano de Lançamento</label>
                                        <input value={year} onChange={onChange} name="year" id="project-year" type="text" placeholder="Insira o ano de lançamento do anime." className="form-input" required />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="project-cover">Capa</label>
                                        <input value={cover} onChange={onChange} name="cover" id="project-cover" type="text" placeholder="Insira o link para a capa do anime." className="form-input" required />
                                    </div>
                                </div>
                            </div>
                            <div className="regular-input-section">
                                <div className="form-item">
                                    <label htmlFor="project-qualidade">Resolução</label>
                                    <input value={qualidade} onChange={onChange} name="qualidade" id="project-qualidade" type="text" placeholder="Insira a resolução do anime. (ex: 1920x1080)" className="form-input" required />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="project-video">Codec</label>
                                    <input value={video} onChange={onChange} name="video" id="project-video" type="text" placeholder="Insira o codec do vídeo do anime." className="form-input" required />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="project-audio">Áudio</label>
                                    <input value={audio} onChange={onChange} name="audio" id="project-audio" type="text" placeholder="Insira o codec do áudio do anime." className="form-input" required />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="project-source">Fonte</label>
                                    <input value={source} onChange={onChange} name="source" id="project-source" type="text" placeholder="Insira o tipo da fonte do anime. (ex: BDRip)" className="form-input" required />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="project-tradutor">Tradutor</label>
                                    <input value={tradutor} onChange={onChange} name="tradutor" id="project-tradutor" type="text" placeholder="Insira o nome do tradutor do projeto." className="form-input" required />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="project-typesetter">Typesetter</label>
                                    <input value={typesetter} onChange={onChange} name="typesetter" id="project-typesetter" type="text" placeholder="Insira o nome do typesetter do projeto." className="form-input" required />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="project-encoder">Encoder</label>
                                    <input value={encoder} onChange={onChange} name="encoder" id="project-encoder" type="text" placeholder="Insira o nome do encoder do projeto. (opcional)" className="form-input" />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="project-quality-checker">Quality Checker</label>
                                    <input value={quality_checker} onChange={onChange} name="quality_checker" id="project-quality-checker" type="text" placeholder="Insira o nome do quality checker do projeto. (opcional)" className="form-input" />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="project-karaoke">Karaoke</label>
                                    <input value={karaoke} onChange={onChange} name="karaoke" id="project-karaoke" type="text" placeholder="Insira o nome do karaoke-maker do projeto. (opcional)" className="form-input" />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="project-revisor">Revisor</label>
                                    <input value={revisor} onChange={onChange} name="revisor" id="project-revisor" type="text" placeholder="Insira o nome do revisor do projeto. (opcional)" className="form-input" />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="project-timer">Timer</label>
                                    <input value={timer} onChange={onChange} name="timer" id="project-timer" type="text" placeholder="Insira o nome do timer do projeto. (opcional)" className="form-input" />
                                </div>
                                <div className="form-item">
                                    <label htmlFor="project-logo-creator">Logo Creator</label>
                                    <input value={logo_creator} onChange={onChange} name="logo_creator" id="project-logo-creator" type="text" placeholder="Insira o nome do logo creator do projeto. (opcional)" className="form-input" />
                                </div>
                            </div>
                            <div className="form-item">
                                <label htmlFor="project-num-eps">Número de Episódios</label>
                                <input value={num_eps} onChange={onChange} name="num_eps" id="project-num-eps" type="text" placeholder="Insira o número total de episódios do anime." className="form-input" required />
                            </div>
                            <div className="form-item">
                                <label htmlFor="project-batch-link">Link da Batch Completa</label>
                                <input value={batch_link} onChange={onChange} name="batch_link" id="project-batch-link" type="text" placeholder="Insira o link da batch com todos os episódios do anime." className="form-input" />
                            </div>
                            <div className="state-input-radio">
                                <label htmlFor="project-status">Status do Projeto</label>
                                <div className="radio-input">
                                    Em andamento <input checked={project.status === 'em-andamento'} onChange={onChange} name="status" id="project-status" type="radio" value="em-andamento" />
                                    Concluído <input checked={project.status === 'concluidos'} onChange={onChange} name="status" id="project-status" type="radio" value="concluidos" />
                                </div>
                            </div>
                            <div className="episodes-input">
                                {eps ? (<Fragment>
                                    {Array.from({ length: parseInt(Object.keys(eps).length, 10) }, (v, k) => k + 1).map(episode => {
                                        return (<div key={episode} className="episode-input">
                                            <div className="form-item">
                                                <label htmlFor={`project-episode-${episode}-link`}>Episódio {episode} - Link</label>
                                                <input value={eps[episode].link} onChange={onChangeEp} name={`episode-${episode}-link`} id={`project-episode-${episode}-link`} type="text" placeholder={`Insira o link de download do episódio ${episode}. (opcional)`} className="form-input" />
                                            </div>
                                            <div className="form-item">
                                                <label htmlFor={`project-episode-${episode}-print`}>Episódio {episode} - Print</label>
                                                <input value={eps[episode].print} onChange={onChangeEp} name={`episode-${episode}-print`} id={`project-episode-${episode}-print`} type="text" placeholder={`Insira o link de uma print do episódio ${episode}. (opcional)`} className="form-input" />
                                            </div>
                                        </div>
                                        )
                                    })}</Fragment>
                                ) : (<Fragment></Fragment>)}
                                {num_eps ? (<Fragment>
                                    {Array.from({ length: parseInt(num_eps - Object.keys(eps).length, 10) }, (v, k) => k + 1 + Object.keys(eps).length).map(episode => {
                                        return (<div key={episode} className="episode-input">
                                            <div className="form-item">
                                                <label htmlFor={`project-episode-${episode}-link`}>Episódio {episode} - Link</label>
                                                <input onChange={onChangeEp} name={`episode-${episode}-link`} id={`project-episode-${episode}-link`} type="text" placeholder={`Insira o link de download do episódio ${episode}. (opcional)`} className="form-input" />
                                            </div>
                                            <div className="form-item">
                                                <label htmlFor={`project-episode-${episode}-print`}>Episódio {episode} - Print</label>
                                                <input onChange={onChangeEp} name={`episode-${episode}-print`} id={`project-episode-${episode}-print`} type="text" placeholder={`Insira o link de uma print do episódio ${episode}. (opcional)`} className="form-input" />
                                            </div>
                                        </div>
                                        )
                                    })}</Fragment>
                                ) : (<Fragment></Fragment>)}
                            </div>
                            <div className="project-input-btn">
                                <input className="btn" type="submit" value="Publicar" />
                            </div>
                        </form>
                    </div>) : (<div className="spinner-div"><img src={Spinner} alt="" /></div>)}
            </section>
            <Footer />
        </Fragment>
    );
}

export default EditProject;