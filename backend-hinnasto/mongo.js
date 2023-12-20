const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2] 
const newname = process.argv[3]
const newprice = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.aqrqda0.mongodb.net/productApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
})

const Product = mongoose.model('Product', productSchema)
if(newname && newprice){
    const product = new Product({
        name: newname,
        price: newprice,
    })
    product.save().then(result => {
        console.log(`new product ${newname} saved!`)
        mongoose.connection.close()
    })
} else {  
    Product.find({}).then(result => {
        result.forEach(product => {
            console.log(product)
        })
        mongoose.connection.close()
    })
}
