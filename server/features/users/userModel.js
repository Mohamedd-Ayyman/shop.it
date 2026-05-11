const mongoose = require('mongoose');

const addressSchema = {
  label: { type: String, default: 'Home' },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, default: 'US' },
  isDefault: { type: Boolean, default: false }
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minLength: 2, maxLength: 50 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minLength: 8 },
  phone: { type: String, default: null },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  avatar: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  addresses: [addressSchema],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  refreshToken: { type: String, default: null },
  failedLoginAttempts: { type: Number, default: 0 },
  lockedUntil: { type: Date, default: null },
},
{ timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ createdAt: 1 });

module.exports = mongoose.model('User', userSchema);
