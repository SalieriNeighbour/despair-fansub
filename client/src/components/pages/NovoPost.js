import React, {Fragment} from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const NovoPost = () => {
    return(
        <Fragment>
            <Navbar />
            <section id="novo-post">
                <div className="form-card">
                    <h3>Criar Novo Post</h3>
                    <form autoComplete="off" className="newpost-form">
                        <div className="form-item">
                            <label htmlFor="post-title">Título</label>
                            <input name="title" id="post-title" type="text" placeholder="Insira um título." className="form-input" required />
                        </div>
                        <div className="form-item">
                            <label htmlFor="texto-post">Conteúdo</label>
                            <textarea name="texto" id="texto-post" placeholder="Digite seu post." className="form-input" required />
                        </div>
                        <div className="form-item form-file-item">
                            <label htmlFor="upload-imagem-post"><i className="fas fa-file-image"></i> Enviar imagem</label>
                            <input id="upload-imagem-post" name="imagem" type="file" accept="image/png, image/jpeg" className="btn" required />
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