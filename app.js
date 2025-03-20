const express = require('express');
const app = express();
const port = 3000
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
const axios = require('axios')

app.use('/static', express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

let movies

app.get('/', function (req, res) {
    res.render('index');
})

app.get('/movies', (req, res) => {
    const title = "Listes des films";
    movies = [
        { title: 'Le fabuleux destin d\'Amélie Poulin', year: 2001 },
        { title: 'Buffet froid', year: 1979 },
        { title: 'Le dinner de cons', year: 1998 },
        { title: 'De rouille et d\'os', year: 2012 },
    ];
    // res.render('movies');
    res.render('movies', { movies: movies, title: title })
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.post('/movies', urlencodedParser, (req, res) => {
//     console.log(req.body)

//     const newMovie = { title: req.body.movietitle, year: req.body.movieyear }
//     // movies.push(newMovie)
//     movies = [...movies, newMovie]
//     console.log(movies)

//     res.sendStatus(201)
// })

app.post('/movies', upload.fields([]), (req, res) => {
    if (!req.body) {
        return res.sendStatus(501)
    } else {
        const formData = req.body
        console.log('formData : ', formData)
        const newMovie = { title: req.body.movietitle, year: req.body.movieyear }
        movies = [...movies, newMovie]
        console.log(movies)

        res.sendStatus(201)
    }
})

app.get('/movie-search', (req, res) => {
    res.render('movie-search')
})

app.get('/search', (req, res) => {
    const movies = ""
    res.render('search', { movies: movies })
})

app.post('/search', urlencodedParser, async (req, res) => {
    console.log(req.body);

    const query = req.body.search; // Assuming the frontend sends { query: "movie name" }
    const apiKey = '3c42ae2c51fa60a4d2d3dce24bc4eb1b';
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&language=fr-FR`;

    try {
        const response = await axios.get(url);
        const movies = response.data.results;

        res.render('search', { movies }); // Passing movies data to the template
    } catch (error) {
        console.error('Error fetching data from TMDb:', error);
        res.status(500).send('Error fetching movie data');
    }
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

app.listen(port, function () {
    console.log(`listening in port ${port}`);
})