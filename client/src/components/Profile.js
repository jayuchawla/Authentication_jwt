import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/username.module.css';
import extendedStyles from '../styles/profile.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import { profilePageValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';

export default function Profile() {

  const [file, setFile] = React.useState()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      address: ''
    },
    validate: profilePageValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profileImg: file || '' });
      console.log(values);
    }
  })

  /* Formik does not support file uplload, hence need to create custom function */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={`${styles.glass} ${extendedStyles.glass}`}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Update Your Details
            </span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
                <img className={`${styles.profile_img} ${extendedStyles.profile_img}`} src={file || avatar} alt='avatar' />
              </label>
              <input type="file" id="profile" name="profile" onChange={onUpload} />
            </div>
            <div className='textbox flex flex-col items-center gap-6'>
              <div className='name flex w-3/4 gap-10'>
                <input {...formik.getFieldProps('firstName')} className={`${styles.text_box} ${extendedStyles.text_box}`} type="text" placeholder='First Name' />
                <input {...formik.getFieldProps('lastName')} className={`${styles.text_box} ${extendedStyles.text_box}`} type="text" placeholder='Last Name' />
              </div>
              <div className='name flex w-3/4 gap-10'>
                <input {...formik.getFieldProps('mobile')} className={`${styles.text_box} ${extendedStyles.text_box}`} type="text" placeholder='Mobile No.' />
                <input {...formik.getFieldProps('email')} className={`${styles.text_box} ${extendedStyles.text_box}`} type="text" placeholder='Email' />
              </div>
              <input {...formik.getFieldProps('address')} className={`${styles.text_box} ${extendedStyles.text_box}`} type="text" placeholder='Address' />
              <button className={styles.btn} type='submit'>Update</button>
            </div>
            <div className='text-center py-4'>
              <Link to="/" className='text-red-500'>Logout</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
