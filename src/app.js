require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');

// importing gecode and forecast functions
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const viewPath = path.join(__dirname, '../templates/views');
const publicAssetsPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Setup static assets directory
app.use(express.static(publicAssetsPath));

app.get('', (req, res) => {
  res.render('index', { title: 'Weather App', author: 'Kater Akeren' });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me', author: 'Kater Akeren' });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    text: 'This is some content of....',
    author: 'Kater Akeren'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide an Address!'
    });
  }

  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(longitude, latitude, (error, { message }) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        forecast: message,
        address
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found!',
    author: 'Kater Akeren',
    title: '404'
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page Not Found!',
    author: 'Kater Akeren',
    title: '404'
  });
});
// Export the app object
module.exports = { app };
