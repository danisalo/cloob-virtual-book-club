const express = require('express')
const router = express.Router()

// Models
const Cloob = require('../models/Cloob.model')
const Event = require('../models/Event.model')
const User = require('../models/User.model')
const Comment = require('../models/Comment.model')
const uploader = require('../config/uploader.config')

// Middlewares
const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')

// CRUD


// CAMBIAR
router.post('/crear-evento-2', /*middleware organizer*/(req, res, next) => {

    const { date, participants } = req.body
    const { _id: owner } = req.session.currentUser

    Event
        .create({ date, participants, owner })
        .then((XXXX) => {
            Comment
                .find({ XXX: XXX_id })
                .populate('owner')
                .then((comments) => res.render('XXXX', { XXX, comments }))
        })
        .catch(err => next(err))
})



module.exports = router