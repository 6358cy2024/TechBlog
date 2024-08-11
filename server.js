require('dotenv').config();//attaches values to process.env
const express = require('express');
const session =require('express-session');
const { engine } = require('express-handlebars');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const client = require('./config/connection');
const view_routes = require('./routes/view_routes');
const user_routes = require('./routes/user_routes');

const app = express();
const PORT = 3001;

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use('/', [view_routes, user_routes]);

client.sync({force: false})
	.then(() => {
		app.listen(PORT, () => {
			console.log('Server started on port', PORT);
		});
	});