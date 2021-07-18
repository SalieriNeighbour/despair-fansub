import React, {Fragment} from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const Contato = () => {
    const contactFormRef = React.createRef();

    const onSubmit = e => {
        e.preventDefault();
        contactFormRef.current.reset();
    };

    return(
        <Fragment>
            <Navbar />
            <section id="contato">
                <div className="form-card">
                    <h3>Fale Conosco</h3>
                    <form ref={contactFormRef} onSubmit={onSubmit} autoComplete="off" className="contact-form">
                        <input name="email" type="email" placeholder="Email" className="form-input" required />
                        <input name="assunto" type="text" placeholder="Assunto" className="form-input" required />
                        <textarea name="mensagem" placeholder="Mensagem" className="form-input" required></textarea>
                        <input className="btn" type="submit" value="Enviar" />
                    </form>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default Contato;