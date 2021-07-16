import React, {Fragment} from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const AdminLogin = () => {
    return(
        <Fragment>
            <Navbar />
            <section id="admin-login">
                <div className="form-card">
                    <h3>Admin Login</h3>
                    <form autoComplete="off" className="login-form">
                        <input name="username" type="text" placeholder="Usuário" className="form-input" required />
                        <input name="password" type="passsword" placeholder="Senha" className="form-input" required />
                        <input className="btn" type="submit" value="Login" />
                    </form>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default AdminLogin;