const express = require('express')
const router = express.Router()

// Models
const Cloob = require('./../models/Cloob.model')
const Event = require('./../models/Event.model')
const User = require('./../models/User.model')
const Comment = require('./../models/Comment.model')
const uploader = require('../config/uploader.config')

// Middlewares
const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')

// Mi Perfil
router.get("/mi-perfil", (req, res, next) => {

    const { _id: currentUserID } = req.session.currentUser

    User
        .findById(currentUserID)
        .populate({
            path: 'myFriends',
            sort: { name: 1 }
        })
        .populate({
            path: 'myCloobs',
            sort: { name: 1 }
        })
        .then(currentUser => {
            res.render("user/my-profile", currentUser)
        })
        .catch(err => next(err))
})

// Otro Perfil
router.get("/perfil/:user_id", (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .populate({
            path: 'myFriends',
            sort: { name: 1 }
        })
        .populate({
            path: 'myCloobs',
            sort: { name: 1 }
        })
        .then(user => {
            res.render("user/profile", user)
        })
        .catch(err => next(err))
})


// Add to My Friends
router.post('/agregar/:user_id', (req, res, next) => {

    const { user_id } = req.params
    const currentUser_id = req.session.currentUser?._id

    User
        .findByIdAndUpdate(currentUser_id, { $addToSet: { myFriends: user_id } }, { new: true })
        .then(() => res.redirect("back"))
        .catch(err => next(err))
})

// Edit User form render
router.get('/user/editar', (req, res, next) => {

    const { _id: currentUserID } = req.session.currentUser

    User
        .findById(currentUserID)
        .then(user => res.render('user/edit-user-form', user))
        .catch(err => next(err))
})


// Edit User form handler
router.post('/user/editar', uploader.single('avatar'), (req, res, next) => {

    const { firstName, lastName, username, email, user_id } = req.body
    const { path: avatar } = req.file
    // const { _id: currentUserID } = req.session.currentUser

    User
        .findByIdAndUpdate(user_id, { firstName, lastName, username, email, avatar })
        .then(() => res.redirect("/mi-perfil"))
        .catch(err => next(err))
})




module.exports = router