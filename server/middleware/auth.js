import Jwt from 'jsonwebtoken';

import ENV from '../config.js';

/* auth middleware */
export async function auth(req, res, next) {
    try {
        // access authorize header
        if (!req.headers.authorization) res.status(401).send({ error: "Authentcation required, invalid token...!" })
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        const decodedToken = await Jwt.verify(token, ENV.JWT_SECRET);
        if (decodedToken) {
            req.user = decodedToken;
            next(req, res);
        } else {
            return res.status(501).send({ error: "Invalid token...!" })
        }
    } catch (error) {
        res.status(401).send({ error: "Authentication failed...!" })
    }
}

/* Middleware for local variable */
export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}