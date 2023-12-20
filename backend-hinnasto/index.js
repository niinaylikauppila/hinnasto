
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Product = require('./models/product')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))


app.get('/api/products', (req, res) => {
    Product.find({}).then(products => {
        console.log(products)
        res.json(products)
    })
})
app.get('/api/products/:id', (request, response) => {
    Product.findById(request.params.id)
        .then(product => {
            response.json(product)
        })
})
app.post('/api/products', (request, response) => {
    const body = request.body
    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    }
    const product = new Product({
        name: body.name,
        price: body.price
    })
    product.save().then(savedProduct => {
        response.json(savedProduct)
    })
})
/*app.delete('/api/products/:id', (request, response) => {
    Product.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
})*/
const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)