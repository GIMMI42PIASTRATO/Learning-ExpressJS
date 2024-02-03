const express = require("express")
const storageRouter = require("./routes/storage")
const librarysRouter = require("./routes/librarys")
const authRouter = require("./routes/auth")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const app = express()

const PORT = 3001

// GLOBAL MIDDLEWARE, queste middleware vengono applicate a tutti i route
app.use(express.json())
app.use((request, response, next) => {
    console.log(`Global middleware: ${request.method}:${request.url}`)
    next()
})
app.use(cookieParser())
app.use(session({
    secret: "WEIUJKLJKVMIUWORJKJSKDLMNXMVNJHJKSDFYEIWRUOFDJSFDJ8734",
    resave: false,
    saveUninitialized: false
}))

// Dobbiamo collegare i router all'index, per farlo dobbiamo scrivere la riga di codice qui sotto, il primo parametro non è obbligatorio, ma è una buona pratica inserirlo per rendere il codice più pulito
//il primo parametro è la path di defalut che avratto tutti i route all'interno del router
app.use("/storage", storageRouter)
app.use("/librarys", librarysRouter)
app.use("/auth", authRouter)

app.listen(PORT, () => console.log(`🏃 Running Express server on http://localhost:${PORT}`))

// Get request puoi usare il browser normlae oppure usando fetch

app.get('/', (request, response) => {
    response.send('library')
})


// Middleware

app.get('/middle',
(request, response, next) => {
    console.log("Prima della response")
    next()
},
(request, response, next) => {
    response.send("Anche questa è una middleware, perché tutto quello che accade dopo il primo argomento è una middleware")
    next()
},
(request, response) => {
    console.log("Dopo la response, dopo aver inviato una response non è più possibile inviarne altre, ci possono essere quante middleware si vuole, basta che vengano chiamate da quella prima utilizzando la funzione next")
})