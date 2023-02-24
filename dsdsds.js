const express = require('express')
const router = express.Router()

// Models
const Cloob = require('./../models/Cloob.model')
const Event = require('./../models/Event.model')

// Details Cloob
router.get('/detalles/:cloob_id', isLoggedIn, (req, res, next) => {

    const { cloob_id } = req.params

    Cloob
        .findById(cloob_id)
        .populate({
            path: 'participants host events'
        })
        .then(cloob => res.render('cloob/cloob-details', {
            cloob,
            isAdmin: req.session.currentUser?.role === 'ADMIN'
        }))
        .catch(err => next(err))
})

module.exports = router


// Here is the code I am using

// This next piece is my Service => The API

const axios = require('axios')

class ApiServiceBooks {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://www.googleapis.com/books/v1'
        })
    }

    searchBooks(query) {
        return this.api.get(`/volumes?q=${query}`).then(({ data }) => data)
    }

    getBookById(id) {
        return this.api.get(`/volumes/${id}`).then(({ data }) => data)
    }
}

module.exports = ApiServiceBooks

// And lastly, this is a reference of another part where I am trying to achieve the same goal in a different scenario

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