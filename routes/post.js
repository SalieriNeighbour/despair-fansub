const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Post = require('../models/Post');
const Tag = require('../models/Tag');

// Get posts
// Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1});
        res.send(posts);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
});

// Get specific post
// Public
router.get('/:post_id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) {
            return res.status(400).send("Not Found");
        }
        res.send(post);
    } catch (err) {
        console.error(err.message);
        res.status(404).send('Not Found');
    }
});

// Post post
// Private
router.post('/', auth, async (req, res) => {
    try {
        const {title, content, img, tags, author} = req.body;

        if (title === '' || content === '' || img === '' || tags === '' || !author || img.match(/\.(jpeg|jpg|png)$/) == null){
            return res.status(400).send("Post inválido.");
        }

        const tag_list = tags.split(';');
        
        post = new Post({
            title,
            content,
            img,
            tags: tag_list,
            author
        });

        for(let i=0;i<tag_list.length;i++) {
            const tag_model = new Tag({name: tag_list[i]});
            const tag = await Tag.findOneOrCreate({name: tag_list[i]}, tag_model);
            tag.posts.push(post._id);
            await tag.save();
        }

        await post.save();

        res.json("Post realizado com sucesso.")
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
});

// Edit post
// Private
router.put('/:post_id', auth, async (req, res) => {
    try {
        const {title, content, img, tags, author} = req.body;

        if (title === '' || content === '' || img === '' || tags === '' || !author || img.match(/\.(jpeg|jpg|png)$/) == null){
            return res.status(400).send("Post inválido.");
        }

        const tag_list = tags.split(';');

        let post = await Post.findById(req.params.post_id);
        const old_tags = post.tags;
        
        post.title = title;
        post.content = content;
        post.img = img;
        post.tags = tag_list;
        post.author = author;

        for(let i=0;i<old_tags.length;i++) {
            const tag = await Tag.findOne({name: old_tags[i]});
            tag.posts.map((post, idx) => {
                if (post == req.params.post_id) {
                    tag.posts.splice(idx, 1)
                }
            })
            if (tag.posts.length === 0) {
                await Tag.findOneAndDelete({_id: tag._id})
            } else {
                await tag.save();
            }
        }

        for(let i=0;i<tag_list.length;i++) {
            const tag_model = new Tag({name: tag_list[i]});
            const tag = await Tag.findOneOrCreate({name: tag_list[i]}, tag_model);
            tag.posts.push(post._id);
            await tag.save();
        }

        await post.save();

        res.json("Edição realizada com sucesso.")
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
});

// Delete Post
// Private
router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({_id: req.params.post_id});

        for(let i=0;i<post.tags.length;i++) {
            const tag = await Tag.findOne({name: post.tags[i]});
            tag.posts.map((post, idx) => {
                if (post == req.params.post_id) {
                    tag.posts.splice(idx, 1)
                }
            })
            if (tag.posts.length === 0) {
                await Tag.findOneAndDelete({_id: tag._id})
            } else {
                await tag.save();
            }
        }

        res.json("Post deletado com sucesso.");
    } catch (err) {
        console.error(err.message);
        res.status(404).send('Not Found');
    }
});

module.exports = router;