import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Cookies } from 'react-cookie';

import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LockResetIcon from '@mui/icons-material/LockReset';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import { setUser } from '../../actions/index'

export default function Auth() {
    
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm({});

    const [needError, setNeedError] = useState(false)

    const onSubmit = data => {
        if (!data.employeeId && !data.password) { setNeedError(true) }
        axios.post('http://localhost:5000/user/login', data).then(response => {            
            if(response.data.authenticated) { 
                dispatch(setUser({
                    employeeId: response.data.data.employeeId, 
                    name: response.data.data.name,
                    isAdmin: response.data.data.isAdmin
                }));
            }
            else {
                setNeedError(true) 
            }
        }).catch(e => {
            setNeedError(true)
        })
    }

    useEffect(() => {
        if(needError) {
            setTimeout(() => {setNeedError(false)}, 3000)
        }
    }, [needError]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-container">   

                    <TextField autoFocus
                               error={needError}
                               className='login-input'
                               margin="dense"
                               id="name"
                               label="Werknemers ID"
                               type="text"
                               variant="outlined"
                               {...register('employeeId')} 
                    />
                    <TextField autoFocus
                               error={needError}
                               className='login-input'
                               margin="dense"
                               id="name"
                               label="Wachtwoord"
                               type="password"
                               variant="outlined"
                               {...register('password')} 
                    />
                                  
                    <Button variant="contained" 
                            type='submit'
                            startIcon={<LoginIcon />}>
                            Log In
                    </Button>
                    <Button variant="contained" 
                            onClick={() => alert('Forgot Password')}
                            startIcon={<LockResetIcon />}>
                            Wachtwoord vergeten
                    </Button>
                </div>
            </form>
        </div>
    );
}