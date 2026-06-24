const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const SavedArticle = require('../models/SavedArticle');
const { protect } = require('../middleware/auth');

// All saved-article routes require authentication
router.use(protect);

// @route  GET /api/saved
// @desc   Get all saved articles for logged-in user
// @access Private
router.get('/', async (req, res) => {
  try {
    const articles = await SavedArticle.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: articles.length, articles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route  POST /api/saved
// @desc   Save / bookmark an article
// @access Private
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('newsUrl').isURL().withMessage('Valid news URL is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, imageUrl, newsUrl, author, source, category, publishedAt } = req.body;

    try {
      const existing = await SavedArticle.findOne({ user: req.user._id, newsUrl });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Article already saved' });
      }

      const article = await SavedArticle.create({
        user: req.user._id,
        title,
        description,
        imageUrl,
        newsUrl,
        author,
        source,
        category,
        publishedAt,
      });

      res.status(201).json({ success: true, article });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

// @route  DELETE /api/saved/:id
// @desc   Remove a saved article
// @access Private
router.delete('/:id', async (req, res) => {
  try {
    const article = await SavedArticle.findOne({ _id: req.params.id, user: req.user._id });
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    await article.deleteOne();
    res.json({ success: true, message: 'Article removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route  POST /api/saved/:id/comments
// @desc   Add a comment to a saved article
// @access Private
router.post(
  '/:id/comments',
  [body('text').trim().notEmpty().withMessage('Comment text is required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const article = await SavedArticle.findById(req.params.id);
      if (!article) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }

      article.comments.push({
        user: req.user._id,
        name: req.user.name,
        text: req.body.text,
      });

      await article.save();
      res.status(201).json({ success: true, comments: article.comments });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

// @route  DELETE /api/saved/:id/comments/:commentId
// @desc   Delete a comment
// @access Private
router.delete('/:id/comments/:commentId', async (req, res) => {
  try {
    const article = await SavedArticle.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    const comment = article.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    comment.deleteOne();
    await article.save();
    res.json({ success: true, comments: article.comments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
