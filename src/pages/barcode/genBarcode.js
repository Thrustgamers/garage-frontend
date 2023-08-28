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

export const GenBarcode = props => {

    const [ready, setReady] = useState(false)
    const [openMenu, setOpenMenu] = useState(props.open)
    const [data, setData] = useState({})

    useEffect(() => {
        axios.get('http://localhost:5000/items/' + props.id).then(response => {
            setData(response.data[0])
        }).catch(() => {
            //not in use
        }).finally(() => {
            setReady(true)
        })
    }, [])
    
    return (
        <>
            {ready &&
                <Dialog open={openMenu} onClose={() => setOpenMenu(false)} className="codeGenerator-menu">
                    <DialogTitle>Codes</DialogTitle>
                    <DialogContentText id="alert-dialog-slide-description">
                        <center>

                            <Divider>Barcode</Divider>
                            <Barcode value={data.itemId} />
                            
                            <Divider>QRCode</Divider>
                            <QRCode value={data.itemId}/>

                        </center>
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => setOpenMenu(false)}>Sluiten</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    );
}