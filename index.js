const express = require('express');
const hbs = require('hbs');//handle bars for templating


var app = express();

hbs.registerPartials(__dirname + "/views/Partials")
app.set('veiw engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
 //res.send('<h1>hello Express</h1>');
 res.render('home.hbs', {
   pageTitle: 'home page',
   pageGreeting: 'Welcome to Our Website',
   currntYear: new Date().getFullYear()
 });
});

app.get('/about', (req, res) => {
 res.render('about.hbs', {
   pageTitle: 'About Page',
   currntYear: new Date().getFullYear()
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
app.listen(3000, () =>{
 console.log('server is running on port 3000');
});
