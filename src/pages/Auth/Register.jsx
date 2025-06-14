import React, { use, useState } from 'react';
import Lottie from 'lottie-react';
import register from '../../assets/Animation/Animation - 1748197816538.json'
import { AuthContext } from '../../context/AuthContext/AuthContext';
import SocialLogin from '../Shared/SocialLogin';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
const Register = () => {
    const [error, setError] = useState('')
    const [checkError, setCheckError] = useState('')
    const [passError, setPassError] = useState('')
    const { createUser, updateUser, user, resetPass } = use(AuthContext)
    const [email, setEmail] = useState('')
    const navigate=useNavigate()
    const handleRegister = (e) => {
        e.preventDefault()

        const form = e.target;
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        setEmail(data.email)
        // console.log(data)
        const name=data.displayName
        // console.log(name)
        if (name.length < 5) {
            setError('Name Should Be More Than 5 words.')
            return;
        }
        else if (name.length >= 5) {
            setError('')
        }
        const email = form.email.value;
        const password = form.password.value;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        if (!passwordPattern.test(password)) {
            setPassError('Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.');
            return;
        }
        else if (passwordPattern.test(password)) {
            setPassError('')
        }
        const checkbox = form.checkbox;
        if (!checkbox.checked) {
            setCheckError('Accept Term And Conditions.')
            return
        }
        createUser(data.email, data.password)
            .then(result => {
                updateUser({ displayName: data.displayName, photoURL: data.photoURL })
                    .then(() => {
                        navigate('/myfooditems')
                        toast.success('Registered Successfully')
                    }).catch(error => console.log(error))
            }).catch(error => console.log(error))
        // console.log(data)
    }
    const handleForget = (e) => {
        e.preventDefault()
        resetPass(email)
            .then(() => {
                // console.log('Email Sent')
            }).catch(error => console.log(error))


    }
    return (
        <div>
            <div className='max-w-7xl text-center py-28 mx-auto'>
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <Lottie style={{ width: '300px' }} animationData={register}>
                        </Lottie>
                    </div>
                    <div class="card pt-6 bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                        <div class="text-center lg:text-left">
                            <h1 class="text-5xl text-center font-bold">Register Now!</h1>
                        </div>
                        <div class="card-body">
                            <form onSubmit={handleRegister} >
                                <fieldset class="fieldset">
                                    <label class="label">Name</label>
                                    <input type="text" name='displayName' class="input w-full" placeholder="Your Name" />
                                    {
                                        error && <p className='text-start text-red-500'>{error}</p>
                                    }
                                    <label class="label">Photo URL</label>
                                    <input required type="url" name='photoURL' class="input w-full" placeholder="Give Your PhotoURL" />
                                    <label class="label">Email</label>
                                    <input required type="email" name='email' class="input w-full" placeholder="Email" />
                                    <label class="label">Password</label>
                                    <input required type="password" name='password' class="input w-full" placeholder="Password" />
                                    {
                                        passError && <p className='text-start text-red-500'>{passError}</p>
                                    }
                                   <div className='flex justify-between'>
                                    <div className='flex mt-2  gap-3'><input name='checkbox' type="checkbox" className="checkbox dark:text-white dark:border-white" /><p className='my-auto text-accent text-[14px] text-start font-semibold'>Accept Term & Conditions</p></div>
                                     <div className='my-auto'><a onClick={handleForget} class="link link-hover">Forgot password?</a></div>
                                   </div>
                                    {
                            checkError && <p className='text-red-500 text-start'>{checkError}</p>
                        }
                                    <button class="btn btn-neutral mt-4">Register</button>
                                </fieldset>
                            </form>
                            <SocialLogin />
                            <div className='text-center'>
                                Already Have An Account? <Link className='text-blue-600 dark:text-red-400' to={'/signin'}>
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;