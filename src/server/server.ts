import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from '../routes/authRoutes'
import customerRoutes from '../routes/customerRoutes'
import sellerRoutes from '../routes/sellerRoutes'
import connectToDB from '../config/database'
import { END_POINT } from '../types/shared.interface'
import { Logger } from '../logger/logger.lib'
import { ClientServerInterface } from './server.interface'

dotenv.config()
const defaultPort = 5001
const exitProcess = 1

class ClientServer implements ClientServerInterface.IClientServer {
  private app: express.Application
  private port: string | number

  constructor() {
    this.app = express()
    this.port = process.env.PORT || defaultPort

    this._initializeMiddlewares()
    this._initializeRoutes()
  }

  _initializeMiddlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(helmet())
    this.app.use(morgan('combined'))
  }

  _initializeRoutes() {
    this.app.get('/', (_req, res) => {
      res.send('Hello World!')
    })

    this.app.use(END_POINT.BASE_URL, authRoutes)
    this.app.use(END_POINT.BASE_URL, customerRoutes)
    this.app.use(END_POINT.BASE_URL, sellerRoutes)
  }

  start() {
    connectToDB()
      .then(() => {
        this.app.listen(this.port, () => {
          Logger.info(`Server running on http://localhost:${this.port}`)
        })
      })
      .catch((err) => {
        Logger.error('Error connecting to the database:', err)
        process.exit(exitProcess)
      })
  }
}

export const AppServer = new ClientServer()
