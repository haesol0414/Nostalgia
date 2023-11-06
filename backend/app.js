//packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const ProductRouter = require('./src/routers/ProductRouter');
const UserRouter = require('./src/routers/UserRouter');
const AuthRouter = require('./src/routers/AuthRouter');
const OrderRouter = require('./src/routers/OrderRouter');

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: false })); // Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json()); // Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(cors());

const port = process.env.PORT || 3000;

// mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;

db.on('connected', () => console.log('connecting DB success'));
db.on('disconnected', () => console.warn('disconnect'));
db.on('error', err => console.error(err));
db.on('reconnectedFailed', () => console.error('reconnect failed'));

app.use('/api', ProductRouter);
app.use('/api', UserRouter);
app.use('/api', AuthRouter);
app.use('/api', OrderRouter);

app.listen(port, () => {
	console.log(`connecting to ${port}`);
});
