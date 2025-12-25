import { adddata, readfiles } from "./IO.js";

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


export function newEvent(object){

    adddata



}





