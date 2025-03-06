const express = require('express');
const app = express();
const port = 3000

app.get('/', function (req, res) {
    res.send('Hello <b>world 236</b>');
})

app.listen(port, function(){
    console.log(`listening in port ${port}`);
})