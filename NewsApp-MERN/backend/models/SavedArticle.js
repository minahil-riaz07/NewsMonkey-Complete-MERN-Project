const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    text: { type: String, required: true, maxlength: 500 },
  },
  { timestamps: true }
);

const SavedArticleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    newsUrl: { type: String, required: true, unique: false },
    author: { type: String, default: 'Unknown' },
    source: { type: String, default: '' },
    category: { type: String, default: 'general' },
    publishedAt: { type: Date, default: Date.now },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

// Compound index: one save per user per article URL
SavedArticleSchema.index({ user: 1, newsUrl: 1 }, { unique: true });

module.exports = mongoose.model('SavedArticle', SavedArticleSchema);
