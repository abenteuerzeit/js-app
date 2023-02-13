import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';
import routes from './routes';

// Hardcoded fake database
import models from './models';


const app = express();
const PORT = process.env.PORT || 3000;
const eraseDatabaseOnSync = true;

// Third-party middleware
app.use(cors()); 

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
        uuid: models.uuid,
    };
    next();
});

// app.use((req, res, next) => {
//     console.log(`Request: ${req.method} ${req.url}`);
//     console.log(`Time: ${Date(Date.now())}`);

//     req.me = users[1];
//     console.log(`Custom middleware added hard coded user to request: ${req.me.username}}`);
//     next();
// });

// Routes
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);


app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});


sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
});