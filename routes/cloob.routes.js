const express = require('express')
const router = express.Router()
// Models
const Cloob = require('./../models/Cloob.model')
const Event = require('./../models/Event.model')
const User = require('./../models/User.model')

const uploader = require('../config/uploader.config')

// Middlewares
const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')

////////////////////////////////////////////

router.get('/lista', isLoggedIn, (req, res, next) => {

    Cloob
        .find()
        .then(cloobs => {
            res.render('cloob/list', {
                cloobs: cloobs,
                isAdmin: req.session.currentUser?.role === 'ADMIN',       // ROLES: contenido renderizado por rol
                // isEditor: req.session.currentUser?.role === 'EDITOR',
            })
        })
        .catch(err => next(err))
})


router.get('/mis-cloobs', isLoggedIn, (req, res, next) => {

    Cloob
        .find({ owner: req.session.currentUser._id })             // CONTENIDO PROPIETARIO: filtrar por dueño/a
        .then(cloobs => res.render('cloobs/list', { cloobs }))
        .catch(err => next(err))
})


// Create form render
router.get('/crear', isLoggedIn, (req, res) => {
    res.render('cloob/new-cloob-form')
})


// Create form handling
router.post('/crear', isLoggedIn, uploader.single('cover'), (req, res, next) => {

    const { name, description, maxParticipants } = req.body
    const { _id } = req.session.currentUser                   // CONTENIDO PROPIETARIO: almacenar ID en creación
    const { path: cover } = req.file
    Cloob
        .create({ name, description, maxParticipants, cover, host: _id })
        .then(cloob => res.redirect('/'))
        .catch(err => next(err))
})


// Render cloob details
router.get('/detalles/:cloob_id', (req, res, next) => {

    const { cloob_id } = req.params

    Cloob
        .findById(cloob_id)
        .then(cloob => res.render('cloob/cloob-details', cloob))
        .catch(err => next(err))
})


// Edit form render
router.get('/editar/:cloob_id', isLoggedIn, checkRole('ADMIN', 'HOST'), (req, res, next) => {    // ROLES: acceso por rol

    const { cloob_id } = req.params

    Cloob
        .findById(cloob_id)
        .then(cloob => res.render('cloob/edit-cloob-form', cloob))
        .catch(err => next(err))
})


// Edit form handler
router.post('/editar', isLoggedIn, checkRole('ADMIN', 'EDITOR'), (req, res) => {         // ROLES: acceso por rol

    const { name, description, maxParticipants, cover, cloob_id } = req.body

    Cloob
        .findByIdAndUpdate(cloob_id, { name, description, maxParticipants, cover })
        .then(cloob => res.redirect(`/cloob/${cloob._id}`))
        .catch(err => console.log(err))
})



// Delete cloob
router.post('/eliminar/:cloob_id', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {          // ROLES: acceso por rol

    const { cloob_id } = req.params

    Cloob
        .findByIdAndDelete(cloob_id)
        .then(() => res.redirect('/cloob/lista'))
        .catch(err => next(err))
})


module.exports = router