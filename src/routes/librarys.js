const { Router, response } = require("express")
const router = Router()

const librarys = [
    {
        name: "Achille",
        cap: "18739732843"
    },
    {
        name: "Timor il segoide",
        cap: "283493247329"
    },
    {
        name: "Trissino il castigatore",
        cap: "298798327498327"
    },
    {
        name: "Giovanni colui che spinna i borselli",
        cap: "283498374983"
    }
]

// MIDDLEWARE GLOBALE PER QUESTO ROUTER
// SERVE PER BLOCCARE TUTTE LE RICHIESTE DI QUESTO ROUTER SE NON SEI LOGGATO, OVVERO NON HAI IL COOKIE CON L'ID DELLA SESSIONE
router.use((request, response, next) => {
    if (request.session.user) next()
    else {
        console.log("You are not logged in!")
        response.sendStatus(401)
    }
})

// COOKIE
router.get("/", (request, response) => {
    response.cookie("visited", "true", {
        maxAge: 10000
    })
    response.send(librarys)

})

router.get("/cookieTest", (request, response) => {
    if (request.cookies.visited === "true") {
        response.send("You have visited the http://localhost:3001/librarys in the last 10 second")
        console.log("cookie valid")
    }
    else {
        response.send("Your cookie is expired")
        console.log("cookie expired")
    }
})
//  -----------------------------------
router.get("/:name", (request, response) => {
    const { name } = request.params
    const library = librarys.find((lib) => lib.name == name)
    if (library) {
        response.send(library)
    }
    else {
        response.send(librarys)
    }
})


module.exports = router