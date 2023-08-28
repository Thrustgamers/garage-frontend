import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Barcode from 'react-barcode';
import QRCode from "react-qr-code";

//Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

export const passwordForget = props => {

    const [ready, setReady] = useState(false)
    const [openMenu, setOpenMenu] = useState(props.open)
    const [data, setData] = useState({})
    
    return (
        <>
            {ready &&
                <Dialog open={openMenu} onClose={() => setOpenMenu(false)} className="codeGenerator-menu">
                    <DialogTitle>Forgot Password</DialogTitle>
                    <DialogContentText id="alert-dialog-slide-description">
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
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => setOpenMenu(false)}>Sluiten</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    );
}