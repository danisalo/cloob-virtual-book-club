const express = require('express')
const router = express.Router()

// Middlewares
const { currentUser, isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard')

// Index
router.get("/", (req, res, next) => {
  res.render("index")
})

module.exports = router