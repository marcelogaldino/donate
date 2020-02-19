const express = require("express")
const nunjucks = require("nunjucks")

const server = express()

server.use(express.static('public'))

// Enable req.body
server.use(express.urlencoded({ extended: true }))

const Pool = require("pg").Pool
const db = new Pool({
    user: 'postgres',
    password: 'suaSenhaAqui',
    host: 'localhost',
    port: 5432,
    database: 'donate'
})

nunjucks.configure("./", {
    express: server,
    noCache: true
})


server.get("/", function(req, res) {
    
    db.query(`SELECT * FROM donors`, function(err, result) {
        if (err) return res.send("Database Error:")

        const donors = result.rows

        return res.render("index.html", { donors })
    })

})

server.post("/", function(req, res) {
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == "") {
        return res.send("Please fill all the fields!!")
    }

    const query = `
        INSERT INTO donors ("name", "email", "blood") 
        VALUES ($1, $2, $3)`
    
    const values = [name, email, blood]     
    
    db.query(query, values, function(err) {
        if (err) return res.send("Database Error:")
    
        return res.redirect("/")
    })

})

server.listen(3000, function() {
    console.log("Server is running")
})