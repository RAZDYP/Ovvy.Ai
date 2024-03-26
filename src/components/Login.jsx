import React from 'react'
import Navbaar from './Navbaar'
import { Nav } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login(props) {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    const handleLogin = (e) => {
        e.preventDefault()
        let user = JSON.parse(localStorage.getItem('user'))
        if (user.email === input.email && user.password === input.password) {
            localStorage.setItem('isLoggedIn', true)
            navigate('/')
            alert('Login successful')
        }
        else {
            alert('Incorrect email or password')

        }
    }



    return (
        <>
            <div className='login-page-full'>
                {/* <Navbaar /> */}
                <div className='w-100 login-page-container'>
                    <div className=' mb-3 col-md-6 login-page-card '>
                        <h2> Log in </h2>
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
                                <input type="password"
                                    name="password"
                                    value={input.password}
                                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                                    className="form-control large "
                                    placeholder='Password' />
                            </div>
                            <button type="submit" onClick={handleLogin} className="log-in-btn border-0 w-100">Log in</button>
                        </form>

                        <p>Don't have an account?</p>
                        <Link to='/signup'>
                            <button className='register-btn w-100 mb-3'>Register</button>

                        </Link>
                        <small className='opacity-75'>Terms of use | Privacy policy</small>
                    </div>
                    <div className='w-100 ' style={{ textAlign: "center" }}>
                        <p className='text-white'>Pioneering the Future of How Real Estate is Photographed</p>
                    </div>



                </div>
            </div>

        </>
    )
}

export default Login