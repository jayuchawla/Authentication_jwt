import { Router } from "express";
const router = Router();

/* import controllers */
import * as controller from '../controllers/AppController.js';

/* import authorization middleware */
import * as authMiddleware from '../middleware/auth.js';

/******* POST *******/
// register user
router.route('/register').post((req, res) => {
    controller.registerController(req, res);
})

// send email
router.route('/registerMail').post((req, res) => {
    res.json('register mail route')
})

// authenticate user
router.route('/authenticate').post((req, res) => {
    res.json('authentication route');
})

// login in app
router.route('/login').post((req, res) => {
    controller.verifyUser(req, res, controller.loginController);
})

/****** GET ******/
// get user with username
router.route('/user/:username').get((req, res) => {
    controller.getUserController(req, res);
})

// to generate random OTP
router.route('/generateOTP').get((req, res) => {
    controller.generateOTPController(req, res);
})

// verify generated OTP
router.route('/verifyOTP').get((req, res) => {
    controller.verifyOTPController(req, res);
})

// reset all variables
router.route('/createResetSession').get((req, res) => {
    controller.createResetSessionController(req, res);
})

/****** PUT ******/
// update user profile
router.route('/updateUser').put((req, res) => {
    authMiddleware.auth(req, res, controller.updateUserController);
})

// reset password
router.route('/resetPassword').put((req, res) => {
    controller.resetPasswordController(req, res);
})

export default router;