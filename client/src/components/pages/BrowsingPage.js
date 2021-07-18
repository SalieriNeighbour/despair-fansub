import React, {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import PostContext from '../../context/post/postContext';

import Spinner from '../img/spinner.gif';

const BrowsingPage = props => {
    const { match: {params} } = props;

    const postContext = useContext(PostContext);

    const {posts, loading, error, loadPosts, preSetPostInfo} = postContext;

    useEffect(() => {
        loadPosts();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (error) {
            props.history.push('/404');
        };

        // eslint-disable-next-line
    }, [error]);

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
    }

    const onClick = idx => {
        preSetPostInfo(posts[idx])
    }

    return(
        <Fragment>
            <Navbar />
            <section id="browsing">
                <div className="browsing-space">
                    <div className="browsing-header">
                        <h1>Postagens — {params.page_id}</h1>
                    </div>
                    <div className="browsing-posts">
                        {(!loading) ? (<Fragment><div style={rowHandler(posts.length - (parseInt(params.page_id, 10)-1)*9)} className="posts-grid">
                                {posts.slice((parseInt(params.page_id, 10)-1)*9, parseInt(params.page_id, 10)*9).map((post, idx) => { return(
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
                                        return <span className={idx+1 === parseInt(params.page_id, 10) ? "active" : ""} key={(idx+1) + "b"}><Link to={`/page/${idx+1}`}>{idx+1}</Link></span>
                                    })}
                                </div>
                        </Fragment>) : (<div className="spinner-div"><img src={Spinner} alt="" /></div>)}
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default BrowsingPage;