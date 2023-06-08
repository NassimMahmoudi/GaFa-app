const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const juryRoutes = require('./routes/jury');
const associationRoutes = require('./routes/association');
require('dotenv').config({path: './config/.env'});
require('./config/db');

const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));
// serve all static files inside public directory display images
app.use(express.static('public')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// jwt
app.get('*');
app.get('/jwtid', (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// routes
app.use('/api/user',userRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/jury',juryRoutes);
app.use('/api/association',associationRoutes);


// server
app.listen(process.env.PORT,() => {
    console.log(`Running at localhost:${process.env.PORT}`);
  });
