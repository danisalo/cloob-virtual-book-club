const express = require('express')
const router = express.Router()

// Models
const Cloob = require('./../models/Cloob.model')
const Event = require('./../models/Event.model')
const User = require('./../models/User.model')

// Middlewares
const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')

// Create Event form render #1
router.get('/crear-evento-1', /*middleware organizer*/(req, res, next) => { res.render('event/create-event-1') })

// Create Event form handler #1
router.post('/crear-evento-1', /*middleware organizer*/(req, res, next) => {
    const { searchBook } = req.body
    // const { currentUser_id } = req.session.currentUser

    Event
        .searchBooks(searchBook)
        // .create({ searchBook, owner: currentUser_id })
        .then(() => res.redirect(`/cloob/${cloob._id}`))
        .catch(err => next(err))
})









// Create Event form render #2
router.get('/crear-evento-2', /*middleware organizer*/(req, res, next) => { res.render('event/create-event') })

// Create Event form handler #2
router.post('/crear-evento-2', /*middleware organizer*/(req, res, next) => {
    const { date, participants } = req.body
    const { currentUser_id } = req.session.currentUser

    Event
        .create({ date, participants, owner: currentUser_id })
        .then(() => res.redirect(`/cloob/${cloob._id}`))
        .catch(err => next(err))
})





module.exports = router
