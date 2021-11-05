
const express = require("express");
const cors = require("cors"); 

const app = express(); 

app.use(cors());
app.use(express.json());

app.use((request, response, next)=>{
    console.log("----------------------------")
    console.log(request.method)
    console.log(request.path)
    console.log(request.body)
    console.log("----------------------------")
    next();
})

var list = require('./list.json');

app.get("/",(request, response)=>{
    response.send("<h1>HOLIIIIIIII</h1>")
})

app.get("/data",(request, response)=>{
    response.json(list);
})

app.get("/data/:num",(request, response)=>{
    var num = request.params.num
    elem = list.find(elem =>{ 
        return elem.num == num}
    );
    response.json(elem)
})

app.delete("/data/:num",(request, response)=>{
    var num = request.params.num
    list = list.filter(elem =>{ 
        return elem.num != num}
    );
    console.log({list})
    response.status(204).end()
})

app.post("/data",(request, response)=>{
    var body = request.body;
    if(!body || !body.nombre || !body.accion || !body.descripcion){
        return response.status(400).json(
            {
                "error": "Missing fields..."
            }
        )
    }
    var nums = list.map(elem=>{return Number(elem.num)}); 
    console.log(nums);
    var  newnum = (Math.max(...nums) + 1);
    body.num = newnum;
    list.push(body);
    response.status(201).end();
})

app.use((request, response, next)=>{
    console.log("Hola")

    response.status(404).json({
        error: "Not found"
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);