import {RequestHandler} from "express-serve-static-core";
import logging from "../../config/logging";
import mongoose from "mongoose";

const NAMESPACE = 'api users.ts'

const addUser:RequestHandler = (req, res, next) => {

    return res.status(200).json({addUser: req.body})
}

const Test2:RequestHandler = (req, res, next) => {
    return res.status(200).json({addUser: 'tset2'})
}


export default  {
    addUser: addUser,
    test2: Test2
}