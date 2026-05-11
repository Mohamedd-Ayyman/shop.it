const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['order','system','promotion','chat'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String, default: null },
  isRead: { type: Boolean, default: false }
},
{ timestamps: { createdAt: true, updatedAt: false } }
);

notificationSchema.index({ user: 1, isRead: 1 });
notificationSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
