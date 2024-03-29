import React, { useState } from 'react';
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

import { SetRefresh, setAlert } from '../../actions/index'

export const AddItem = props => {
    
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm({});

    const [openMenu, setOpenMenu] = useState(props.open)

    const onSubmit = values => {
        axios.post('http://localhost:5000/items/post', values).then(response => {
            
            if (response) {
                let color = 'success'
                if (response.data  !== 'OK') {
                    color = 'error'
                }
                setOpenMenu(false)
                dispatch(SetRefresh(true))
                dispatch(setAlert({
                    needAlert: true,
                    alertMessage: response.data || 'Item Added',
                    alertType: color
                }))
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    
    return (
        <>
            <Dialog open={openMenu} onClose={() => setOpenMenu(false)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Item toevoegen</DialogTitle>
                        <DialogContent>
                        <TextField autoFocus
                                   margin="dense"
                                   id="name"
                                   label="Naam onderdeel"
                                   type="text"
                                   fullWidth
                                   variant="standard"
                                   {...register('itemName')} 
                        />
                        <TextField autoFocus
                                   margin="dense"
                                   id="name"
                                   label="serienummer"
                                   type="text"
                                   defaultValue={props.id ?? ''}
                                   fullWidth
                                   variant="standard"
                                   {...register('itemId')} 
                        />
                        <TextField autoFocus
                                   margin="dense"
                                   id="name"
                                   label="Hoeveelheid"
                                   type="number"
                                   fullWidth
                                   variant="standard"
                                   {...register('quantity')} 
                        />
                        </DialogContent>
                    <DialogActions>
                        <Button type="submit">Opslaan</Button>
                        <Button onClick={() => setOpenMenu(false)}>Annuleren</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}