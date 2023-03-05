import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

// central store access
import { useAuthStore } from '../store/store';
import useFetch from '../hooks/fetch.hook';
import { loginPasswordValidate } from '../helper/validate';

export default function Password() {

    const { username } = useAuthStore(state => state.auth);
    const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: loginPasswordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            console.log(values);
        }
    })

    // useEffect(()=>console.log(apiData), apiData);

    if (isLoading) {
        return <h1 className='text-2xl text-bold'>Loading...!</h1>
    }
    if(serverError) {
        return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
    }

    return (
        <div className='container mx-auto'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-screen'>
                <div className={styles.glass}>
                    <div className='title flex flex-col items-center'>
                        <h4 className='text-5xl font-bold'>Hello {apiData?.user?.firstName || apiData?.user?.username}</h4>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                            Explore more by connecting!
                        </span>
                    </div>
                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-4'>
                            <img className={styles.profile_img} src={apiData?.user?.profileImg || avatar} alt='avatar' />
                        </div>
                        <div className='textbox flex flex-col items-center gap-6'>
                            <input {...formik.getFieldProps('password')} className={styles.text_box} type="password" placeholder='Password' />
                            <button className={styles.btn} type='submit'>Sign In</button>
                        </div>
                        <div className='text-center py-4'>
                            <span className='text-gray-500'><Link to="/recovery" className='text-red-500'>Forgot Password</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
