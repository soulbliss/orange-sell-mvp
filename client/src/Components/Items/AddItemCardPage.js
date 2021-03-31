import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


import { useMutation, useQuery } from "@apollo/react-hooks";

import {
    ADD_ITEM,
} from '../../queries';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '90%',
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
        padding: theme.spacing(2, 4, 3),
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
        zIndex: 1000
    },

}));

export default function AddItemCardPage() {

    const [item, setItem] = useState('');
    const [tag, setTag] = useState('');

    const handleItemChange = (event) => setItem(event.target.value)
    const handleTagChange = (event) => setTag(event.target.value)

    const validateForm = () => {

        const isInvalid = !item || !tag;

        return isInvalid;

    }


    const [addItem,
        { data: ItemMutatedata,
            loading: ItemMutateLoading,
            error: ItemMutateError }] = useMutation(ADD_ITEM);




    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };


    const body = (
        <div style={modalStyle} className={classes.paper}>

            <h3 id="add-item-modal-title">Add your item</h3>

            <TextField
                multiline
                rows={4}
                onChange={handleItemChange}
                value={[item]} />



            <p id="add-item-modal-tag">add rate</p>

            <TextField multiline onChange={handleTagChange}
                value={[tag]}
                InputProps={{
                    startAdornment: <InputAdornment position="start">₹/kg</InputAdornment>,
                }}
            />


            <br />

            <Button style={{ marginTop: 20 }}
                variant="contained"

                disabled={ItemMutateLoading || validateForm()}
                onClick={e => {
                    e.preventDefault();

                    addItem({
                        variables: {
                            item,
                            tag
                        }
                    });



                }}

            >Save</Button>
            {ItemMutatedata && null}
            {ItemMutateLoading && <p>Loading...</p>}
            {ItemMutateError && <p>Error :( Please try submitting again</p>}


        </div>
    );

    return (
        <div>

            <Fab className={classes.fab} onClick={handleModalOpen}
                color="primary">
                <AddIcon />
            </Fab>

            <Modal
                open={open}
                onClose={handleModalClose}

            >
                {body}
            </Modal>
        </div>
    );
}
