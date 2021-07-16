import React, {Fragment, useState, useContext, useEffect} from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import AuthContext from '../../context/auth/authContext';

const AdminLogin = props => {
    const authContext = useContext(AuthContext);

    const {login, isAuthenticated, error, loadAdmin} = authContext;

    useEffect(()=> {
        loadAdmin();

        if(isAuthenticated) {
            props.history.push('/')
        };
        if (error) {
            console.error(error);
        };

        // eslint-disable-next-line
    }, [isAuthenticated, error]);

    const [admin, setAdmin] = useState({
        username: '',
        password: ''
    });

    const {username, password} = admin;

    const onChange = e => setAdmin({...admin, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        login({
            username,
            password
        });
    };


    return(
        <Fragment>
            <Navbar />
            <section id="admin-login">
                <div className="form-card">
                    <h3>Admin Login</h3>
                    <form onSubmit={onSubmit} autoComplete="off" className="login-form">
                        <input onChange={onChange} name="username" type="text" placeholder="Usuário" className="form-input" required />
                        <input onChange={onChange} name="password" type="passsword" placeholder="Senha" className="form-input" required />
                        <input className="btn" type="submit" value="Login" />
                    </form>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default AdminLogin;