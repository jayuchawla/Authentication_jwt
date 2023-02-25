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
    res.json('register controller')
}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function loginController(req, res) {

}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUserController(req, res) {

}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUserController(req, res) {

}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTPController(req, res) {

}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTPController(req, res) {

}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSessionController(req, res) {

}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPasswordController(req, res) {

}