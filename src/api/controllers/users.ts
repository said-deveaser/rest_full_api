import {RequestHandler} from "express-serve-static-core";
import logging from "../../config/logging";
import mongoose from "mongoose";

const NAMESPACE = 'api users.ts'

const Test:RequestHandler = (req, res, next) => {
    return res.status(200).json({test: 'tset'})
}

const Test2:RequestHandler = (req, res, next) => {
    return res.status(200).json({test: 'tset2'})
}


export default  {
    test: Test,
    test2: Test2
}