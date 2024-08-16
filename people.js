const people = ["Adrian", "Kamau", "Njoroge", "Kahora"]
const age = [20,30,89,39]

console.log(age)

module.exports = {people, age}


const os = require('os')
 
//Gives you the os information and path to home directory
console.log(os.platform(), os.homedir())

const fs = require('fs')

//Read files takes two arguements

fs.readFile('./docs/index.js', (err, data) => {
    if(err) {
        console.log(err)
    }
    console.log(data.toString())
})
   
// write file takes 3 arguements, If file don't exist it creates it in the directory and writes the file

fs.writeFile('./docs/index.js', 'export default function Transaction(){ return (<div> Hello World</div>)}', ()=>{
    console.log("File written successfully")
})

// create directory
if(!fs.existsSync('./assets')){
    fs.mkdir('./assets', (err)=>{
        if(err){
            console.log(err)
        }
        console.log("Folder created successfully")
    })
} else{
    fs.rmdir('./assets', (err) =>{
        if(err){
            console.log(err)
        }
        console.log("Folder deleted successfully")
    })
}

//Delete file
if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', ()=>{
        console.log("File deleted successfully")
    })
}