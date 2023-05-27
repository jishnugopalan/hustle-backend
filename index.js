require("dotenv").config()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const express = require('express')
const app = express()
const port = 3000
var userRoutes=require("./routes/user-routes")
var categoryRoutes=require("./routes/category-routes")
var productRoutes=require("./routes/product-routes")
var orderRoutes=require("./routes/order-routes")
var adminRoutes=require("./routes/admin-routes")
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(()=>{
  console.log("DB Connected")
})

app.use(bodyParser.json({limit:'10mb'}))
app.use(cookieParser());
app.use(cors());
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',orderRoutes)
app.use('/api',adminRoutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})