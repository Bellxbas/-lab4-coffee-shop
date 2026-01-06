<<<<<<< HEAD
const express = require('express')
const cors = require('cors')
const { sequelize } = require('./models') // เรียกใช้ sequelize object ที่เราสร้างไว้
const config = require('./config/config')

const app = express()

// --- Middleware Section ---
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// --- Routes Section ---
require('./routes')(app)

// --- Server Startup Section ---
const port = config.port

// สั่ง Sync ฐานข้อมูลก่อน แล้วค่อยเริ่ม Server
// force: false หมายถึง ถ้ามีตารางอยู่แล้ว ไม่ต้องลบสร้างใหม่ (รักษาข้อมูลเดิมไว้)
sequelize.sync({ force: false }).then(() => {
    app.listen(config.port, function () {
        console.log('CoffeeShop Server running on port ' + config.port)
        })
    })
=======
let express = require('express')
let bodyParser = require('body-parser')
 
const app = express()
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
 
// เรียกใช้ routes โดยส่ง app เข้าไป
require('./routes')(app)
 
app.get('/status', function (req, res) {
    res.send('Hello nodejs server')
})
 
app.get('/hello/:person', function (req, res) {
    console.log('hello - ' + req.params.person)
    res.send('sey hello with ' + req.params.person)
})
 
let port = 8081
 
app.listen(port, function () {
    console.log('server running on ' + port)
})
>>>>>>> d0d88908f17e772a630e2d7def4b62dcb198b4f5
