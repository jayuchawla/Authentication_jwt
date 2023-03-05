import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_NAME;

/* AUTHENTICATE function */
export async function authenticate(username) {
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error: "Username doesn't exists...!" }
    }
}

/* get user details */
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/getUser/${username}`);
        return { data };
    } catch (error) {
        return { error: "Username doesn't exists...!" }
    }
}

/* register user function */
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post(`/api/register`, credentials);
        // get username and email from credentials object
        let { username, email } = credentials;
        /* send email to user */
        if (status === 201) {
            await axios.post('/api/registerMail', { username: username, useremail: email, text: msg });
        }
        return Promise.resolve({ msg });
    } catch (error) {
        return Promise.reject({ error })
    }
}

/* login user */
export async function login({ username, password }) {
    try {
        if (username) {
            const { data } = await axios.post('/api/login', { username, password });
            return Promise.resolve({ data });
        }
        return Promise.reject({ error: "Invalid username...!" });
    } catch (error) {
        return Promise.reject({ error: "Invalid credentials...!" })
    }
}

/* update user */
export async function updateUser(formResponse) {
    try {
        const token = await localStorage.getItem('token');
        const { data } = await axios.put('/api/updateUser', formResponse, { headers: { "Autorization": `Bearer ${token}` } });
        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error: "Could not update user details...!" })
    }
}

/* OTP generation */
export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } });
        // send mail with OTP
        if (status === 201) {
            let { data: { email } } = await getUser({ username });
            let text = `Hello ${username}, your OTP to reset password is: ${code}. Please do not share this with anyone.`;
            await axios.post('/api/registerMail', { username: username, useremail: email, text: text });
        }
        return Promise.resolve({ code });
    } catch (error) {
        return Promise.reject({ error })
    }
}

/* verify OTP */
export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } });
        return { data, status };
    } catch (error) {
        return Promise.reject({ error })
    }
}

/* reset password */
export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status });
    } catch (error) {
        return Promise.reject({ error })
    }
}