const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const fetchInfoRoutes = require("./Routes/fetchInfoRoutes")

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use("/api", fetchInfoRoutes())

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
