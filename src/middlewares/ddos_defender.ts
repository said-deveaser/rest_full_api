import {RequestHandler} from "express";
import logging from "../config/logging";
import ResponseStatuses from "../config/response_statuses";

const NAMESPACE = 'ddos_defender'
const ACCEPTED_NORMAL_SPACE_TIME = 3000
const ACCEPTED_INCORRECT_TIME_COUNT = 10

type IpTables = {
    [K:string]: {
        count: number,
        time: number,
    }
}

let ipTables:IpTables = {}

const ddosDefender: RequestHandler = (req, res, next) => {
    const ip = req.ip
    const time = Date.now()
    if (ip in ipTables) {
        const currentIp = ipTables[ip]
        const spaceTime = time - currentIp.time
        if (spaceTime > ACCEPTED_NORMAL_SPACE_TIME) {
            currentIp.count = 1
        }
        currentIp.time = time
        currentIp.count++

        if (currentIp.count > ACCEPTED_INCORRECT_TIME_COUNT) {
            return res.status(ResponseStatuses.TooManyRequests).json({
                message: 'Too Many Requests',
                debug: currentIp
            })
        }
    } else {
        ipTables[ip] = {
            count: 1,
            time
        }
    }
    next()
}


export = ddosDefender