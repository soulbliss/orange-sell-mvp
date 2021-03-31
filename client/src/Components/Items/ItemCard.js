import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import EditItemCardModal from './EditItemCardModal'



import { Container, Row, Col } from 'reactstrap';


import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import moment from 'moment';

const ItemCard = ({ _id, item, tag, version, updatedDate, username }) => {

    var monthDay = moment(parseInt(updatedDate)).format('MMM DD')
    var hourMin = moment(parseInt(updatedDate)).format('h:mm A')


    var path = "/t/" + _id + "/timeline"
    const newTo = {
        pathname: path,
        state: { item }
    };

    return (



        <Paper className="ItemCard" elevation={0}>
            <Container>

                <Divider />

                <Row style={{ marginTop: 10, justifyContent: "center" }}>

                    <Link to={`/user/` + username}  >
                        <Chip

                            label={username} style={{ marginRight: 5 }} />
                    </Link>


                    <p style={{ marginTop: 5, marginRight: 5 }}>selling</p>

                    <Chip

                        label={item} style={{ marginRight: 5 }} />



                    <p style={{ marginTop: 5, marginRight: 5 }}>at </p>


                    <Chip

                        label={tag} />
                    
                    <p style={{ marginTop: 5,  marginLeft: 5, marginRight: 5 }}> ₹/kg</p>


                </Row>



            </Container>
        </Paper >
    );
}

export default ItemCard;

