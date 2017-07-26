var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var nodemailer = require('nodemailer');

var port = process.env.PORT || 5000;
var nav = [{
  Links: '/Colleges',
  Text: 'Colleges'
}, {
  Links: '/Contact',
  Text: 'Contact'
}];

var colRouter = require('./src/routes/colRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('a'));
app.use(session({
  secert: 'library'
}));

require('./src/config/passport')(app);
app.use(express.static(__dirname + '/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
//app.use(express.static(__dirname + '/src/views'));


app.use('/Colleges', colRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
  res.render('index', {
    nav: nav
  });
});

app.get('/Contact', function(req, res) {
  res.render('contact', {
    nav: nav
  });
})

app.post('/Contact', function(req, res){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'collegeconnection17@gmail.com',
      pass: 'Connect123!'
    }
  });

  var mailOptions = {
    from: 'evan ciavaglia <collegeconnection17@gmail.com',
    to: 'collegeconnection17@gmail.com',
    subject: 'Website submission',
    text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+'Message: '+req.body.message+
    //html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
  

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.redirect('/');
    }else{
      console.log('Message Sent: '+info.response);
      res.redirect('/');
    }
  }) 
}
});

app.get('/Colleges', function(req, res) {
  res.send('colleges');
});

app.listen(port, function(err) {
  console.log('running');
});