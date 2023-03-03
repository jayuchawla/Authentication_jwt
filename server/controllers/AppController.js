import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import otpGenerator from 'otp-generator';

import ENV from '../config.js';
import UserModel from "../model/User.model.js";

/** Middleware for verifying user */
export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method == "GET" ? req.query : req.body;
        // check user existence
        let exist = await UserModel.findOne({ username });
        if (!exist) {
            res.status(404).send({ error: "Cannot find user...!" })
        }
        next();
    } catch (error) {
        res.status(404).send({ error: "Verification error...!" })
    }
}

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function registerController(req, res) {
    try {
        const { username, password, profileImg, email } = req.body;

        // check existence of user
        const usernameExists = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, (err, user) => {
                if (err) reject(new Error(err))
                if (user) reject({ error: "Username already taken, please use another username." });
                resolve();
            })
        })

        // check existence of email
        const emailExists = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, (err, email) => {
                if (err) reject(new Error(err))
                if (email) reject({ error: "Email already registered." });
                resolve();
            })
        })

        Promise.all([usernameExists, emailExists])
            .then(() => {
                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            const user = new UserModel({
                                username: username,
                                password: hashedPassword,
                                profileImg: profileImg || '',
                                email: email
                            })
                            // return and save result
                            user.save()
                                .then((result) => {
                                    res.status(201).send({ msg: "User registered success." })
                                })
                                .catch((error) => {
                                    res.status(500).send({ error })
                                })
                        })
                        .catch(error => {
                            return res.status(500).send({
                                error: "Enable to hashed password."
                            })
                        })
                }
            })
            .catch(error => {
                return res.status(500).send({ error })
            })
    } catch (error) {
        res.status(500).send({ error });
    }
}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function loginController(req, res) {
    const { username, password } = req.body;
    try {
        const validLogin = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, (err, user) => {
                if (err) return res.status(500).send(new Error(err))
                if (user) {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (err) {
                            // handle error
                            res.status(500).send(new Error(err))
                        }
                        if (result) {
                            // Create and Send JWT
                            console.log(result);
                            const token = Jwt.sign({
                                userId: user._id,
                                username: user.username
                            }, ENV.JWT_SECRET, { expiresIn: "24h" });
                            res.status(200).send({
                                msg: "Login Success...",
                                username: user.username,
                                token: token
                            });
                        } else {
                            res.status(400).send({ error: "Invalid login credentials...!" });
                        }
                    });
                }
            })
        })

    } catch (error) {
        return res.status(500).send({ error })
    }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUserController(req, res) {
    const { username } = req.params;
    try {
        if (!username) {
            res.status(501).send({ error: "Invalid username...!" })
        }
        UserModel.findOne({ username }, (err, user) => {
            if (err) {
                return res.status(500).send({ error: err })
            }
            if (!user) {
                return res.status(501).send({ error: "User does not exists...!" })
            }
            const { password, ...otherAtts } = Object.assign({}, user.toJSON())
            return res.status(201).send({ user: otherAtts });
        })
    } catch (error) {
        return res.status(404).send({ error: "User not found...!" })
    }

}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "id" : "<user-id>" ❌❌
  // user id param no more required ---> GIVEN A VALID TOKEN IN AUTHORIZATION!!! ---> which will hold the user id
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUserController(req, res) {
    try {
        const { userId } = req.user;
        if (userId) {
            const body = req.body;
            UserModel.updateOne({ _id: userId }, body, (err, data) => {
                if (err) throw err;
                res.status(201).send({ msg: "User data updated...!" })
            })
        } else {
            res.status(401).send({ error: "User not found...!" })
        }
    } catch (error) {
        res.status(401).send({ error: error })
    }
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTPController(req, res) {
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({ code: req.app.locals.OTP })
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTPController(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null; // reset OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: "OTP verification success...!" })
    }
    return res.status(400).send({ error: "Invalid OTP...!" })
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSessionController(req, res) {

}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPasswordController(req, res) {

}