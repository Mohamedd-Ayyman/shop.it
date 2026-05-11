// Password hashing/checking utility
const bcrypt = require('bcryptjs');

module.exports = {
  async hash(password) {
    return await bcrypt.hash(password, 12);
  },
  async compare(raw, hashed) {
    return await bcrypt.compare(raw, hashed);
  },
};
