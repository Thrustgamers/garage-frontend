import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

//Material UI
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

import './../assets/main.css';

export default function Main() {

    const { register, handleSubmit } = useForm({});

    const [tableData, setTableData] = useState([]);
    const [addMenu, setAddMenu] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

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
             setRefresh(false)
        })
    }

    const handleAddMenuClick = () => {
        if(addMenu) {
            setAddMenu(false);
        }
        else {
            setAddMenu(true);
        }
    }

    const handleModelChange = values => {
        setSelectedItem(values)
    };

    const onSubmit = values => {
        axios.post('http://127.0.0.1:5000/items/post', values)
        .then((ef) => {
            console.log(ef)
            setRefresh(true)
        }).catch((e) => {
            console.log(e)
        });
    }

    const handleDelete = () => {
        console.log(selectedItem)
    }

    useEffect(() => {
        if(refresh) {
            fetchItems()
        }        
    }, [refresh])

    useEffect(() => {
        fetchItems()
    }, [])
    
    return (
        <React.Fragment>
            <div className="main-container">
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleDelete} startIcon={<DeleteIcon />}>
                        Verwijderen
                    </Button>
                    <Button variant="contained" onClick={handleAddMenuClick} endIcon={<AddIcon />}>
                        Toevoegen
                    </Button>
                    <Button variant="contained" endIcon={<EditIcon />}>
                        Aanpassen
                    </Button>
                </Stack>
                
                <DataGrid className='datagrid'
                        rows={tableData}
                        columns={columns}
                        rowsPerPageOptions={[10]}
                        checkboxSelection = {false}                     
                        onSelectionModelChange={handleModelChange}  />      
                                
            </div>

            {addMenu &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="addItem-container">            
                        <input type='text'
                               className='input'
                               placeholder='Naam onderdeel' 
                               {...register('itemName')} />

                        <input type='text'
                               className='input'
                               placeholder='serienummer' 
                               {...register('itemId')} /> 

                        <input type='number'
                               className='input'
                               placeholder='Hoeveelheid' 
                               {...register('quantity')} /> 

                        <div className='logingroup'>
                            <button type='submit'>Opslaan</button>
                            <button onClick={handleAddMenuClick}>Annuleren</button>
                        </div>
                    </div>
                </form>
            } 

        </React.Fragment>
    );
}