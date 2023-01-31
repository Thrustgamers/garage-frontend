import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { Alert } from '@mui/material';
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
            axios.get('http://127.0.0.1:5000/login/' + data.employeeId + '-' + data.password).then(response => {
                if(response.data) {
                    dispatch(setUser());
                }
                else {
                    setNeedAlert(true)
                    setAlertText("Deze gegevens zijn onjuist")
                }
            }).catch(() => {
                //not in use
            }).finally(() => {
                 //not in use
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
                    <input type='text'
                           className='login-input'
                           placeholder='Werknemers ID' 
                           {...register('employeeId')} />

                    <input type='password'
                           className='login-input'
                           placeholder='Wachtwoord' 
                           {...register('password')} /> 

                    <div className='logingroup'>
                        <button type='submit'>Inloggen</button>
                        <button onClick={() => {alert('Imagine losing your password DUDE')}}>Wachtwoord vergeten</button>
                    </div>

                    {needAlert && 
                        <Alert variant="filled" severity="error" className='errorMessage'>
                                {alertText}
                        </Alert>
                    }
                </div>
            </form>
        </div>
    );
}