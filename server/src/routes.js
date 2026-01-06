<<<<<<< HEAD
// src/routes.js
const CoffeeController = require('./controllers/CoffeeController')

module.exports = (app) => {
    // เส้นทางสำหรับจัดการเมนูกาแฟ (Coffee Routes)
    app.get('/coffees', CoffeeController.index)      // ดูเมนูทั้งหมด
    app.post('/coffee', CoffeeController.create)     // เพิ่มเมนู
    app.put('/coffee/:coffeeId', CoffeeController.put) // แก้ไขเมนู
    app.delete('/coffee/:coffeeId', CoffeeController.remove) // ลบเมนู
    app.get('/coffee/:coffeeId', CoffeeController.show) // ดูเมนูรายตัว
}   
=======
const DrinkController = require('./controllers/DrinkController');

module.exports = (app) => {
    app.get('/drinks', DrinkController.index);
    app.get('/drink/:id', DrinkController.show);
    app.post('/drink', DrinkController.create);
    app.put('/drink/:id', DrinkController.update);
    app.delete('/drink/:id', DrinkController.delete);
};
>>>>>>> d0d88908f17e772a630e2d7def4b62dcb198b4f5
