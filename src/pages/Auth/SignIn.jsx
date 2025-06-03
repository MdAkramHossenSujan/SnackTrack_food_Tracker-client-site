import React, { use } from 'react';
import loginanimation from '../../assets/Animation/Animation - 1748252718756.json'
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Lottie from 'lottie-react';
import SocialLogin from '../Shared/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
const SignIn = () => {
    const { signInUser } = use(AuthContext)
const location=useLocation()
const navigate=useNavigate()
const from=location.state || '/';
    const handleSignIn = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        signInUser(data.email, data.password).then(result => {
            console.log(result.user)
            toast.success('Signed In Successfully')
            navigate(from)
        }).catch(error => {
            console.log(error)
            toast.error('Wrong Credential')
        })
        console.log(data)
    }
    return (
        <div>
            <div className='max-w-7xl text-center py-28 mx-auto'>
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div>
                        <Lottie style={{ width: '300px' }} animationData={loginanimation}>
                        </Lottie>
                    </div>
                    <div class="card bg-base-100 pt-6 w-full max-w-lg shrink-0 shadow-2xl">
                        <div class="text-center lg:text-left">
                            <h1 class="text-5xl text-center font-bold">Sign In!</h1>
                        </div>
                        <div class="card-body">
                            <form onSubmit={handleSignIn} >
                                <fieldset class="fieldset">
                                    <label class="label">Email</label>
                                    <input required type="email" name='email' class="input w-full" placeholder="Email" />
                                    <label class="label">Password</label>
                                    <input required type="password" name='password' class="input w-full" placeholder="Password" />
                                    <div className='flex justify-end'><a class="link text-end link-hover">Forgot password?</a></div>
                                    <button class="btn btn-neutral mt-4">Login</button>
                                </fieldset>
                            </form>
                            <SocialLogin />
                            <div className='text-center'>
                                Don't Have An Account? <Link className='text-blue-600 dark:text-red-400' to={'/register'}>
                                    register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;