const express = require('express');
const { param } = require('express-validator');
const router = express.Router();
const { Post } = require('../models');
const jwtAuth = require('../middlewares/auth');
const { body, query, validationResult} = require('express-validator');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { hash, compare } = require('bcrypt');


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

router.post('/signup', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').trim().notEmpty(),
    validate
], async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        const passwordHash = await hash(password, 10);
        const user = await User.create({ email, passwordHash, name });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error('Error in signup:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email already in use' });
        }
        res.status(500).json({ error: 'Error creating user' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) return res.status(400).json({error: 'User not found'});

        const validPassword = await compare(password, user.passwordHash);
        if (!validPassword) return res.status(400).json({error: 'Invalid password'});

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({error: error.message || 'Error logging in'});
    }
});

router.post('/post', [
    jwtAuth,
    body('title').trim().isLength({min: 1, max: 255}).escape(),
    body('content').trim().isLength({min: 1}).escape(),
    validate
], async (req, res) => {
    try {
        const {title, content} = req.body;
        const authorId = req.user.id;
        const post = await Post.create({title, content, authorId});
        res.status(201).json({message: 'Post created successfully', id: post.id});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'An error occurred while creating the post'});
    }
});

const formatPost = (post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    author: post.User ? {
        id: post.User.id,
        name: post.User.name
    } : null
});

router.get('/posts', [
    query('author').optional().isInt(),
    validate
], async (req, res) => {
    try {
        const authorId = req.query.author;
        let whereClause = {};
        if (authorId) {
            whereClause.authorId = authorId;
        }
        const posts = await Post.findAll({
            where: whereClause,
            include: [{
                model: User,
                attributes: ['id', 'name']
            }],
            order: [['createdAt', 'DESC']]
        });

        const formattedPosts = posts.map(formatPost);

        res.json(formattedPosts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({message: 'An error occurred while retrieving posts'});
    }
});

router.get('/posts/:id', [
    param('id').isInt(),
    validate
], async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findOne({
            where: { id: postId },
            include: [{
                model: User,
                attributes: ['id', 'name']
            }]
        });

        if (post) {
            const formattedPost = formatPost(post);
            res.json(formattedPost);
        } else {
            res.status(404).json({ message: `Post with ID ${postId} not found` });
        }
    } catch (error) {
        console.error(`Error retrieving post with ID ${req.params.id}:`, error);
        res.status(500).json({ message: `An error occurred while retrieving post with ID: ${req.params.id}` });
    }
});

module.exports = router;
