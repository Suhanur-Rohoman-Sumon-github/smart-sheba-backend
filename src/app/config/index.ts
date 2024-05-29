import dotenv from 'dotenv'

// config dotenv
dotenv.config()
export default {
  // all secrete key coming from the .env files
  port: process.env.PORT,
  database_url: process.env.Database_Url,
}
