import toast from 'react-hot-toast';

/* username page validation */
export async function loginUsernameValidate(values) {
    const errors = usernameValidate({}, values);
    return errors;
}

function usernameValidate(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required...!')
    } else if (values.username.includes(" ")) {
        error.username = toast.error('Invalid username...!')
    }

    return error
}

/* password page validation */
export async function loginPasswordValidate(values) {
    const errors = passwordValidate({}, values);
    return errors;
}

function passwordValidate(errors = {}, values) {
    if (!values.password) {
        errors.password = toast.error('Password Required...!')
    } else if(values.password.length < 4) {
        errors.password = toast.error('Length of password must be greater than 4...!')
    }
    return errors
}

/* reset page validation */
export async function resetPasswordValidate(values) {
    const errors = passwordValidate({}, values);
    
    if(values.password != values.confirmPassword) {
        errors.passwordsMatch = toast.error('Passwords do not match...!')
    }
    return errors;
}