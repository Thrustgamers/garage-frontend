import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import axios from 'axios';

//Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import './../assets/main.css';
import { SetRefresh } from '../actions/index'

export const EditItem = props => {

    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm({});

    const [ready, setReady] = useState(false)
    const [openMenu, setOpenMenu] = useState(props.open)
    const [data, setData] = useState({})

    const onSubmit = values => {
        axios.put('http://127.0.0.1:5000/items/update/' + props.id, values).catch((error) => {
            console.log(error)
        }).finally(() => {
            setOpenMenu(false)
            dispatch(SetRefresh(true))
        });
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/items/' + props.id).then(response => {
            console.log(response.data)
            setData(response.data)
        }).catch(() => {
            //not in use
        }).finally(() => {
            setReady(true)
        })
    }, [])
    
    return (
        <>
            {ready &&
                <Dialog open={openMenu} onClose={() => setOpenMenu(false)}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogTitle>Item toevoegen</DialogTitle>
                            <DialogContent>
                                <TextField autoFocus
                                        margin="dense"
                                        id="outlined-size-small"
                                        label="Naam onderdeel"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        defaultValue={data[0].itemName}
                                        {...register('itemName')} 
                                />
                                <TextField autoFocus
                                        margin="dense"
                                        id="outlined-size-small"
                                        label="serienummer"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        defaultValue={data[0].itemId}
                                        {...register('itemId')} 
                                />
                                <TextField autoFocus
                                        margin="dense"
                                        id="outlined-size-small"
                                        label="Hoeveelheid"
                                        type="number"
                                        fullWidth
                                        variant="standard"
                                        defaultValue={data[0].quantity}
                                        {...register('quantity')} 
                                />
                            </DialogContent>
                        <DialogActions>
                            <Button type='submit'>Opslaan</Button>
                            <Button onClick={() => setOpenMenu(false)}>Annuleren</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            }
        </>
    );
}