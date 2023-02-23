import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/username.module.css'

export default function Username() {
    return (
        <div className='container mx-auto'>
            <div className='flex justify-center items-center h-screen'>
                <div className={styles.glass}>
                    <div className='title flex flex-col items-center'>
                        <h4 className='text-5xl font-bold'>Hello User</h4>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                            Explore more by connecting!
                        </span>
                    </div>
                    <form className='py-1'>
                        <div className='profile flex justify-center py-4'>
                            <img className={styles.profile_img} src={avatar} alt='avatar' />
                        </div>
                        <div className='textbox flex flex-col items-center gap-6'>
                            <input className={styles.text_box} type="text" placeholder='Username'/>
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
