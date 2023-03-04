import { Router } from "express";
const router = Router();

/* import controllers */
import * as controller from '../controllers/AppController.js';

/* import authorization middleware */
import * as authMiddleware from '../middleware/auth.js';

/* import register mail controller */
import * as mailMiddleware from '../controllers/mailer.js';

/******* POST *******/
// register user
router.route('/register').post((req, res) => {
    controller.registerController(req, res);
})

// send email
router.route('/registerMail').post(mailMiddleware.registerMail);

// authenticate user
router.route('/authenticate').post((req, res) => {
    res.json('authentication route');
})

// login in app
router.route('/login').post(controller.verifyUser, controller.loginController);
    
/****** GET ******/
// get user with username
router.route('/user/:username').get((req, res) => {
    controller.getUserController(req, res);
})

// to generate random OTP
router.route('/generateOTP').get(controller.verifyUser, authMiddleware.localVariables, controller.generateOTPController)

// verify generated OTP
router.route('/verifyOTP').get(controller.verifyOTPController);

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
router.route('/resetPassword').put(controller.verifyUser, controller.resetPasswordController);

export default router;