require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://vaishnav:Tinku9999@devconnect.naoma.mongodb.net/DiseasePrediction?retryWrites=true&w=majority';
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
  console.error('Error connecting to mongo', err);
});

// app.use('/api/users', authRoutes)
app.get('/', (req, res) => {
  res.send('Hello tester');
});


// app.get('/', requireAuth, (req, res) => {
//   res.send(`Your email: ${req.user.email}`);
// });

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Listening on port 3000');
});
