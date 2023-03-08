import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LockResetIcon from '@mui/icons-material/LockReset';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import './../assets/main.css';
import { setUser } from '../actions/index'

export default function Auth() {
    
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm({});

    const [needAlert, setNeedAlert] = useState(false)
    const [alertText, setAlertText] = useState();

    const onSubmit = data => {
        if (data?.employeeId && data?.password) {
            axios.post('http://127.0.0.1:5000/login/', data).then(response => {
                console.log(response)
                if(response.data.authenticated) {
                    dispatch(setUser({
                        employeeId: response.data.cookie.employeeId, 
                        name: response.data.cookie.name
                    }));
                }
                else {
                    setNeedAlert(true)
                    setAlertText("Deze gegevens zijn onjuist")
                }
            }).catch(e => {
                setNeedAlert(true)
                setAlertText(e)
            })
        }
        else {
            setNeedAlert(true)
            setAlertText("Vul gelieve een werknemers Id en/of wachtwoord in.")
        }
    }

    useEffect(() => {
        if(needAlert) {
            setTimeout(() => {setNeedAlert(false)}, 3000)
        }
    }, [needAlert]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-container">   

                    <TextField autoFocus
                               className='login-input'
                               margin="dense"
                               id="name"
                               label="Werknemers ID"
                               type="text"
                               variant="standard"
                               {...register('employeeId')} 
                    />
                    <TextField autoFocus
                               className='login-input'
                               margin="dense"
                               id="name"
                               label="Wachtwoord"
                               type="password"
                               variant="standard"
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
                
                    {needAlert && 
                        <div className='login-alert'>
                            <Alert variant="filled" severity="error" className='errorMessage'>
                                    {alertText}
                            </Alert>
                        </div>
                    }
                </div>
            </form>
        </div>
    );
}