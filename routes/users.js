var express = require('express')
var router = express.Router()
var db = require('../db/api')
var bcrypt = require('bcrypt')

router.post('/signin', function (req, res, next) {
  db.signIn(req.body.agentName)
    .then(function (agent) {
      //Use bcrypt to log in
      if (agent) {
        //compares existing password and uses bcrypt to test new hash vs stored hash, and sends back
        bcrypt.compare(req.body.password, agent.password, function (err, isMatch) {
          console.log("isMatch: ", isMatch)
          // res == true
        });
        //Route to /Assignment
        console.log(agent)
      } else {
        res.render('index', {
          title: 'gClassified',
          message: 'Incorrect login. Contents will self destruct'
        })
      }
    })
})

router.post('/signup', function (req, res, next) {
  //Use bcrypt to Sign Up
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    // Store hash in your password DB using 'hash' term beneath from hash term in funciton
    db.signUp(req.body.agentName, hash)
      .then(function (agent) {
        if (agent.password === req.body.password) {
          res.render('index', {
            title: 'gClassified',
            message: 'Password Must Be Hashed. Government Secrets are at Stake!'
          })
        } else {
          res.render('index', {
            title: 'gClassified',
            message: 'Sign Up Successful'
          })
        }
      })
  })
})

module.exports = router