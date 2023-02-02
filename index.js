const express = require('express')
const cors=require("cors")
require('dotenv').config();
const app = express()
const port=process.env.PORT
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/',(req,res) => res.send('hello'))

app.listen(port,() => {console.log('server started on port 8080')})