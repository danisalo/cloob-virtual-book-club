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
            console.log("EL BICHO", currentUser)
            res.render("user/my-profile", currentUser)
        })
        .catch(err => next(err))
})


module.exports = router