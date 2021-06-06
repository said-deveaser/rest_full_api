import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import logging from "./config/logging";
import config from "./config/config";
import api from './api/api'
import ddosDefender from "./middlewares/ddos_defender";
import ResponseStatuses from "./config/response_statuses";
import {createErrorResponseBody} from "./config/helpers";


const NAMESPACE = 'Server'
const router = express()

/** Logging the request */
router.use((req, res, next) => {
    logging.info(NAMESPACE,
        `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`)
    res.on('finish', () => {
        logging.info(NAMESPACE,
            `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`)
    })
    next()
})

/** parse the request*/
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

/** Middlewares*/
router.use(ddosDefender)

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requester-Width, Content-Type, Accept, Authorization')

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT')
        return res.status(ResponseStatuses.OK).json({})
    }
    next()
})

/** Routes */
router.use('/api', api)

/** Error Handling */
router.use((req, res, next) => {
    const error = new Error('not found')
    return res.status(ResponseStatuses.NotFound).json(createErrorResponseBody({
        message: error.message
    }))
})

/** Create the server */
const httpServer = http.createServer(router)
httpServer.listen(config.server.port, () =>
    logging.info(NAMESPACE, `Server is running on ${config.server.hostname}:${config.server.port}`))