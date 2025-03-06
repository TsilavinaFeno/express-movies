const express = require('express');
const app = express();
const port = 3000

app.use('/static', express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
})

app.get('/movies', (req, res) => {
    res.render('movies');
})

app.get('/movies/add', (req, res) => {
    res.send(`Bientôt un formulaire ici`);
})

app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    // res.send(`Film numéro ${id}`);
    const title = "Terminator";
    res.render('movies-details', { moviesId: id, title: title })
})

app.listen(port, function(){
    console.log(`listening in port ${port}`);
})