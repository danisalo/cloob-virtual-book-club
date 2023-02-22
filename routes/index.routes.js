const express = require('express')
const router = express.Router()

const Cloob = require('./../models/Cloob.model')

const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')


router.get("/", (req, res, next) => {

  const promises = [Cloob.find(), Cloob.find()]

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

  // Cloob
  //   .find()
  //   .populate({
  //     path: 'host',
  //     select: '_id firstName lastName'
  //   })
  //   // .limit(4)
  //   // .then(allCloobs => {
  //   //   return popularCloobs = allCloobs.sort((a, b) => b.participants.length - a.participants.length)
  //   // })
  //   .then(allCloobs => {
  //     recentCloobs = allCloobs.sort((a, b) => b.createdAt - a.createdAt)
  //   })
  //   .then(() => res.render('index', {
  //     recentCloobs,
  //     // popularCloobs,
  //     isAdmin: req.session.currentUser?.role === 'ADMIN'
  //   }))
  //   .catch(err => next(err))

})



module.exports = router