import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

//Material UI
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';

import './../assets/main.css';
import { SetRefresh, logOut } from '../actions/index'
import { AddItem } from './addItem';
import { EditItem } from './editItem';

export default function Main() {

    const dispatch = useDispatch();

    const refresh = useSelector(state => state.userState.refresh);
    const [tableData, setTableData] = useState([]);
    const [editMenu, setEditMenu] = useState(false);
    const [addMenu, setAddMenu] = useState(false);
    const [test, setTest] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const columns = [
        { field: 'itemName', headerName: 'Item name', width: 200},
        { field: 'itemId', headerName: 'Item number', width: 200},
        { field: 'quantity', headerName: 'Quantity', width: 200},
    ];

    const fetchItems = () => {
        axios.get('http://127.0.0.1:5000/items').then(response => {
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

    const handleDelete = () => {
        axios.delete('http://127.0.0.1:5000/items/remove/' + selectedItem).then(()=> {
            dispatch(SetRefresh(true))
        }).catch((e) => {
            console.log(e)
        });
    }

    useEffect(() => {
        if(refresh) {
            fetchItems()
            SetRefresh(false)
        }        
    }, [refresh])

    useEffect(() => {
        fetchItems()
    }, [])
    
    return (
        <React.Fragment>
            <div className="main-container">
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
                                onClick={handleDelete} 
                                startIcon={<DeleteIcon />}>
                            Verwijderen
                        </Button>

                        <Button variant="contained" 
                                onClick={() => setAddMenu(!addMenu)} 
                                endIcon={<AddIcon />}>
                            Toevoegen
                        </Button>
                        <Button variant="contained" 
                                onClick={() => setEditMenu(!editMenu)}
                                disabled= {!test} 
                                endIcon={<EditIcon />}>
                            Aanpassen
                        </Button>
                    </Stack>
                </div>
                <DataGrid className='datagrid'
                        rows={tableData}
                        columns={columns}
                        rowsPerPageOptions={[10]}
                        checkboxSelection = {false}                     
                        onSelectionModelChange={handleModelChange}  />      
                                
            </div>

            {editMenu &&
                <EditItem open={editMenu} 
                          id={selectedItem}/>
            } 
 
            {addMenu && 
                <AddItem open={addMenu}/>
            }

        </React.Fragment>
    );
}