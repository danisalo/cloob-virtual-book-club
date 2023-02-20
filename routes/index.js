module.exports = app => {

    // Index
    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    // Auth
    const authRoutes = require("./auth.routes")
    app.use("/", authRoutes)

    // Cloob
    const cloobRoutes = require("./cloob.routes")
    app.use("/cloob", cloobRoutes)

    // User
    const userRoutes = require("./user.routes")
    app.use("/", userRoutes)
}
