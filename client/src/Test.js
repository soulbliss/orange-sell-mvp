import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';


import UploadImage from './Components/Profile/UploadImage'

import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';




const Test = () => {

    const [editStatus, setEditStatus] = useState(false)

    return (

        <Container className="App" >

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ff5500" fill-opacity="1" d="M0,224L60,197.3C120,171,240,117,360,128C480,139,600,213,720,245.3C840,277,960,267,1080,229.3C1200,192,1320,128,1380,96L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
            </svg>

            <Col xs={{ size: 2, offset: 10 }}>

                <IconButton aria-label="delete" onClick={() => setEditStatus(true)}>
                    <EditIcon fontSize="large" />
                </IconButton>

            </Col>




            <Row>
                <Col xs="12" >



                    <div id="user"

                        style={{ backgroundImage: 'url(https://avatars0.githubusercontent.com/u/31365513?s=460&u=2c8ac60846741979dd42ff7835bfab2f6b871b15&v=4https://avatars0.githubusercontent.com/u/31365513?s=460&u=2c8ac60846741979dd42ff7835bfab2f6b871b15&v=4)' }}>


                    </div>


                    {editStatus ? <UploadImage /> : null}

                </Col>

                <Col className="user-info" xs={12}>

                <h3>Welcome deoj!</h3>


                    <Col md={{ size: 6, offset: 3 }} xs={12}>



                        <Paper variant="outlined" />


                        {editStatus ? null :

                            <div className="user-profile-description">
                                he 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versio
                            </div>
                                }


                        <Paper />

                    </Col>



                    {editStatus ?

                        <Col xs={{ size: 6, offset: 3 }}>

                            <TextField id="outlined-basic" label="Your profile description here!" fullWidth variant="outlined" />

                        </Col>

                        : null}




                    {editStatus ? <Button variant="contained" onClick={() => setEditStatus(false)}>Save changes</Button> : null}

                    {/* <p>Username: </p> */}

                    {/* <p>Email: {session.getCurrentUser.email}</p> */}

                    {/* <p>Joined on: {date}</p> */}

                    {/* <p>usertype: {session.getCurrentUser.userType}</p> */}



                </Col>
            </Row>

        </Container>
    );
}



export default Test;

