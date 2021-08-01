import React, {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import DOMPurify from 'dompurify';
import Disqus from 'disqus-react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';

import Spinner from '../img/spinner.gif';

const Post = props => {
    const { match: {params} } = props;

    const postContext = useContext(PostContext);
    const authContext = useContext(AuthContext);

    const {loading, error, loadPost, post_info, deletePost} = postContext;
    const {loadAdmin, loading: loading_admin, isAuthenticated} = authContext;

    useEffect(() => {
        loadPost(params.post_id);
        loadAdmin();

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
        const year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month
        }
        
        return (dt + '/' + month + '/' + year);
    }

    const formatText = text => {
        text = text.split("\n").join("<br/>");
        let match = text.match(/(<i;.*?>)/g);
        if (match) {
            // eslint-disable-next-line
            match.map(matched => {
                text = text.replace(matched, '<span style="font-style:italic;">' + matched.slice(3, -1) + "</span>");
            })
        }
        match = text.match(/(<n;.*?>)/g);
        if (match) {
            // eslint-disable-next-line
            match.map(matched => {
                text = text.replace(matched, '<span style="font-weight:bold;">' + matched.slice(3, -1) + "</span>");
            })
        }  
        match = text.match(/(<link;.*?>)/g);
        if (match) {
            // eslint-disable-next-line
            match.map(matched => {
                text = text.replace(matched, `<a href="${matched.split(';')[1]}">` + matched.split(';')[2].slice(0, -1) + '</a>');
            })
        }
        return DOMPurify.sanitize(text, {ALLOWED_TAGS: ['span', 'a', 'br'], ALLOWED_ATTR: ['style', 'href']});
    }

    const disqusShortname = 'despairfansub';
    const disqusConfig = {
        url: `https://despairfansub.com/post/${params.post_id}`,
        identifier: params.post_id,
        title: ''
    }

    useEffect(() => {
        if (post_info) {
            disqusConfig.title = post_info.title;
        }

        // eslint-disable-next-line
    }, [post_info]);

    const onSubmit = e => {
        e.preventDefault();
        deletePost(params.post_id);
        props.history.push('/');
    }

    return(
        <Fragment>
            <Navbar />
            <section id="post">
                {(!loading && !error) ? (
                    <div className="post-card">
                        <div className="post-card-header">
                            <h2>{post_info.title}</h2>
                            <span className="post-author"><i className="fas fa-user"></i> {post_info.author}</span><span className="post-date">{formatDate(post_info.date)}</span>
                            {(!loading_admin && isAuthenticated) ? (
                                <div className="post-buttons">
                                    <Link to={`/post/edit/${params.post_id}`}><i className="fas fa-pencil-alt"></i></Link>
                                    <div className="delete-form">
                                        <form onSubmit={onSubmit}><button type="submit"><i className="fas fa-trash-alt"></i></button></form>
                                    </div>
                                </div>
                            ):(<span></span>)
                            }
                        </div>
                        <div className="post-card-body">
                            <div className="post-body-img">
                                <img src={post_info.img} alt="" />
                            </div>
                            <div className="post-body-text">
                                <p dangerouslySetInnerHTML={{__html: formatText(post_info.content)}}></p>
                            </div>
                            <Disqus.DiscussionEmbed 
                            shortname={disqusShortname}
                            config={disqusConfig}
                            />
                            <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
                            <script dangerouslySetInnerHTML={{__html: `const disqus = jQuery('#disqus_thread');

                                disqus.ready(function() {
                                setTimeout(function() {
                                    if (disqus.children().length >= 3) {
                                    const comments = disqus.find('iframe:nth-child(2)').detach();
                                    disqus.empty().append(comments);
                                    }
                                }, 2000);
                                });
                                `}}></script>
                        </div>
                    </div>
                ) : (<div className="spinner-div"><img src={Spinner} alt="" /></div>)}
            </section>
            <Footer />
        </Fragment>
    );
}

export default Post;