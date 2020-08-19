let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  //extended: false
  extended: true
}));

// Express Routes
const searchRoute = require('./routes/search');
app.use('/get-TVSereies', searchRoute);

// PORT 
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Connected to port ' + port)
})


/*
var TVShows = require("./data.json")

TVShows.shows.map((TVShowName) => {
    for(let i=0; i< TVShows.shows.length; i++){
        return console.log(TVShowName)
                            
       }
    }) */




