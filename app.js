import express, { Router } from "express"
import { adduser, buytickets, enter, newEvent, summaryTicket } from "./server/uliitis.js"


const app = express()
const port = 8080

app.use(express.json())

function middelware(req, res, next){
       
    if (enter(req.body.username,req.body.password)) {
        next()
    }
    else{res.send({ message: "error some ditels not true" })}
}



app.post("/user/register" ,(req, res) => {
    if (adduser(req.body)) {
        res.send({ message: "User registered successfully" })
    } else {
        res.send({ message: "user already exisit" })
    }
})


app.post("/creator/events", middelware,(req, res) => {

    if(newEvent(req.body)){
        res.send({ message: "Event created successfully" })
    }else{
        res.status(404).send("This event already exsit")
    }
})



app.post("/users/tickets/buy",middelware, (req, res) => {
    const message = buytickets(req.body)

    if (message == true) {
        res.send({ message: "Tickets purchased successfully" });
    } else {
        res.send({ error: message })
    }
})


app.get("/users/:username/summary", (req, res) => { 
    const summary = summaryTicket(req.params.username)
    res.send(summary)    
    }
)




app.listen(port, () => {
    console.log("server run....");
})




