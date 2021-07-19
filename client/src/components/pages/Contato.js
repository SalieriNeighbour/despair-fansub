import React, {Fragment, useState, useContext, useEffect, useRef} from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

import ContactContext from '../../context/contact/contactContext';

const Contato = () => {
    const successMsgRef = React.createRef();
    const errorMsgRef = React.createRef();
    const contactFormRef = React.createRef();

    const contactContext = useContext(ContactContext);

    const {postContact, error, loading, resetErrorContact} = contactContext;

    let submitted = useRef(false);

    useEffect(()=> {
        if (error) {
            errorMsgRef.current.classList.add("float-in");
            resetErrorContact();
            submitted.current = false;
        } else if (!loading && submitted.current) {
            submitted.current = false;
            successMsgRef.current.classList.add("float-in");
            contactFormRef.current.reset();
        };
        // eslint-disable-next-line
    }, [error, loading, submitted.current]);

    const [contact, setContact] = useState({
        email: '',
        subject: '',
        content: ''
    });

    const {email, subject, content} = contact;

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        postContact({
            email,
            subject,
            content
        });
        submitted.current = true;
        window.scrollTo(0, 0);
    };

    const removeErrorMsg = () => errorMsgRef.current.classList.remove('float-in');
    const removeSuccessMsg = () => successMsgRef.current.classList.remove('float-in');

    return(
        <Fragment>
            <div ref={successMsgRef} className="msg success-msg"><h5>Contato realizado com sucesso.</h5><span><i onClick={removeSuccessMsg} className="fas fa-times"></i></span></div>
            <div ref={errorMsgRef} className="msg error-msg"><h5>Envio inválido.</h5><span><i onClick={removeErrorMsg} className="fas fa-times"></i></span></div>
            <Navbar />
            <section id="contato">
                <div className="form-card">
                    <h3>Fale Conosco</h3>
                    <form ref={contactFormRef} onSubmit={onSubmit} autoComplete="off" className="contact-form">
                        <input onChange={onChange} name="email" type="email" placeholder="Email" className="form-input" required />
                        <input onChange={onChange} name="subject" type="text" placeholder="Assunto" className="form-input" required />
                        <textarea onChange={onChange} name="content" placeholder="Mensagem" className="form-input" required></textarea>
                        <input className="btn" type="submit" value="Enviar" />
                    </form>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default Contato;