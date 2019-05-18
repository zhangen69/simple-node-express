// ES6: import libraries
import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';

// initialize configs
const app = express();
const port = 3000;
const routes = express.Router();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// initialize functions
const getHelloWorld = (req, res, next) => res.send('GET:Hello World!!!');
const postHelloWorld = (req, res, next) => {
  console.log(req.body);
  res.send('POST:Hello World!!!');
};
const checkAuth = (req, res, next) => {
  try {
    if (!req.headers.authorization.split(' ')[1]) {
      throw new Error('Access Denied!');
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Access Denied!' });
  }
};

// setup routes
routes.get('/hello1', getHelloWorld);
routes.post('/hello2', postHelloWorld);
routes.get('/hello3', checkAuth, getHelloWorld);

// enables middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import routes into specific parent path
app.use('/api', routes);
app.get('/hello', function(req, res) {
  res.render('demo', { title: 'Hey', message: 'Hello there!', imgUrl: './images/image1.jpg', paragaph: 'testing paragaph' });
});

// express static files
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/images', express.static(path.join(__dirname, 'assets')));
// app.use((req, res, next) =>
//   res.sendFile(path.join(__dirname, './meal-prep/dist/index.html'))
// );

// run node express with listen port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  console.log(`Start your application: http://localhost:${port}`);
});
