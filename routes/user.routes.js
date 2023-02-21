const express = require('express')
const router = express.Router()

//Models
const Cloob = require('./../models/Cloob.model')
const Event = require('./../models/Event.model')
const User = require('./../models/User.model')

// Middlewares
const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')


//Agregar Cloobs
router.post('/agregar/:cloob_id', isLoggedIn, (req, res, next) => {
    const { cloob_id } = req.params
    const user_id = req.session.currentUser?._id
    User
        .findByIdAndUpdate(user_id, { $addToSet: { myCloobs: cloob_id } })
        .then(() => res.redirect('/user/my-profile'))
        .catch(err => next(err))
})


// Perfil
router.get("/mi-perfil", (req, res, next) => {
    const { user_id } = req.params

    User
        .findById(user_id)
        .populate({
            path: 'myFriends',
            select: '_id firstName lastName',
            sort: { name: 1 }
        })
        .populate({
            path: 'myCloobs',
            select: '_id name',
            sort: { name: 1 }
        })
        .then(user => res.render("user/my-profile", user))
        .catch(err => next(err))
})


module.exports = router