let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// ============================================
// 🟢 ส่วนที่ 1: จำลอง Database (Array)
// ============================================

// เก็บเมนูกาแฟ
let coffees = [
    { id: 1, name: 'Americano', price: 45, type: 'hot', description: 'เข้มข้น หอมกรุ่น' },
    { id: 2, name: 'Latte', price: 55, type: 'iced', description: 'นุ่มละมุน ผสมนมสด' }
]

// เก็บข้อมูลผู้ใช้ (Users)
let users = [
    // สร้าง User ทดสอบไว้ 1 คน
    { id: 1, email: 'admin@test.com', password: '123', name: 'Admin', lastname: 'System' } 
]

// ============================================
// 🟡 ส่วนที่ 2: Authentication (Login / Register)
// ============================================

// 1. REGISTER: สมัครสมาชิก
app.post('/register', function (req, res) {
    // รับค่าที่ส่งมา
    const { email, password, name, lastname } = req.body

    // เช็คว่าอีเมลซ้ำไหม?
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
        return res.status(400).send({ error: 'อีเมลนี้ถูกใช้งานแล้ว' })
    }

    // สร้าง ID ใหม่
    let lastId = users.length > 0 ? users[users.length-1].id : 0
    
    // สร้าง User ใหม่
    const newUser = {
        id: lastId + 1,
        email: email,
        password: password, // (ของจริงต้องเข้ารหัส แต่ Lab นี้เก็บสดไปก่อน)
        name: name || 'User',
        lastname: lastname || ''
    }

    users.push(newUser) // บันทึก
    res.send(newUser)
})

// 2. LOGIN: เข้าสู่ระบบ
app.post('/login', function (req, res) {
    const { email, password } = req.body

    // หา User ที่ตรงทั้ง Email และ Password
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
        return res.status(403).send({ error: 'Email หรือ Password ไม่ถูกต้อง' })
    }

    // ส่งข้อมูล User + Token ปลอมๆ กลับไป
    res.send({
        user: user,
        token: 'mock-token-' + Date.now() // Token สมมติ
    })
})

// ============================================
// 🟠 ส่วนที่ 3: Users Management (Admin)
// ============================================

app.get('/users', function (req, res) {
    res.send(users)
})

app.get('/user/:userId', function (req, res) {
    let id = parseInt(req.params.userId)
    let user = users.find(u => u.id === id)
    res.send(user)
})

app.post('/user', function (req, res) { // Admin สร้าง User
    let newUser = req.body
    let lastId = users.length > 0 ? users[users.length-1].id : 0
    newUser.id = lastId + 1
    users.push(newUser)
    res.send(newUser)
})

app.put('/user/:userId', function (req, res) {
    let id = parseInt(req.params.userId)
    let index = users.findIndex(u => u.id === id)
    users[index] = { ...users[index], ...req.body }
    res.send(users[index])
})

app.delete('/user/:userId', function (req, res) {
    let id = parseInt(req.params.userId)
    users = users.filter(u => u.id !== id)
    res.send({ status: 'ok' })
})


// ============================================
// 🔵 ส่วนที่ 4: Coffees Management (เดิม)
// ============================================

// GET: ดูเมนูทั้งหมด
app.get('/coffees', function (req, res) {
    res.send(coffees)
})

// GET: ดูรายเมนู
app.get('/coffee/:coffeeId', function (req, res) {
    let id = parseInt(req.params.coffeeId)
    let coffee = coffees.find(c => c.id === id)
    res.send(coffee)
})

// POST: เพิ่มเมนูใหม่
app.post('/coffee', function (req, res) {
    let newCoffee = req.body
    let lastId = coffees.length > 0 ? coffees[coffees.length-1].id : 0
    newCoffee.id = lastId + 1
    
    coffees.push(newCoffee)
    res.send(newCoffee)
})

// PUT: แก้ไขเมนู
app.put('/coffee/:coffeeId', function (req, res) {
    let id = parseInt(req.params.coffeeId)
    let index = coffees.findIndex(c => c.id === id)
    
    coffees[index] = { ...coffees[index], ...req.body }
    res.send(coffees[index])
})

// DELETE: ลบเมนู
app.delete('/coffee/:coffeeId', function (req, res) {
    let id = parseInt(req.params.coffeeId)
    coffees = coffees.filter(c => c.id !== id)
    res.send({ status: 'ok' })
})

// ============================================
// Start Server
// ============================================
let port = 8081
app.listen(port, function () {
    console.log('server running on ' + port)
})