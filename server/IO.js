import fs from "fs"

export function readfiles(filename) {
    const data = fs.readFileSync(filename, "utf8")
    const jsondata = JSON.parse(data)

    return jsondata
}



export function writedata(namefile,data) {

    let jsondata = JSON.stringify(data, null, 2)
    fs.writeFileSync(namefile, jsondata)
}



export function adddata(filename,object){

    const data = readfiles(filename)
    data.push(object)
    
    writedata(filename,data)
}
