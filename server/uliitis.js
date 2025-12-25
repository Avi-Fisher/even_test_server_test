import { adddata, readfiles, writedata } from "./IO.js";

export function adduser(object) {

    if (checkuserexsit(object.username)) {
        return false
    }

    adddata("data/users.json", object)
    return true
}


export function checkuserexsit(name) {
    const users = readfiles("data/users.json")

    if (users.find(e => e.username === name)) {
        return true
    }
    return false
}


export function newEvent(object) {
    const events = readfiles("data/events.json")


    if (events.find(e => e.eventName == object.eventName)) {
        return false
    }
    const event = {
        eventName: object.eventName,
        ticketsForSale: object.ticketsForSale,
        createdBy: object.username
    }

    adddata("data/events.json", event)
    return true
}


export function buytickets(object) {
    const events = readfiles("data/events.json")
    const index = events.findIndex(e => e.eventName === object.eventName)
    
    if (index >= 0) {
        if (events[index].ticketsForSale >= object.quantity) {
            events[index].ticketsForSale -= object.quantity
            writedata("data/events.json", events)

            const receipt = {
                username: object.username,
                eventName: object.eventName,
                ticketsBought: object.quantity
            }

            adddata("data/receipts.json", receipt)
            return true
        } else {
            return "There are not enough tickets in stock."
        }
    }

    return false
}


export function summaryTicket(name) {
    
    const events = readfiles("data/receipts.json")
    let returns = {
        totalTicketsBought: 0,
        events: [],
        averageTicketsPerEvent: []

    }
    
    
    events.forEach(e => {

        if (e.username == name) {
            returns.totalTicketsBought += e.ticketsBought
            returns.events.push(e.eventName)
            returns.averageTicketsPerEvent.push(e.ticketsBought)
        }
    })
    
    
    returns.averageTicketsPerEvent = arrayAverage(returns.averageTicketsPerEvent)

    return returns
}


function arrayAverage(array) {
    const average = array => array.reduce((a, b) => a + b) / array.length
    return average(array)
}


export function enter(name, password) {
    const users = readfiles("data/users.json")

    if (users.find(e => e.username === name & e.password == password)) {
        return true
    }
    return false

}



