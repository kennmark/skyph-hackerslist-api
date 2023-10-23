import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import hackersRoute from './routes/hackersRoute.js'
import cors from 'cors'

const app = express()

// Middleware for parsing request body
app.use(express.json())

//MIDDLEWARE for handling CORS POLICY
//Opt. 1 Allow All Origins with Default of cors(*)
app.use(cors())

//Opt. 2 Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// )

app.get('/', (request, response) => {
  console.log(request)
  return response.status(234).send('Welcome to Hackers List')
})

app.use('/hackers', hackersRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App Connected to Database')
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
