import React, {Fragment, useState, useContext, useEffect} from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import AuthContext from '../../context/auth/authContext';

const AdminLogin = props => {
    const errorMsgRef = React.createRef();

    const authContext = useContext(AuthContext);

    const {login, isAuthenticated, error, loadAdmin} = authContext;

    useEffect(() => {
        loadAdmin();
        // eslint-disable-next-line
    }, []);
 
    useEffect(()=> {

        if(isAuthenticated) {
            props.history.push('/');
        };
        if (error) {
            console.error(error);
            errorMsgRef.current.classList.add("float-in");
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

    const removeMsg = () => errorMsgRef.current.classList.remove('float-in');

    return(
        <Fragment>
            <div ref={errorMsgRef} className="error-msg"><h5>{error}</h5><span><i onClick={removeMsg} className="fas fa-times"></i></span></div>
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