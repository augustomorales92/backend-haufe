import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import router from './routes'
import db from './index'
import { unmatchedRoute } from './middlewares/errorhandler'

const app = express()
const port = 3001

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/', router)

app.all('*', () => {
    throw new Error();
  });

  
app.use(unmatchedRoute)

const server = app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})

db.authenticate()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })

export default server
