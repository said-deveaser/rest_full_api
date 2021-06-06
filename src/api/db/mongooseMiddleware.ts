import mongoose from 'mongoose'
import MONGOOSE_URI from "./bdConfig";
import {RequestHandler} from "express-serve-static-core";
import ResponseStatuses from "../../config/response_statuses";
import {createErrorResponseBody} from "../../config/helpers";

const NAMESPACE = 'mongooseMiddleware.ts'

const mongooseConnection =mongoose.connect(MONGOOSE_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const mongooseMiddleware:RequestHandler = (req, res, next) => {
    mongooseConnection.then(value => {
        next()
    }).catch(reason => {
        const error = new Error('DB connection failed')
        res.status(ResponseStatuses.ServiceUnavailable)
            .json(createErrorResponseBody({message: error.message}))
    })
}

export = mongooseMiddleware


