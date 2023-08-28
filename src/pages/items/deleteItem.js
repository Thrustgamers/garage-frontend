import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios';

//Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { SetRefresh, setAlert } from '../../actions/index';

export const DeleteItem = props => {

    const dispatch = useDispatch();

    const [openMenu, setOpenMenu] = useState(props.open)

    const handleDelete = () => {
        axios.delete('http://localhost:5000/items/remove/' + props.id).then(()=> {
            dispatch(SetRefresh(true))
            dispatch(setAlert({
                needAlert: true,
                alertMessage: 'Item succesvol verwijdered',
                alertType: 'success'
            }))
        }).catch((e) => {
            console.log(e)
        });
    }
    
    return (
        <>
            <Dialog open={openMenu} onClose={() => setOpenMenu(false)}>
                <DialogTitle>Item verwijderen</DialogTitle>
                <DialogContentText id="alert-dialog-slide-description">
                    Weet je zeker dat je dit item wilt verwijderen?
                </DialogContentText>
                <DialogActions>
                    <Button onClick={() => {handleDelete() 
                                            setOpenMenu(false)}}>Verwijderen</Button>
                    <Button onClick={() => setOpenMenu(false)}>Annuleren</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}