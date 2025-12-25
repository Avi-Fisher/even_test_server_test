import express, { Router } from "express"
import { adduser, checkuserexsit } from "./uliitis.js"

const app = express()
const port = 8080

app.use(express.json())

app.use((req, res, next) => {
    if (checkuserexsit(req.body.username)) {
        next()
    }
    res.send({ message: "User not exist" })
})



app.post("/user/register", (req, res) => {
    if (adduser(req.body)) {
        res.send({ message: "User registered successfully" })
    } else {
        res.send({ message: "user already exisit" })
    }
})


app.post("/creator/events", (req, res) => {



    res.send({message:"Event created successfully"})
})






app.listen(port, () => {
    console.log("server run....");
})




