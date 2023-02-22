const express = require('express')
const router = express.Router()

// Models
const Cloob = require('./../models/Cloob.model')
const Event = require('./../models/Event.model')
const User = require('./../models/User.model')
const Comment = require('./../models/Comment.model')
const uploader = require('../config/uploader.config')

// API
const ApiServiceBooks = require('../services/books.service')
const eventApi = new ApiServiceBooks()

// Middlewares
const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')

// Buscador
router.get('/buscar-libro', (req, res, next) => {
    res.render('event/search-book')
})

// Selector form render
router.get('/seleccionar-libro', (req, res, next) => {

    const searchBook = req.query.search

    eventApi
        .searchBooks(searchBook)
        .then((data) => {
            const books = data.items
            res.render(`event/select-book`, { books })
        })
        .catch(err => next(err))
})


// Selector form handler
router.post('/seleccionar-libro/:book_id', (req, res, next) => {
    const { book_id } = req.params
    res.render('event/create-event', { book_id })
})


// Create Event form render
router.get('/crear-evento', (req, res, next) => {
    const { book_id } = req.params
    res.render('event/create-event', { book_id })
})



// Create Event form handler
router.post('/crear-evento', /*middleware organizer*/(req, res, next) => {

    const { date, participants } = req.body
    const { _id: owner } = req.session.currentUser

    Event
        .create({ date, participants, owner })
        .then(() => res.redirect(`/cloob/${cloob._id}`))
        .catch(err => next(err))
})

module.exports = router