<<<<<<< HEAD
module.exports = {
    index(req, res) {
        res.send("get all drinks")
    },
 
    show(req, res) {
        res.send("get drink " + req.params.id)
    },
 
    create(req, res) {
        res.send("create drink")
    },
 
    update(req, res) {
        res.send("update drink " + req.params.id)
    },
 
    delete(req, res) {
        res.send("delete drink " + req.params.id)
    }
}
=======
let drinks = []
let nextDrinkId = 1
 
module.exports = {
  // GET /drinks
  index: (req, res) => {
    res.send(drinks)
  },
 
  // GET /drink/:id
  show: (req, res) => {
    const id = parseInt(req.params.id)
    const drink = drinks.find(d => d.id === id)
 
    if (!drink) {
      return res.status(404).send({ error: `ไม่พบเมนูเครื่องดื่ม ID: ${id}` })
    }
 
    res.send(drink)
  },
 
  // POST /drink
  create: (req, res) => {
    const { name, price, description } = req.body
 
    if (!name || price === undefined) {
      return res.status(400).send({ error: 'ต้องมี name และ price' })
    }
 
    const newDrink = {
      id: nextDrinkId++,
      name,
      price,
      description: description || ''
    }
 
    drinks.push(newDrink)
 
    res.status(201).send({
      message: 'สร้างเมนูเครื่องดื่ม',
      drink: newDrink
    })
  },
 
  // PUT /drink/:id
  update: (req, res) => {
    const id = parseInt(req.params.id)
    const drink = drinks.find(d => d.id === id)
 
    if (!drink) {
      return res.status(404).send({ error: `ไม่พบเมนูเครื่องดื่ม ID: ${id}` })
    }
 
    const { name, price, description } = req.body
    if (name !== undefined) drink.name = name
    if (price !== undefined) drink.price = price
    if (description !== undefined) drink.description = description
 
    res.send({
      message: 'อัปเดตเมนูเรียบร้อย',
      drink
    })
  },
 
  // DELETE /drink/:id
  delete: (req, res) => {
    const id = parseInt(req.params.id)
    const beforeLen = drinks.length
 
    drinks = drinks.filter(d => d.id !== id)
 
    if (drinks.length === beforeLen) {
      return res.status(404).send({ error: `ไม่พบเมนูเครื่องดื่ม ID: ${id}` })
    }
 
    res.send({
      message: `ลบเมนูเครื่องดื่ม ID: ${id}`
    })
  }
}
>>>>>>> d0d88908f17e772a630e2d7def4b62dcb198b4f5
