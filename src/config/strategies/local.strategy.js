var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  mongodb = require('mongodb').MongoClient;

module.exports = function() {
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, done) {
      var url = 'mongodb://<ec>:<ec123>@ds125053.mlab.com:25053/college-connection';
      mongodb.connect(url, function(err, db) {
        var collection = db.collection('users');
        collection.findOne({
            username: username
          },
          function(err, results) {
            if (results.password === password) {
              var user = results;
              done(null, user);
            } else {
              done(null, false, {
                message: 'bad password'
              });
            }

          }
        );
      });
    }));
};