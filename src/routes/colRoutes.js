var express = require('express');
var colRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId= require('mongodb').ObjectID;
var router = function(nav) {
 
  colRouter.use(function(req, res, next) {
    if (!req.user) {
      res.redirect('/');
    }
    next();
  });
  colRouter.route('/')
    .get(function(req, res) {
      var url =
      'mongodb://<ec>:<ec123>@ds125053.mlab.com:25053/college-connection';
          mongodb.connect(url, function (err, db) {
            var collection = db.collection('colleges');
            collection.find({}).toArray(
              function(err,results){
                  res.render('colListView', {
                    nav: nav,
                    college: results
                  });
              })
          });
    });

  colRouter.route('/:id')
    .get(function(req, res) {
      var id = new objectId(req.params.id);
      var url =
      'mongodb://<ec>:<ec123>@ds125053.mlab.com:25053/college-connection';
          mongodb.connect(url, function (err, db) {
          var collection = db.collection('colleges');
            collection.findOne({_id: id},
              function(err,results){
                  res.render('colView', {
                    nav: nav,
                    college: results
                  });
              });
              
          })
      
     
    });

  return colRouter;
};


module.exports = router;