const express = require('express')
const router = express.Router()

//Models
const Cloob = require('./../models/Cloob.model')
const Event = require('./../models/Event.model')
const User = require('./../models/User.model')

// Middlewares
const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')

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