import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 3000;

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

// app.use('/', checkAuth);
app.use(cors());

app.get('/api/hello', (req, res) => {
    // res.send('Hello World!');
    console.log(req.query.query.toString());
    res.json({ message: 'Hello World!' });
});

app.use('/images', express.static(path.join(__dirname, 'assets')));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, './meal-prep/dist', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
