const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// Models
const Cloob = require('./../models/Cloob.model')
const Event = require('./../models/Event.model')
const User = require('./../models/User.model')
const uploader = require('../config/uploader.config')

// Middlewares
const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')

const saltRounds = 10

// Sign-up form render
router.get('/registro', isLoggedOut, (req, res) => { res.render('auth/signup-form') })

// Sign-up form handling
router.post('/registro', uploader.single('avatar'), (req, res) => {

    const { firstName, lastName, username, email, userPassword } = req.body
    const { path: avatar } = req.file
    // if (username) {
    //     res.render('auth/signup-form', { errorMessage: 'Username ya en uso' })
    //     return
    // }
    // if (email) {
    //     res.render('auth/signup-form', { errorMessage: 'email ya en uso' })
    //     return
    // }
    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPassword, salt))
        .then(hashPassword => User.create({ firstName, lastName, username, email, avatar, userPassword: hashPassword }))
        .then(() => res.redirect('/iniciar-sesion'))
        .catch(err => console.log(err))
})

// Log-in form render
router.get('/iniciar-sesion', isLoggedOut, (req, res) => { res.render('auth/login-form') })

// Log-in form handler
router.post('/iniciar-sesion', (req, res) => {

    const { email, userPassword } = req.body

    if (email.length === 0 || userPassword.length === 0) {
        res.render('auth/login-form', { errorMessage: 'Por favor, rellena los campos' })
        return
    }

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login-form', { errorMessage: 'Datos incorrectos' })
            }
            else if (!bcrypt.compareSync(userPassword, user.userPassword)) {
                res.render('auth/login-form', { errorMessage: 'Datos incorrectos' })
            }
            else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
})

// Log-out
router.get('/cerrar-sesion', (req, res) => { req.session.destroy(() => res.redirect('/')) })

module.exports = router