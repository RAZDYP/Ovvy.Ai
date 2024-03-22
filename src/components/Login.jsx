import React from 'react'
import Navbaar from './Navbaar'
import { Nav } from 'react-bootstrap'
import { useState } from 'react'

function Login(props) {
    return (
        <>
            <div className='login-page-full'>
                {/* <Navbaar /> */}
                <div className='w-100 login-page-container'>
                    <div className=' mb-3 col-md-6 login-page-card '>
                        <h2> Sign in </h2>
                        <form style={{ textAlign: "left" }} className='mb-3'>
                            <div className="form-group mb-4" >
                                <label className='mb-2'>Email </label>
                                <input type="text" value={props.username} onChange={(e) => props.setUsername(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='email' />
                            </div>
                            <div className="form-group mb-4">
                                <label className='mb-2'>Password</label>
                                <input type="password" value={props.password} onChange={(e) => props.setPassword(e.target.value)} className="form-control large " id="exampleInputPassword1" placeholder='Password' />
                            </div>
                            <button type="submit" onClick={props.handleLogin} className="log-in-btn border-0 w-100">Log in</button>
                        </form>
                        <div className='w-100 mb-3 forget-password-text'>
                            <a href=''><p>Forgot your password?</p></a>
                        </div>
                        <p>Don't have an account?</p>
                        <button className='register-btn w-100 mb-3'>Register</button>
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