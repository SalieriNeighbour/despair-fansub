import React, {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import DOMPurify from 'dompurify';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

import PostContext from '../../context/post/postContext';
import TagsContext from '../../context/tags/tagsContext';

import Spinner from '../img/spinner.gif';

const TagPage = props => {
    const { match: {params} } = props;

    const postContext = useContext(PostContext);
    const tagsContext = useContext(TagsContext);

    const {posts, loadPosts, loading, preSetPostInfo} = postContext;
    const {tag_info, loading: loading_tag, error, loadTag} = tagsContext;

    useEffect(() => {
        loadPosts();
        loadTag(params.tag_id);
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

    const filterPostsForTag = (posts, tag_name) => {
        let post_list = []
        // eslint-disable-next-line
        posts.map(post => {
            if (post.tags.includes(tag_name)) {
                post_list.push(post);
            }
        })
        return post_list;
    }   

    const onClickPost = idx => preSetPostInfo(posts[idx]);

    return (
        <Fragment>
            <Navbar />
            <section id="tag-page">
                <div className="tag-posts">
                {(!loading && !loading_tag && !error && tag_info) ? (<h2>Posts com tag "{tag_info.name}"</h2>) : (<span></span>)}
                    <div className="tag-posts-content">
                        {(!loading && !loading_tag && !error && posts && tag_info) ? (
                            <Fragment>{filterPostsForTag(posts, tag_info.name).map((post, idx) => {
                                return (
                                <div key={idx} className="tag-post-item">
                                    <div onClick={() => onClickPost(idx)} className="tag-post-item-img">
                                        <Link to={`/post/${post._id}`}><img src={post.img} alt="" /></Link>
                                    </div>
                                    <div onClick={() => onClickPost(idx)} className="tag-post-item-text">
                                        <Link to={`/post/${post._id}`}><h5>{post.title}</h5></Link>
                                        <Link to={`/post/${post._id}`}><span>{formatDate(post.date)}</span></Link>
                                        <p dangerouslySetInnerHTML={{__html: post.content.length < 300 ? formatText(post.content) : formatText(post.content.substring(0, 300)) + '...'}}></p>
                                    </div>
                                </div>)
                            })}</Fragment>
                        ) : (<div className="spinner-div"><img src={Spinner} alt="" /></div>)}
                        
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
}

export default TagPage;