const express = require('express')
const router = express.Router()

// Perfil
router.get("/perfil", (req, res, next) => {
    const { user_id } = req.params
    res.render("user/profile")
})

module.exports = router