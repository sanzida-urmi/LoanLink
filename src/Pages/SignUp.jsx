import React from 'react'
import {  useLocation, useNavigate, Link } from 'react-router'
import useAuth from '../hooks/useAuth'
import { TbFidgetSpinner } from 'react-icons/tb'
import { FaArrowRotateRight } from "react-icons/fa6";
import { toast } from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import { imageUpload, saveOrUpdateUser } from '../utils'





function SignUp() {
      const { createUser, updateUserProfile, signInWithGoogle, loading,setMyrole } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'


     const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


      const onSubmit = async data =>{
        console.log("submit")

const {name, image,email,role, password} = data;
setMyrole(role);
// const imgFile = image[0];
console.log(data);

 try {

  
  // const imgURL = await imageUpload(imgFile);
  // console.log(imgURL)

        //2. User Registration
      const result = await createUser(email, password)
      await saveOrUpdateUser({ name, email, image,role})

      // 3. Save username & profile photo
      await updateUserProfile(
        name,image
      )
      console.log(result)

      navigate(from, { replace: true })
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }

  }

     const handleGoogleSignIn = async () => {
        console.log("g")
    try {
      //User Registration using google
      const {user} = await signInWithGoogle()

       await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })

      navigate(from, { replace: true })
            console.log(user)
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  return (
   <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Please Sign Up</h1>
          {/* <p className='text-sm text-gray-400'>Welcome to PlantNet</p> */}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>

            {/* name  */}
            <div>
              <label htmlFor='name' className='block mb-2 text-sm'>
                Name
              </label>

              <input
                type='text'
                id='name'
                placeholder='Enter Your Name'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-sky-500 bg-gray-200 text-sky-500'
                data-temp-mail-org='0'
                {...register('name',{required: 'Name is required',
                  maxLength: {
                    value: 20,
                    message: 'name cannot be too long'
                  },
                })}
              />

              {errors.name && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.name.message}
                </p>
              )}

            </div>
          

             <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                PhotoURL
              </label>

              <input
                type='text'
                id='image'
                placeholder='Enter Your image'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-sky-500 bg-gray-200 text-sky-500'
                data-temp-mail-org='0'
                {...register('image',{required: 'Name is required',
                 
                })}
              />

              {errors.name && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.name.message}
                </p>
              )}

            </div>

            {/*  */}
          
<div>
              <label htmlFor='role' className='block mb-2 text-sm'>
                Role
              </label>

              <select
              id='role'
              {...register("role", {required: "Role is required"})}
              className='select select-bordered w-full bg-sky-200'
              defaultValue=""
              >
                <option value="" disabled>Select Role</option>
                <option value="borrower">Borrower</option>
                <option value="manager">Manager</option>
              </select>
              {errors.role && (
                <p className='text-red-500 text-xs mt-1'>{errors.role.message}</p>
              )}
              </div>

 

            <div>

            {/* email  */}
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter Your Email'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-sky-500 bg-gray-200 text-sky-500'
                data-temp-mail-org='0'
                 {...register('email',{required: 'email is required',
                   pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'plz enter valid email',
                   },
                 })}
              />

              {errors.email && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* pass  */}
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                autoComplete='new-password'
                id='password'
                placeholder='Enter Password'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-sky-500 bg-gray-200 text-sky-500'
                 {...register('password',{required: 'password is required',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message: 'password must be 6 characters,1 lowercase letter, 1 uppercase letter',
                  }
                 })}
              />

              {errors.password && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.password.message}
                </p>
              )}

            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-sky-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <FaArrowRotateRight className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          {/* <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div> */}
          <p className='px-3 text-sm dark:text-gray-400'>
            Or
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-sky-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
