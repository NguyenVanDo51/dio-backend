import apiRoutes from './src/routes/routes';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

let app = express();
app.use(cors());
dotenv.config();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.response.sendSuccess = function (data) {
  return this.status(200).json(data);
};

app.response.sendError = function (message, details) {
  return this.status(500).json({ message, details });
};

app.response.senValidateFailed = function (errors) {
  return this.status(400).json({ errors });
};

const allowedOrigins = ['https://h5.zdn.vn/', 'zbrowser://h5.zdn.vn/'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes('h5.zdn.vn')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return next();
});

cloudinary.config({
  cloud_name: 'dio-upload',
  api_key: '455614735726925',
  api_secret: 'exgroScxsd0e5qT1b038clA8hh4',
});

// Heroku Mongoose connection
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

// Added check for DB connection

if (!db) console.log('Error connecting db');
else console.log('Db connected successfully');

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
  console.log('Server running on port ' + port);
});
