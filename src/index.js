import 'dotenv/config';
import cors from 'cors';
import express from 'express';

// Hardcoded fake database
import models from './models';

const app = express();
const PORT = process.env.PORT || 3000;

// Application-Level Middleware
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
    };
    next();
});

// app.use((req, res, next) => {
//     console.log(`Request: ${req.method} ${req.url}`);
//     console.log(`Time: ${Date(Date.now())}`);

//     // psuedo authenticated user
//     req.me = users[1];
//     console.log(`Custom middleware added hard coded user to request: ${req.me.username}}`);
//     next();
// });

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

// RESTish for pseudo authenticated user
app.get('/session', (req, res) => {	
    return res.send(req.context.models.users[req.context.me.id]);
});

app.get('/users', (req, res) => {
    return res.send(Object.values(req.context.models.users));
});

app.get('/users/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
});

app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
});

app.put('/users/:userId', (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.get('/messages', (req, res) => {
    return res.send(Object.values(req.context.models.messages));});

app.get('/messages/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId]);
});

app.post('/messages', (req, res) => {
    // const date = Date.parse(req.body.date);
    // const count = Number(req.body.count);

    const id = db.id();
    const message = {
        id,
        text: req.body.text,
        userId: req.context.me.id,
    };
    req.context.models.messages[id] = message;
    return res.send(message);
});


app.delete('/messages/:messageId', (req, res) => {
    const {
      [req.params.messageId]: message,
      ...otherMessages
    } = req.context.models.messages;
  
    req.context.models.messages = otherMessages;
  
    return res.send(message);
  });





app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
