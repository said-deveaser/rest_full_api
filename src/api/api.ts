import express from "express";
import users from './routes/users'
import logging from "../config/logging";
import mongooseMiddleware from "./db/mongooseMiddleware";

const NAMESPACE = 'Api.ts'

const router = express.Router()

// router.use(mongooseMiddleware)

router.use('/user', users)

export = router