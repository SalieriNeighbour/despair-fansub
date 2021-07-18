import React, {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';
import TagsContext from '../../context/tags/tagsContext';

import Spinner from '../img/spinner.gif';


const Home = () => {
    const authContext = useContext(AuthContext);
    const postContext = useContext(PostContext);
    const tagsContext = useContext(TagsContext);

    const {loadAdmin, loading, isAuthenticated} = authContext;
    const {posts, loading: loading_posts, loadPosts, preSetPostInfo} = postContext;
    const {tags, loading: loading_tags, loadTags, preSetTagInfo, setLoading} = tagsContext;

    useEffect(() =>{
        loadAdmin();
        loadTags();
        // eslint-disable-next-line
    }, [posts]);

    useEffect(() => {
        loadPosts();
        loadTags();
        // eslint-disable-next-line
    }, [loading_posts, loading_tags])

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

    const onClickPost = idx => preSetPostInfo(posts[idx]);
    
    const onClickTag = idx => {
        preSetTagInfo(tags[idx]);
        setLoading();
    }

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
                        {(!loading_posts && !loading_tags && posts) ? (<Fragment><div style={rowHandler(posts.length)} className="posts-grid">
                                {posts.slice(0, 9).map((post, idx) => { return(
                                    <div onClick={() => onClickPost(idx)} className="post" key={idx}>
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
                            {(!loading_posts && !loading_tags && tags) ? (<Fragment>{tags.map((tag, idx) => {
                                return <div key={idx + "c"} className="home-sidebar-item"><Link  onClick={() => onClickTag(idx)} to={`/tag/${tag._id}`}><i className="fas fa-angle-right"></i> {tag.name}</Link> <span>{tag.posts.length}</span></div>
                            })}</Fragment>) : <span></span>}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default Home;