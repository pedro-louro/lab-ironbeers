const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});



// // Route to the /beers Call getBeers with .then
// app.get("/beers", (req, res) => {
//   punkAPI.getBeers().then((response) => {
//     res.render("beers", {response})
//   });
// });

// // Route to the /beers Call getBeers with .then
app.get("/beers", async (req, res) => {
    try {
      const beers = await punkAPI.getBeers();
      res.render("beers", {beers})  
    }
    catch (e) {
      console.log(e)
    }
  });


// Route to the /random-beers with .then

// app.get("/random-beer", (req, res) => {
//   punkAPI.getRandom().then((response) => {
//     console.log(response);
//     res.render("random-beer", {response})
//   });
// });

// Route to the /random-beers with async await
app.get("/random-beer", async (req, res) => {
  try {
    const randomBeer = await punkAPI.getRandom();
    res.render("random-beer", {randomBeer})
  }
  catch (e) {
    console.log(e)
  }
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
