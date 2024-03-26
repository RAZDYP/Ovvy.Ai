import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function SignUp() {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    console.log(input)
    const handleSignUp = (e) => {
        e.preventDefault()
        localStorage.setItem('user', JSON.stringify(input))
        navigate('/login')
    };

    return (
        <div className='login-page-full'>
            {/* <Navbaar /> */}
            <div className='w-100 login-page-container'>
                <div className=' mb-3 col-md-6 login-page-card '>
                    <h2> Register </h2>
                    <form style={{ textAlign: "left" }} className='mb-3'>
                        <div className="form-group mb-4" >
                            <label className='mb-2'>Email </label>
                            <input
                                type="text"
                                name="email"
                                value={input.email}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                className="form-control"
                                placeholder='email' />
                        </div>
                        <div className="form-group mb-4">
                            <label className='mb-2'>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={input.passwprd}
                                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                className="form-control large "
                                placeholder='Password' />
                        </div>
                        <button type="submit" onClick={handleSignUp} className="log-in-btn border-0 w-100">Register</button>
                    </form>

                    <p>Already have an account?</p>
                    <Link to='/login'>
                        <button className='register-btn w-100 mb-3'>Login</button>
                    </Link>
                    <small className='opacity-75'>Terms of use | Privacy policy</small>
                </div>
                <div className='w-100 ' style={{ textAlign: "center" }}>
                    <p className='text-white'>Pioneering the Future of How Real Estate is Photographed</p>
                </div>



            </div>
        </div>
    )
}

export default SignUp