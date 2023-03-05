import toast from 'react-hot-toast';

import { authenticate } from './helper';

function usernameValidate(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required...!')
    } else if (values.username.includes(" ")) {
        error.username = toast.error('Invalid username...!')
    }

    return error
}

function passwordValidate(errors = {}, values) {
    if (!values.password) {
        errors.password = toast.error('Password Required...!')
    } else if (values.password.length < 4) {
        errors.password = toast.error('Length of password must be greater than 4...!')
    }
    return errors
}

function emailValidate(errors = {}, values) {
    if (!values.email) {
        errors.email = toast.error("Email required...!");
    } else if (values.email.includes(" ")) {
        errors.email = toast.error("Invalid email...!");
    } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
        errors.email = toast.error("Invalid email...!");
    }
    return errors;
}

/* username page validation */
export async function loginUsernameValidate(values) {
    const errors = usernameValidate({}, values);

    // check user existence
    if (values.username) {
        const { status } = await authenticate(values.username);
        if (status !== 200) {
            return errors.exist = toast.error('User does not exists...!')
        }
    }
    return errors;
}

/* password page validation */
export async function loginPasswordValidate(values) {
    const errors = passwordValidate({}, values);
    return errors;
}


/* reset page validation */
export async function resetPasswordValidate(values) {
    const errors = passwordValidate({}, values);

    if (values.password != values.confirmPassword) {
        errors.passwordsMatch = toast.error('Passwords do not match...!')
    }
    return errors;
}

/* register page validation */
export async function registerPageValidation(values) {
    const errors = usernameValidate({}, values);
    passwordValidate(errors, values);
    emailValidate(errors, values);
    return errors;
}

/* profile page validation */
export async function profilePageValidation(values) {
    const errors = emailValidate({}, values);
    return errors;
}