import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import {BarcodeScanner} from '@thewirv/react-barcode-scanner';

//Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { setSearchItem, setAlert } from '../../actions/index';

export const ScanBarcode = props => {

    const dispatch = useDispatch();

    const [openMenu, setOpenMenu] = useState(props.open);
    const [data, setData] = useState('');

    useEffect(() => {
        if (data) {
            axios.get('http://localhost:5000/items/barcode/' + data).then(response => {
                console.log(response.data)
                if (response.data[0]) {
                    dispatch(setSearchItem(response.data[0].id))
                }
                else {
                    dispatch(setAlert({
                        needAlert: true,
                        alertMessage: 'Dit serie nummer zit nog niet in het systeem.',
                        alertType: 'error'
                    }))
                    console.log(data)
                    dispatch(setSearchItem(data))
                } 
                setOpenMenu(false)
            })
        }
    }, [data])

    return (
        <>
            <Dialog open={openMenu} onClose={() => setOpenMenu(false)} className="codeGenerator-menu">
                <DialogTitle>Scanner</DialogTitle>
                <DialogContentText id="alert-dialog-slide-description">
                    <center>

                    <BarcodeScanner
                        onSuccess={(text) => setData(text)}
                        onError={(error) => {
                            if (error) {
                                console.error(error);
                            }
                        }}
                        onLoad={() => console.log('video started')}
                    />
                    

                    </center>
                </DialogContentText>
                <DialogActions>
                    <Button onClick={() => setOpenMenu(false)}>Sluiten</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}