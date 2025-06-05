import express from "express";
import bcrypt from "bcyrpt";
import  jwt from "jsonwebtoken";
import db from "../db/client.js";

const router = express.Router();

router.post("/register", async (req, res) =>{
    const { name, email, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const res = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );
        const user = res.rows[0];
        const token = jwt.sign({token});
    }catch(err){
        res.status(500).json({ error: 'Resgistration failed' });
    }
});

router.post("/login", async(req, res) =>{
    const {email, password} = req.body;
    try{
        const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = res.rows[0];
        if(!user)
            return res.status(401).json({ error: 'invalid email or password '});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(401).json({ error: 'Invalid email or password '});

        const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET);
        res.json({token})
    }catch(err){
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router;