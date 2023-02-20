const express = require('express')
const router = express.Router()

// Models
// aqui

const { isLoggedIn, checkRole } = require('../middlewares/route-guard')

// Lista
router.get("/lista", (req, res, next) => {
    res.render("cloob/list")
})

module.exports = router
