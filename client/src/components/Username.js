import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import { useAuthStore } from '../store/store';
import { loginUsernameValidate } from '../helper/validate';

export default function Username() {

    // useAuthStore(state => {
    //     console.log(state);
    // })

    const setUsername = useAuthStore((state) => {return state.setUsername})
    // this is how username will be accessed in other components!!!
    // const usernameFromStore = useAuthStore((state) => {return state.auth.username})

    const formik = useFormik({
        initialValues: {
            username: ''
        },
        validate: loginUsernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            // console.log(values);
            setUsername(values.username);
        }
    })

    return (
        <div className='container mx-auto'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-screen'>
                <div className={styles.glass}>
                    <div className='title flex flex-col items-center'>
                        <h4 className='text-5xl font-bold'>Hello User</h4>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                            Explore more by connecting!
                        </span>
                    </div>
                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-4'>
                            <img className={styles.profile_img} src={avatar} alt='avatar' />
                        </div>
                        <div className='textbox flex flex-col items-center gap-6'>
                            <input {...formik.getFieldProps('username')} className={styles.text_box} type="text" placeholder='Username'/>
                            <button className={styles.btn} type='submit'>Let's Go</button>
                        </div>
                        <div className='text-center py-4'>
                            <span className='text-gray-500'>Not a member, <Link to="/register" className='text-red-500'>Register Now</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
