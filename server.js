 const express = require('express');
 const hbs = require('hbs');//handle bars for templating
 const fs = require('fs');
 const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname + "/views/Partials")
app.set('veiw engine', 'hbs');


app.use((req, res, next) =>{
  var now = new Date().toString();
  var log =(`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('repair.hbs', {
//     pageTitle: 'maintanance'
//   });
//
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

app.get('/', (req, res) =>{
  //res.send('<h1>hello Express</h1>');
  res.render('home.hbs', {
    pageTitle: 'home page',
    pageGreeting: 'Welcome to Our Website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});
// replace send with render since its a dynamic page
// app.get('/about', (req, res) => {
//   res.send('About Page');
// });
app.get('/bad', (req, res) => {
  res.send({
    request_type: 'bad reques',
    errorMessage: 'Opps something went wrong'
  });
});
app.listen(port, () =>{
  console.log('server is running on port 3000');
});
