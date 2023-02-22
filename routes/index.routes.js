const express = require('express')
const router = express.Router()

const Cloob = require('./../models/Cloob.model')

const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')


router.get("/", (req, res, next) => {

  Cloob
    .find()
    .populate({
      path: 'host',
      select: '_id firstName lastName'
    })
    .sort({
      maxParticipants: -1,
      createdAt: -1
    })
    .limit(4)
    .then(cloobs => res.render('index', {
      cloobs,
      isAdmin: req.session.currentUser?.role === 'ADMIN'
    }))
    .catch(err => next(err))

})



module.exports = router