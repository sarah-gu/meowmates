var express = require('express');
var app = express();
var simpleoauth2 = require("simple-oauth2");
var path = require('path');
var hbs = require('hbs');
var request = require('request');
var fs = require('fs');
var mysql = require('mysql');
var cookieSession = require('cookie-session')
// -------------- express initialization -------------- //
app.set('port', process.env.PORT || 8080 );
app.set('view engine', 'hbs');

// -------------- serve static folders -------------- //
app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/img', express.static(path.join(__dirname, 'img')))
app.use(cookieSession({
  name: 'loginCookie',                         
  keys: ['key1', 'key2']   
}))
// -------------- variable definition -------------- //
var visitorCount = 0; 
var ion_client_id = 'KEaF2x04oK9lnG9g5UfwOuTuXizfIIm45VHDXSAz';
var ion_client_secret = 'aSo48SpuO69U5bTnXWtCJtHUSfgXDQNo2rNeWH8mHmtUDpBydeY4JLFIbHJMaqTi5XnXvEAJAQx8eUCDPztdtupcmZ7OdXBRqLhuu02BGQgccufgMhe923bZrEWPj30w';
var ion_redirect_uri = 'https://user.tjhsst.edu/2020sgu/login_worker'; 
var oauth2 = simpleoauth2.create({
  client: {
    id: ion_client_id,
    secret: ion_client_secret,
  },
  auth: {
    tokenHost: 'https://ion.tjhsst.edu/oauth/',
    authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
    tokenPath: 'https://ion.tjhsst.edu/oauth/token/'
  }
});
var pool  = mysql.createPool({
  connectionLimit : 10,
  user            : 'site_meowmates',
  password        : 'jdPH5ExnX62mH7KSDYthtVZh',
  host            : 'mysql1.csl.tjhsst.edu',
  port            : 3306,
  database        : 'site_meowmates'
});
var authorizationUri = oauth2.authorizationCode.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri
});
app.get('/', function(req, res){
    console.log('no sub-page');
    res.sendFile(__dirname + '/htmls/home.html');
});
app.get('/login', function(req, res){
    console.log('no sub-page');
    res.sendFile(__dirname + '/htmls/login.html');
});
app.get('/match', function(req, res){
    if(typeof(req.session.username) == 'undefined')
    {
        res.send("login to view this content!"); 
    }
    res.send("page coming soon!")
    // res.sendFile(__dirname + '/htmls/match.html');
});
app.get('/register', function(req, res){
    console.log('no sub-page');
    res.sendFile(__dirname + '/htmls/register.html');
});
app.get('/validateLogin', function(req, res){
    var username = req.query.lg_username; 
    var password = req.query.lg_password; 
    if(password === ''|| username === '')
      {
        res.send("Try again! ");
      }
    else {
        pool.query('CALL check_pass(?,?);', [username,password], function (error, results, fields) {
          if (error) throw error;
          console.log(results[0]);
    
          if(typeof(results[0]) == 'undefined')
          {
             res.send("incorrect login");
          }
            else {
            req.session.username = username; 
            console.log(req.session.username); 
            res.send("");
          }
        });
    }
});
app.get('/registerVal', function(req, res){
    var username = req.query.reg_username; 
    var password = req.query.reg_password; 
    var email = req.query.reg_email; 
    var fullusername = req.query.reg_fullname; 
    console.log(email); 
    if(password === ''|| username === '' || email === '' || fullusername === '')
      {
        res.send("Try again! ");
      }
    else {
        pool.query('CALL add_owner(?,?,?,?);', [username,password,email,fullusername], function (error, results, fields) {
          if (error) throw error;
            console.log(results[0]);
          if(typeof(results[0]) == 'undefined')
          {
             res.send("change your username");
          }
            else {
            res.send("");
          }
        });
    }
});

// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});







