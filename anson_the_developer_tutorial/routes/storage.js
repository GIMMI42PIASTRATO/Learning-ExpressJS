const { Router } = require("express")
const router = Router()

const booksStorage = [
    {
        name: "La divina commedia",
        bookShelf: "A-2",
        ccv: "13848492938474",
        quantity: 20
    },
    {
        name: "Ultra Learning",
        bookShelf: "A-1",
        ccv: "3832928343894",
        quantity: 15
    },
    {
        name: "Primi passi python",
        bookShelf: "B-1",
        ccv: "13842434324374",
        quantity: 5
    }
]

router.use((request, response, next) => {
    if (request.session.user) next()
    else {
        console.log("You are not logged in!")
        response.sendStatus(401)
    }
})


router.get('/', (request, response) => {
    const { quantity } = request.query
    if (!isNaN(quantity)) {
        response.send(booksStorage.filter((book) => book.quantity <= quantity))
    }
    else response.send(booksStorage)
})

router.get('/:bookName', (request, response) => {
    const { bookName } = request.params
    console.log(bookName)
    const book = booksStorage.find((element) => element.name === bookName)
    response.send(book)
})

// Post request si possono fare usando un browser per richieste come postman oppure possono essere fatte anche con fetch

router.post('/', (request, response) => {
    console.log(request.body)
    booksStorage.push(request.body)
    response.sendStatus(201)
})


// SESSIONI
router.get('/shopping/cart', (request, response) => {
    const { cart } = request.session
    if (!cart) {
        response.send("You have no cart session")
    }
    else {
        response.send(cart)
    }
})

router.post('/shopping/cart', (request, response) => {
    const cartItem = request.body
    const { cart } = request.session
    if (cart) {
        request.session.cart.items.push(cartItem)
    }
    else {
        request.session.cart = {
            items: [cartItem]
        }
    }
    response.sendStatus(201)
})

module.exports = router