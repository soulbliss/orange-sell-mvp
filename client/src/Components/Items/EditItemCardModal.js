import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import EditIcon from '@material-ui/icons/Edit';

import { useMutation, useQuery } from "@apollo/react-hooks";
import {
    EDIT_ITEM,
    DELETE_ITEM
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
        width: "90%",
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
        // border: '2px solid #000',
        padding: theme.spacing(2, 4, 3),
        textAlign: "center"
    },
}));

export default function EditItemCardModal({ _id, item, tag }) {


    const [addItem,
        { data: ItemMutatedata,
            loading: ItemMutateLoading,
            error: ItemMutateError }] = useMutation(EDIT_ITEM);

    const [deleteItem,
        { data: deleteMutatedata,
            loading: deleteMutateLoading,
            error: deleteMutateError }] = useMutation(DELETE_ITEM);

    


    const [Item, setItem] = useState(item);
    const [Tag, setTag] = useState(tag);

    const handleItemChange = (event) => setItem(event.target.value)
    const handleTagChange = (event) => setTag(event.target.value)

    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="add-item-modal-title">Refine your item</h2>

            <TextField id="textfield-modal" multiline
                defaultValue={Item}
                onChange={handleItemChange}
                value={[Item]}
            />

            <hr />

            <p id="add-item-modal-tag">edit Rate</p>

            <TextField id="textfield-modal" multiline
                defaultValue={Tag}
                onChange={handleTagChange}
                value={[Tag]}
                InputProps={{
                    startAdornment: <InputAdornment position="start">₹/kg</InputAdornment>,
                }}
            />

            <br />

            <Button style={{ marginTop: 20 }}
                variant="contained"
                onClick={e => {
                    e.preventDefault();
                    
                    addItem({
                        variables: {
                            _id: _id, item: Item, tag: Tag
                        }
                    });

                }}

            >Save</Button>



            <Button style={{ marginTop: 20, marginLeft: 20 }}
                variant="contained"
                onClick={e => {
                    e.preventDefault();

                    deleteItem({
                        variables: {
                            _id: _id
                        }
                    });

                }}

            >Delete</Button>
            {ItemMutatedata && null}
            {ItemMutateLoading && <p>Loading...</p>}
            {ItemMutateError && <p>Error :( Please try submitting again</p>}
            
            {deleteMutatedata && null}
            {deleteMutateLoading && <p>Deleting...</p>}
            {deleteMutateError && <p>Error :( Please try deleting again</p>}

        </div>
    );

    return (
        <div>
            <IconButton style={{ marginLeft: 10 }} onClick={handleOpen}>
                <PlaylistAddIcon />
            </IconButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
