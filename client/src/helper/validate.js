import toast from 'react-hot-toast';

// validate login page username
export async function loginUsernameValidate(values) {
    const errors = usernameValidate({}, values);
    return errors;
}

// validate username
function usernameValidate(error={}, values) {
    if(!values.username) {
        error.username = toast.error('Username Required...!')
    } else if(values.username.includes(" ")) {
        error.username = toast.error('Invalid username...!')
    }

    return error
}