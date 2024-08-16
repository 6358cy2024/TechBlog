const { DataTypes } = require('sequelize');
const client = require('../config/connection');
const dayjs = require('dayjs');

const Comment = client.define('Comment', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        get() {
            const madeOn = this.getDataValue('madeOn');

            return dayjs(madeOn).format('MM/DD/YYYY');
        },
    }
});

module.exports = Comment;