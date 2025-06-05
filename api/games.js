import express from "express"
const router = express.Router()
export default router;

import { verifyToken } from "#middleware/authMiddleware";
import { getGames, getGame, createGame, updateGame, deleteGame } from "../db/queries/games.js"

router.get('/protected', verifyToken, (req, res) =>{
    res.json({message: `Greetings, ${req.user.name}! This is a protected route.`})
});

router.route('/').get(async(req, res) =>{
    const games = await getGames();
    res.send(games)
})

router.route('/').post(async(req, res)=>{
    if(!req.body){
        return res.status(400).send({error: "Missing req.body"})
    }

    const {title, genre, release_year, platform_id} = req.body

    if(!title || !genre || !release_year || !platform_id){
        return res.status(400).send({error: "Missing required params"})
    }
    const game = await createGame({title, genre, release_year, platform_id})
    res.status(201).send(game)
})

router.route("/:id").get(async(req, res) =>{
    const id = req.params.id
    if(!Number.isInteger(id) && id < 0){
        return res.status(400).send({error: "Please send a valid number"})
    }
    const game = await getGame(id)

    if(!game){
        return res.status(404).send({error: "ID not found"})
    }
    res.send(game)
})

router.route("/:id").put(async(req, res) =>{
    const id = req.params.id
    if(!req.body){
        return res.status(400).send({error: "Details missing"})
    }

    const {title, genre, release_year, platform_id} = req.body

     if(!title || !genre || !release_year || !platform_id){
        return res.status(400).send({error: "Missing required fields"})
    }
    if(!Number.isInteger(id) && id < 0){
        return res.status(400).send({error: "Please send valid number"})
    }

    const game = await getGame(id)
    if(!game){
        return res.status(404).send({error: "Game not found"})
    }

    const updated = await updateGame({id, title, genre, release_year, platform_id})
    res.status(200).send(updated)
})

router.route("/:id").delete(async(req, res) =>{
    const id = req.params.id
    if(!Number.isInteger(id) && id < 0){
        return res.status(400).send({error: "Please send a valid number"})
    }
    const deletes = await deleteGame(id)

    if(!deletes || deletes.length === 0){
        res.status(404).send({error: "Game not found"})
    }
    res.sendStatus(204)
})
