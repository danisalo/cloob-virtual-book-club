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
const bookApi = new ApiServiceBooks()

// Middlewares
const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')

// Buscador
router.get('/:cloob_id/buscar-libro', (req, res, next) => {

    const { cloob_id } = req.params
    console.log(cloob_id)
    res.render('event/search-book', { cloob_id })
})

// Selector form render
router.get('/:cloob_id/seleccionar-libro', (req, res, next) => {

    const { cloob_id } = req.params
    const searchBook = req.query.search

    bookApi
        .searchBooks(searchBook)
        .then((data) => {
            const books = data.items
            res.render(`event/select-book`, { cloob_id, books })
        })
        .catch(err => next(err))
})


// Selector form handler
router.get('/:cloob_id/crear-evento/:book_id', (req, res, next) => {

    const { cloob_id } = req.params
    const { book_id } = req.params

    bookApi
        .getBookById(book_id)
        .then((book) => {
            res.render('event/create-event', { cloob_id, book, bookId: book.id })
        })
        .catch(err => next(err))
})


// Create Event form handler
router.post('/:cloob_id/crear-evento', (req, res, next) => {

    const { cloob_id } = req.params
    const { date, participants, bookId } = req.body
    const { _id: owner } = req.session.currentUser

    Event
        .create({ date, participants, bookId, owner })
        .then((newEvent) => {
            return Cloob
                .findByIdAndUpdate(cloob_id, { $addToSet: { events: newEvent } }, { new: true })
        })
        .then(() => res.redirect(`/cloob/lista`))
        .catch(err => next(err))
})

// Details
router.get('/detalles/:event_id', isLoggedIn, (req, res, next) => {

    // const { cloob_id } = req.params
    const { event_id } = req.params

    Event
        .findById(event_id)
        .populate({
            path: 'participants bookId'
        })
        .then(event => {
            bookApi.getBookById(event.bookId)
                .then(book => res.render('event/event-details', {
                    book,
                    event,
                    isAdmin: req.session.currentUser?.role === 'ADMIN'
                }))
                .catch(err => next(err))
        })

        .catch(err => next(err))
})


router.post('/agregar/:event_id', isLoggedIn, (req, res, next) => {

    const { event_id } = req.params
    const user_id = req.session.currentUser?._id

    Event
        .findByIdAndUpdate(event_id, { $addToSet: { participants: user_id } }, { new: true })
        .then(() => {
            return User
                .findByIdAndUpdate(user_id, { $addToSet: { myEvents: event_id } }, { new: true })
        })
        .then(() => res.redirect("back"))
        .catch(err => next(err))
})


router.post('/eliminar/:event_id', isLoggedIn, checkRole('ADMIN', 'EDITOR'), (req, res, next) => {

    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/cloob/lista'))
        .catch(err => next(err))
})



module.exports = router