const express = require('express')
// var bodyParser = require('body-parser')
const app = express();
const cors = require("cors");
const expressSanitizer = require("express-sanitizer")
const path = require("path")

let corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(expressSanitizer())
app.use("/imagepro", express.static(path.join(__dirname, './image')))
app.use(express.json({limit: '3mb'}))
app.use(express.urlencoded({limit: '3mb', extended: true}))
// app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', require('./api/api'))

// app.get('/', (req, res) => res.send('Hello World!'))
const server = app.listen(3000, () =>
    console.log("Running on http://localhost",host, port)
    )
var host = server.address().address;
var port = server.address().port;

