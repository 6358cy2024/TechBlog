const { DataTypes } = require('sequelize');
const { hash, compare } = require('bcrypt');
const client = require('../config/connection');

const User = client.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8]
    }
  }
}, {
  hooks: {
    async beforeCreate(user) {
      user.password = await hash(user.password, 10);
      return user;
    }
  }
});

User.prototype.validatePassword = async function (formPassword) {
  const is_valid = await compare(formPassword, this.password);
  return is_valid;
}

module.exports = User;