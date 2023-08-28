import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

//Material UI
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CropFreeIcon from '@mui/icons-material/CropFree';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import Alert from '@mui/material/Alert';

import { SetRefresh, logOut, setAlert } from '../actions/index'
import { AddItem } from './items/addItem';
import { EditItem } from './items/editItem';
import { DeleteItem } from './items/deleteItem';
import { GenBarcode } from './barcode/genBarcode';
import { ScanBarcode } from './barcode/scanBarcode';


export default function AdminBoard() {

    const dispatch = useDispatch();

    const refresh = useSelector(state => state.userState.refresh);
    const searchId = useSelector(state => state.userState.searchId);
    const needAlert = useSelector(state => state.userState.needAlert);
    const alertMessage = useSelector(state => state.userState.alertMessage);
    const alertType = useSelector(state => state.userState.alertType);
    const [tableData, setTableData] = useState([]);
    const [editMenu, setEditMenu] = useState(false);
    const [addMenu, setAddMenu] = useState(false);
    const [deleteMenu, setDeleteMenu] = useState(false);
    const [barcodeMenu, setBarcodeMenu] = useState(false);
    const [scanBarcodeMenu, setScanBarcodeMenu] = useState(false);
    const [test, setTest] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [newItemSerial, setNewItemSerial] = useState('');

    const columns = [
        { field: 'itemName', headerName: 'Name', width: 230},
        { field: 'itemId', headerName: 'Serial Number', width: 230},
        { field: 'quantity', headerName: 'Quantity', width: 230},
    ];

    const fetchItems = () => {
        axios.get('http://localhost:5000/items').then(response => {
            setTableData(response.data)
        }).catch(() => {
            //not in use
        }).finally(() => {
            dispatch(SetRefresh(false))
        })
    }

    const handleModelChange = values => {
        setSelectedItem(values)
        setTest(true)
    };

    useEffect(() => {
        if(refresh) {
            fetchItems()
            SetRefresh(false)
        }        
    }, [refresh])

    useEffect(() => {
        fetchItems()
    }, [])

    useEffect((data) => {
        console.log(searchId)
        if (searchId > 0) {
            for (let item in data) {
                console.log(item)
                // if (item.itemId == searchId) {
                //     setSelectedItem(searchId)
                //     setEditMenu(true)
                // }
                // else {
                //     setAddMenu(true)
                //     setNewItemSerial(searchId)
                // }
            }
        }
    }, [searchId])

    useEffect(() => {
        setTimeout(() => dispatch(setAlert({
            needAlert: false,
            alertMessage: ''
        })), 3000)
    }, [needAlert])

    return (
        <React.Fragment>
            <div className="main-container">
                
                {needAlert &&
                    <Alert severity={alertType} 
                           variant="filled" 
                           className='dashboardAlert'>
                           {alertMessage}
                    </Alert>
                }

                <div className="profile-button">  
                    <Button onClick={() => dispatch(logOut({employeeId: null, name: null}))}>
                            <Avatar sx={{ bgcolor: blue[500] }} variant="rounded">
                                <AccountBoxIcon />
                            </Avatar>
                    </Button>
                </div>
                <div className='button-group'>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" 
                                onClick={() => setDeleteMenu(!deleteMenu)} 
                                startIcon={<DeleteIcon />}>
                            Verwijderen
                        </Button>
                        <Button variant="contained" 
                                onClick={() => setAddMenu(!addMenu)} 
                                startIcon={<AddIcon />}>
                            Toevoegen
                        </Button>
                        <Button variant="contained" 
                                onClick={() => setEditMenu(!editMenu)}
                                disabled= {!test} 
                                startIcon={<EditIcon />}>
                            Aanpassen
                        </Button>
                        <Button variant="contained" 
                                onClick={() => setBarcodeMenu(!barcodeMenu)} 
                                disabled= {!test} 
                                startIcon={<CropFreeIcon />}>
                            Maak Barcode
                        </Button>
                        <Button variant="contained" 
                                onClick={() => setScanBarcodeMenu(!scanBarcodeMenu)} 
                                startIcon={<CropFreeIcon />}>
                            Scan Barcode
                        </Button>
                    </Stack>
                </div>
                <DataGrid className='datagrid'
                        rows={tableData}
                        columns={columns}
                        rowsPerPageOptions={[10]}
                        selectRow = {selectedItem}
                        checkboxSelection = {false}                     
                        onSelectionModelChange={handleModelChange} 
                         />  
                               
            </div>

            {editMenu &&
                <EditItem open={editMenu} id={newItemSerial}/>
            } 
            {addMenu && 
                <AddItem open={addMenu} id={selectedItem}/>
            }
            {deleteMenu && 
                <DeleteItem open={deleteMenu} id={selectedItem}/>
            }
            {barcodeMenu &&
                <GenBarcode open={barcodeMenu} id={selectedItem}/>
            } 
            {scanBarcodeMenu &&
                <ScanBarcode open={scanBarcodeMenu} />
            }
        </React.Fragment>
    );
}