const { DataTypes } = require('sequelize');
const client = require('../config/connection');

const Blog = client.define('Blog', {
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	content: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	
});

module.exports = Blog;