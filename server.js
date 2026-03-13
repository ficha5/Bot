
const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
res.send("Chatbot backend running")
})

app.post("/chat", async (req,res)=>{

try{

const userMessage = req.body.message

const response = await axios.post(
"https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
{
inputs:userMessage
},
{
headers:{
Authorization:`Bearer ${process.env.HF_TOKEN}`
}
}
)

let reply = response.data[0].generated_text

res.json({
reply:reply
})

}catch(err){

res.json({
reply:"Error con el modelo IA"
})

}

})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
console.log("Server running on port "+PORT)
})
