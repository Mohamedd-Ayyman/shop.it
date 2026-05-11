// Server entry point: connect DB, start app, init Socket.IO
const mongoose = require('mongoose');
const http = require('http');
const config = require('./shared/config/config');
const app = require('./app');
const { initSocket } = require('./shared/utils/socket');

const server = http.createServer(app);

mongoose.connect(config.mongoURI).then(() => {
  console.log('Connected to MongoDB');
  initSocket(server);
  server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error', err);
  process.exit(1);
});
