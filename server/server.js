const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const { handleMessage} = require('./controllers/messageController')


app.post('/api/messages',handleMessage)
app.listen(4040,() => console.log(`server is runnning on 4040`))