const express = require('express');
const app = express();
const port = 3000

app.get('/', function (req, res) {
    res.send('Hello <b>world 236</b>');
})

app.get('/movies', (req, res) => {
    res.send('Bientôt des films ici');
})

app.get('/movies/add', (req, res) => {
    res.send(`Bientôt un formulaire ici`);
})

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Film numéro ${id}`);
})

app.listen(port, function(){
    console.log(`listening in port ${port}`);
})