const express = require('express')
const router = express.Router()

//Models
const Cloob = require('./../models/Cloob.model')
const Event = require('./../models/Event.model')
const User = require('./../models/User.model')

// Middlewares
const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')

// Perfil
router.get("/perfil", (req, res, next) => {
    const { user_id } = req.params
    res.render("user/profile")
})

module.exports = router