import React, {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';

import Spinner from '../img/spinner.gif';


const Home = () => {
    const authContext = useContext(AuthContext);
    const postContext = useContext(PostContext);

    const {loadAdmin, loading, isAuthenticated} = authContext;
    const {posts, loading: loading_posts, loadPosts, preSetPostInfo} = postContext;

    useEffect(() =>{
        loadAdmin();
        // eslint-disable-next-line
    }, [posts]);

    useEffect(() => {
        loadPosts()
        // eslint-disable-next-line
    }, [])

    const formatDate = date => {
        date = new Date(date);
        const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
        const year = date.getFullYear();
        const month = date.getMonth();
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        
        return (dt + ' ' + months[month] + ' ' + year)
    }

    const rowHandler = posts_length => {
        let style = {};
        if (posts_length > 6) {
            style = {gridTemplateRows: '1fr 1fr 1fr'}
        } else if (posts_length > 3 ) {
            style = {gridTemplateRows: '1fr 1fr'}
        } else {
            style = {gridTemplateRows: '1fr'}
        }
        return style;
    };

    const onClick = idx => preSetPostInfo(posts[idx])

    return(
        <Fragment>
            <Navbar />
            <section id="home">
                <div className="home-grid-container">
                    <div className="home-main">
                        <div className="main-header">
                            <div className="main-header-text">
                                <h2>Novas Postagens</h2>
                                {(!loading && isAuthenticated) ? (<Link to='/novopost' className="btn">Criar Post</Link>) : <span></span>}
                            </div>
                        </div>
                        {(!loading_posts) ? (<Fragment><div style={rowHandler(posts.length)} className="posts-grid">
                                {posts.slice(0, 9).map((post, idx) => { return(
                                    <div onClick={() => onClick(idx)} className="post" key={idx}>
                                        <Link to={`/post/${post._id}`}><img src={post.img} alt="" /></Link>
                                        <Link to={`/post/${post._id}`}><p>{post.title}</p></Link>
                                        <Link to={`/post/${post._id}`}><span>{formatDate(post.date)}</span></Link>
                                    </div>
                                )})}
                                </div>
                                <div className="posts-page-browser">
                                    <span><Link to="/">1</Link></span>
                                    {Array.from({length:Math.ceil(posts.length/9)-1 < 0 ? 0 : Math.ceil(posts.length/9)-1},(v,k)=>k+1).map(idx => {
                                        return <span key={(idx+1) + "b"}><Link to={`/page/${idx+1}`}>{idx+1}</Link></span>
                                    })}
                                </div>
                            </Fragment>) : (<div className="spinner-div"><img src={Spinner} alt="" /></div>)}
                        
                    </div>
                    <div className="home-sidebar">
                        <div className="sidebar-header">
                            <h2>Tags</h2>
                        </div>
                        <div className="home-sidebar-contents">
                            <div className="home-sidebar-item"><p><i className="fas fa-angle-right"></i> Hakumei to Mikochi</p> <span>2</span></div>
                            <div className="home-sidebar-item"><p><i className="fas fa-angle-right"></i> Hayate no Gotoku</p> <span>23</span></div>
                            <div className="home-sidebar-item"><p><i className="fas fa-angle-right"></i> Hi no Tori</p> <span>1</span></div>
                            <div className="home-sidebar-item"><p><i className="fas fa-angle-right"></i> Kaiji</p> <span>7</span></div>
                            <div className="home-sidebar-item"><p><i className="fas fa-angle-right"></i> Lupin III Part II</p> <span>1</span></div>
                            <div className="home-sidebar-item"><p><i className="fas fa-angle-right"></i> Magical Nyan Nyan Taruto</p> <span>9</span></div>
                            <div className="home-sidebar-item"><p><i className="fas fa-angle-right"></i> Mahoujin Guru Guru</p> <span>1</span></div>
                            <div className="home-sidebar-item"><p><i className="fas fa-angle-right"></i> Shoujo Cosette</p> <span>21</span></div>
                            <div className="home-sidebar-item"><p><i className="fas fa-angle-right"></i> Tamayura</p> <span>2</span></div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default Home;