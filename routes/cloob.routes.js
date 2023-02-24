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

// List Cloobs
router.get('/lista', isLoggedIn, (req, res, next) => {

    Cloob
        .find()
        .populate({
            path: 'host',
            select: '_id firstName lastName'
        })
        .sort({ name: 1 })
        .then(cloobs => res.render('cloob/list', {
            cloobs,
            isAdmin: req.session.currentUser?.role === 'ADMIN',
        }))
        .catch(err => next(err))
})


// Add to My Cloobs
router.post('/agregar/:cloob_id', isLoggedIn, (req, res, next) => {

    const { cloob_id } = req.params
    const user_id = req.session.currentUser?._id

    Cloob
        .findByIdAndUpdate(cloob_id, { $addToSet: { participants: user_id } }, { new: true })
        .then(() => {
            return User
                .findByIdAndUpdate(user_id, { $addToSet: { myCloobs: cloob_id } }, { new: true })
        })
        .then(() => res.redirect("back"))
        .catch(err => next(err))
})


// List My Cloobs
router.get('/mis-cloobs', isLoggedIn, (req, res, next) => {

    Cloob
        .find({ owner: req.session.currentUser._id })
        // select
        // sort
        .then(cloobs => res.render('cloobs/list', { cloobs }))
        .catch(err => next(err))
})


// Create Cloob form render
router.get('/crear', isLoggedIn, (req, res) => {

    res.render('cloob/new-cloob-form')
})


// Create Cloob form handling
router.post('/crear', isLoggedIn, uploader.single('cover'), (req, res, next) => {

    const { name, description, maxParticipants } = req.body
    const { _id: host } = req.session.currentUser
    const { path: cover } = req.file

    Cloob
        .create({ name, description, maxParticipants, cover, host })
        .then(() => res.redirect('/cloob/lista'))
        .catch(err => next(err))
})

// Details Cloob
router.get('/detalles/:cloob_id', isLoggedIn, (req, res, next) => {

    const { cloob_id } = req.params

    let klu = []

    Cloob
        .findById(cloob_id)
        .populate({
            path: 'participants host events'
        })
        .then(cloob => {
            klu = cloob
            const promises = cloob.events.map(({ bookId }) => bookApi.getBookById(bookId))
            return Promise.all(promises)



        })
        .then(values => {
            const images = values.map(({ volumeInfo }) => volumeInfo.imageLinks.thumbnail)

            klu._doc.events = klu.events.map((event, index) => {
                const { _doc } = event
                return ({ ..._doc, bookId: images[index], date: _doc.date.toDateString() })
            })

            res.render('cloob/cloob-details', {
                cloob: klu,
                isAdmin: req.session.currentUser?.role === 'ADMIN'
            })
        })
        .catch(err => next(err))
})


// Edit Cloob form render
router.get('/editar/:cloob_id', isLoggedIn, checkRole('ADMIN', 'HOST'), (req, res, next) => {

    const { cloob_id } = req.params

    Cloob
        .findById(cloob_id)
        .then(cloob => res.render('cloob/edit-cloob-form', cloob))
        .catch(err => next(err))
})


// Edit Cloob form handler
router.post('/editar', isLoggedIn, checkRole('ADMIN', 'EDITOR'), uploader.single('cover'), (req, res, next) => {

    const { name, description, maxParticipants, cloob_id } = req.body
    const { path: cover } = req.file

    Cloob
        .findByIdAndUpdate(cloob_id, { name, description, maxParticipants, cover })
        .then(() => res.redirect(`/cloob/detalles/${cloob_id}`))
        .catch(err => next(err))
})


// Delete Cloob
router.post('/eliminar/:cloob_id', isLoggedIn, checkRole('ADMIN', 'EDITOR'), (req, res, next) => {

    const { cloob_id } = req.params

    Cloob
        .findByIdAndDelete(cloob_id)
        .then(() => res.redirect("back"))
        .catch(err => next(err))
})



module.exports = router