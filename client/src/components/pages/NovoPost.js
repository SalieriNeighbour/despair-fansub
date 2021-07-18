import React, {Fragment, useState, useContext, useEffect, useRef} from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';

const NovoPost = () => {
    const successMsgRef = React.createRef();
    const errorMsgRef = React.createRef();
    const postFormRef = React.createRef();

    const postContext = useContext(PostContext);
    const authContext = useContext(AuthContext);

    const {postPost, error, loading, resetError} = postContext;
    const {loadAdmin, admin} = authContext;

    useEffect(() => {
        loadAdmin();
        // eslint-disable-next-line
    }, []);

    let submitted = useRef(false);


    useEffect(()=> {
        if (error) {
            errorMsgRef.current.classList.add("float-in");
            resetError();
            submitted.current = false;
        } else if (!loading && submitted.current) {
            submitted.current = false;
            successMsgRef.current.classList.add("float-in");
            postFormRef.current.reset();
        };
        // eslint-disable-next-line
    }, [error, loading, submitted.current]);

    const [post, setPost] = useState({
        title: '',
        content: '',
        img: '',
        tags: ''
    });

    const {title, content, img, tags} = post;

    const onChange = e => setPost({...post, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        postPost({
            title,
            content,
            img,
            tags,
            author: admin.username
        });
        submitted.current = true;
    };

    const removeErrorMsg = () => errorMsgRef.current.classList.remove('float-in');
    const removeSuccessMsg = () => successMsgRef.current.classList.remove('float-in');


    return(
        <Fragment>
            <div ref={successMsgRef} className="msg success-msg"><h5>Post realizado com sucesso.</h5><span><i onClick={removeSuccessMsg} className="fas fa-times"></i></span></div>
            <div ref={errorMsgRef} className="msg error-msg"><h5>Post inválido.</h5><span><i onClick={removeErrorMsg} className="fas fa-times"></i></span></div>
            <Navbar />
            <section id="novo-post">
                <div className="form-card">
                    <h3>Criar Novo Post</h3>
                    <form ref={postFormRef} onSubmit={onSubmit} autoComplete="off" className="newpost-form">
                        <div className="form-item">
                            <label htmlFor="post-title">Título</label>
                            <input onChange={onChange} name="title" id="post-title" type="text" placeholder="Insira um título." className="form-input" required />
                        </div>
                        <div className="form-item">
                            <label htmlFor="texto-post">Conteúdo</label>
                            <textarea onChange={onChange} name="content" id="texto-post" placeholder="Digite seu post." className="form-input" required />
                        </div>
                        <div className="form-middle">
                            <div className="form-item">
                                <label htmlFor="link-img-post">Link da Imagem</label>
                                <input onChange={onChange} name="img" id="link-img-post" type="text" placeholder="Insira o link da imagem." className="form-input" required />
                            </div>
                            <div className="form-item">
                                <label htmlFor="post-tags">Tags</label>
                                <input onChange={onChange} name="tags" id="post-tags" type="text" placeholder="Insira as tags. (ex: tag1;tag2)" className="form-input" required />
                            </div>
                        </div>
                        <div className="form-submit">
                            <input className="btn" type="submit" value="Publicar" />
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default NovoPost;