const express = require("express")
const nunjucks = require("nunjucks")

const server = express()

server.use(express.static('public'))

// Enable req.body
server.use(express.urlencoded({ extended: true }))

nunjucks.configure("./", {
    express: server,
    noCache: true
})

const donors = [
    {blood: 'AB+', name: 'Marcelo Galdino'},
    {blood: 'B+', name: 'Joao'},
    {blood: 'A+', name: 'Andre'},
    {blood: 'O+', name: 'Jose'},
]

server.get("/", function(req, res) {
    return res.render("index.html", { donors })
})

server.post("/", function(req, res) {
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    donors.push({
        name,
        blood
    })

    return res.redirect("/")
})

server.listen(3000, function() {
    console.log("Server is running")
})