require("dotenv").config()
require("./db")

const express = require("express")
const app = express()
const hbs = require("hbs")

require("./config")(app)
require("./config/session.config")(app)

app.locals.appTitle = 'Cloob - Tu Club de lectura Virtual'

// Routes
require("./routes")(app)

// Errors
require("./error-handling")(app)

module.exports = app