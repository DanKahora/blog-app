const greet = (name) => {
    console.log(`Hello, ${name}`)
}

greet("mario")
greet("jane")

setTimeout(()=>{
    console.log("This is excellent")
}, 1000)
const int = setInterval(()=>{
    console.log("Just amazing")
}, 1000)

