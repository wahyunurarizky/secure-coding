const express = require('express');
const cors = require('cors');
const sanitizeHtml = require('sanitize-html'); // Import library sanitize-html
const app = express();
const PORT = 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Sample article data
const article = {
  id: 1,
  title: 'Detail Berita',
  content: 'Ini adalah detail dari berita yang sedang dibaca.',
  comments: []
};

// Endpoint to render the article page with comments
app.get('/', (req, res) => {
  res.render('article', { article });
});

// Endpoint to post a comment
app.post('/api/article/comments', (req, res) => {
  const { comment } = req.body;

  if (comment) {
    article.comments.push(comment);

    res.status(201).json({ message: 'Comment added successfully', comments: article.comments });
  } else {
    res.status(400).json({ message: 'Comment cannot be empty' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
