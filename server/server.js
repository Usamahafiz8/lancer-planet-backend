const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const { parse } = require('url');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const db = require('./server/config/db');

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  // API routes
  server.use('/api/auth', require('./server/routes/api/auth'));
  server.use('/api', require('./server/routes/api/secured'));

  // Next.js pages
  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });

  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
