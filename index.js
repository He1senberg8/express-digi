import express from "express"

const app=express()
const port=3000
/*
app.get("/",(req,res)=>{
    res.status(200);
    res.send("Hello from Pallab Nath ")
});

app.get("/rank",(req,res)=>{
    res.status(200);
    res.send("Kuch or bol bhai jsdjd.... ")
});

app.get("/new",(req,res)=>{
    res.status(200);
    res.send("Kuch or  .... ")
});*/
app.use(express.json())

let teadata=[]
let nextid=1
//Add a new tea 
app.post('/tea',(req,res)=>{
    const {name ,price }=req.body;
    const newtea={id:nextid++,name,price}
    teadata.push(newtea)
    res.status(201).send(newtea)
})
//get all tea 
app.get('/tea',(req,res)=>{
    res.status(201).send(teadata)
})
//get a tea with ceratin id
app.get('/tea/:id',(req,res)=>{
    const tea=teadata.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Tea Not Found")
    }
    res.status(200).send(tea)
})

//update
app.put('/tea/:id',(req,res)=>{
    
    const tea=teadata.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("Tea Not Found")
    }
    const {name,price}=req.body
    tea.name=name;
    tea.price=price;
    res.status(200).send(tea);
})

app.delete('/tea/:id',(req,res)=>{
    const index =teadata.findIndex (t => t.id== parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send("Tea not found")
    }
    teadata.splice(index,1)
    res.status(204).send("Deleted")
})

app.listen(port,()=>{
    console.log(`Server is running at port: ${port}....`)
})