import toast from 'react-hot-toast';

// validate login page username
export async function loginUsernameValidate(values) {
    const errors = usernameValidate({}, values);
    return errors;
}

// validate username
function usernameValidate(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required...!')
    } else if (values.username.includes(" ")) {
        error.username = toast.error('Invalid username...!')
    }

    return error
}

export async function loginPasswordValidate(values) {
    const errors = passwordValidate({}, values);
    return errors;
}

function passwordValidate(errors = {}, values) {
    if (!values.password) {
        errors.password = toast.error('Password Required...!')
    } else if (values.password.includes(" ")) {
        errors.password = toast.error('Invalid Password...!')
    } else if(values.password.length < 4) {
        errors.password = toast.error('Length of password must be greater than 4...!')
    }
    return errors
}