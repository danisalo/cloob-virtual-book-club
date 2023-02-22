const express = require('express')
const router = express.Router()

// Models
const Cloob = require('./../models/Cloob.model')
const Event = require('./../models/Event.model')
const User = require('./../models/User.model')
const Comment = require('./../models/Comment.model')
const uploader = require('../config/uploader.config')

const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')


router.get("/", (req, res, next) => {

  const promises = [
    Cloob.find().populate('host', '_id firstName lastName'),
    Cloob.find().populate('host', '_id firstName lastName')
  ]

  Promise
    .all(promises)
    .then(([popularCloobs, recentCloobs]) => {
      popularCloobs.sort((a, b) => b.participants.length - a.participants.length)
      recentCloobs.sort((a, b) => b.createdAt - a.createdAt)
      popularCloobs = popularCloobs.slice(0, 4)
      recentCloobs = recentCloobs.slice(0, 4)

      res.render('index', {
        popularCloobs,
        recentCloobs,
        isAdmin: req.session.currentUser?.role === 'ADMIN'
      })
    })
    .catch(err => next(err))

})



module.exports = router