const express=require('express')
const mongoose=require('mongoose')
const Todo=require('./models/Todo')
const app=express()
mongoose.connect("mongodb://localhost/todo")

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",async(req,res)=>{
const allTodo=await Todo.find()
res.render("index",{todo:allTodo})
})

app.post("/add",(req,res)=>{
const todo=req.body.todo
console.log(todo)
const newData=new Todo({todo})
newData.save()
.then(()=>{
console.log("Added")
res.redirect("/")
})
.catch((err)=>{
console.log(err)
})
})

app.get("/delete",(req,res)=>{
const {_id}=req.params;
Todo.deleteOne(_id)
.then(()=>{
console.log("Deleted Successfully")
res.redirect("/")
})
.catch((err)=>{
console.log("Error occured")
})
})

app.listen(8080,()=>{
console.log(`Server is ready to accept request at port 8080`)
})