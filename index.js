const express = require('express');
const app = express();
app.use(express.json());

const contacts = [{
        cname: 'Sathish',
        cnumber: 'OTg0MDcxNDYyMw=='
    },
    {
        cname: 'Thiru',
        cnumber: 'OTg0MDE1MTAwOA=='
    }
]

//READ Request Handlers
app.get('/', (req, res) => {
    res.send('Welcome to Face2Face API Server');
});

app.get('/api/contacts', (req, res) => {
    res.send(contacts);
});

app.get('/api/contacts/:id', (req, res) => {
    const contact = contacts.find(c => c.cnumber === req.params.id);

    if (!contact) res.status(404).send('Contact Not Found!!');
    res.send(contact);
});

//CREATE Request Handler
app.post('/api/contacts', (req, res) => {
    const contact = {
        cnumber: req.body.cnumber,
        cname: req.body.cname
    };
    contacts.push(contact);
    res.send(contact);
});

//UPDATE Request Handler
app.put('/api/contacts/:id', (req, res) => {
    const contact = contacts.find(c => c.cnumber === req.params.id);
    if (!contact) res.status(404).send('Contact Not Found!');
    contact.cname = req.body.cname;
    res.send(contact);
});

//DELETE Request Handler
app.delete('/api/contacts/:id', (req, res) => {
    const contact = contacts.find(c => c.cnumber === req.params.id);
    if (!contact) res.status(404).send('Contact Not Found!!');
    const index = contacts.indexOf(contact);
    contacts.splice(index, 1);
    res.send(contact);
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));