const express = require('express');
const app = express();
app.use(express.json());
 
const contacts = [
{title: 'Sathish', id: 1},
{title: 'Thiru', id: 2}
]
 
//READ Request Handlers
app.get('/', (req, res) => {
res.send('Welcome to Face2Face API Server');
});
 
app.get('/api/contacts', (req,res)=> {
res.send(contacts);
});
 
app.get('/api/contacts/:id', (req, res) => {
const contact = contacts.find(c => c.id === parseInt(req.params.id));
 
if (!contact) res.status(404).send('Contact Not Found!!');
res.send(contact);
});
 
//CREATE Request Handler
app.post('/api/contacts', (req, res)=> {
 

const contact = {
id: contacts.length + 1,
title: req.body.title
};
contacts.push(contact);
res.send(contact);
});
 
//UPDATE Request Handler
app.put('/api/contacts/:id', (req, res) => {
const contact = contacts.find(c=> c.id === parseInt(req.params.id));
if (!contact) res.status(404).send('Contact Not Found!');
 

 
contact.title = req.body.title;
res.send(contact);
});
 
//DELETE Request Handler
app.delete('/api/contacts/:id', (req, res) => {
 
const contact = contacts.find( c=> c.id === parseInt(req.params.id));
if(!contact) res.status(404).send('Contact Not Found!!');
 
const index = contacts.indexOf(contact);
contacts.splice(index,1);
 
res.send(contact);
});
 
 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));