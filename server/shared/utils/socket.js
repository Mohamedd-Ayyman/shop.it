// Socket.IO setup (Blueprint §15 Real-time Notifications)
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../../features/users/userModel');

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: { origin: config.corsOrigin, credentials: true },
  });

  // JWT auth middleware for Socket.IO
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.query.token;
    if (!token) return next(new Error('Auth required'));
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      const user = await User.findById(decoded._id).select('-password').lean();
      if (!user || !user.isActive) return next(new Error('User not found'));
      socket.userId = user._id.toString();
      socket.userRole = user.role;
      next();
    } catch { next(new Error('Invalid token')); }
  });

  io.on('connection', (socket) => {
    // Join personal room
    socket.join(`user:${socket.userId}`);
    if (socket.userRole === 'admin') socket.join('admin');
    console.log(`Socket connected: ${socket.userId}`);
    socket.on('disconnect', () => console.log(`Socket disconnected: ${socket.userId}`));
  });

  return io;
}

function getIO() {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
}

function emitToUser(userId, event, data) {
  getIO().to(`user:${userId}`).emit(event, data);
}

function emitToAdmin(event, data) {
  getIO().to('admin').emit(event, data);
}

module.exports = { initSocket, getIO, emitToUser, emitToAdmin };
