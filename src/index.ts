import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_DB,
  define: {
    timestamps: false
  },
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true
    }
  }
})

export default sequelize
