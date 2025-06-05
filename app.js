import express from "express"
const app = express();
import gamesRouter from "./api/games.js"
import platformsRouter from "./api/platforms.js"
import authRoutes from "./api/auth.js";


app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.method, req.originalUrl)
    next()
})

app.use("/auth", authRoutes)
app.use("/games", gamesRouter)
app.use("/platforms", platformsRouter)


app.get('/', (req, res) =>{
    res.send('Welcome to the backend application!')
})

app.use((err, req, res, next) =>{
    console.error(err)
    res.status(500).send('Sorry, something is wrong.')
})

export default app;