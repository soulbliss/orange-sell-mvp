import React, { useState } from 'react';

import HeaderUser from '../HeaderUser';

import { Container, Row, Col } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import moment from 'moment';

import { useMutation, useQuery } from "@apollo/react-hooks";
import {
    EDIT_DESCRIPTION
} from '../../queries';



const UserInfo = ({ session, username, descriptionUser }) => {

    const [editStatus, setEditStatus] = useState(false)
    const [description, setDescription] = useState(descriptionUser)

    const handleDescriptionChange = (event) => setDescription(event.target.value)

    const [editDescription,
        { data: DescriptionMutatedata,
            loading: DescriptionMutateLoading,
            error: DescriptionMutateError }] = useMutation(EDIT_DESCRIPTION);



    var date = moment(parseInt(session.getCurrentUser.joinDate)).format('MMM DD, YYYY')

    var userType = session.getCurrentUser.userType

    var loggedUser = session.getCurrentUser.username

    return (



        <Container fluid style={{ paddingRight: 0, paddingLeft: 0 }}>

            <HeaderUser userType={userType} />

            <Row>

                {loggedUser === username ? <Col xs={{ size: 2, offset: 10 }}>

                    <IconButton aria-label="delete" onClick={() => setEditStatus(true)}>
                        <EditIcon fontSize="large" />
                    </IconButton>

                </Col> : null}

                <Col xs={12}>

                    <div id="user"

                        style={{ backgroundImage: 'url(https://avatars0.githubusercontent.com/u/31365513?s=460&u=2c8ac60846741979dd42ff7835bfab2f6b871b15&v=4https://avatars0.githubusercontent.com/u/31365513?s=460&u=2c8ac60846741979dd42ff7835bfab2f6b871b15&v=4)' }}>

                    </div>


                </Col>

                <Col className="user-info" xs={12}>

                    {loggedUser === username ? <h3>Welcome {session.getCurrentUser.username}!</h3> : <h3>Welcome to {username}'s rate chart!</h3>}



                    <Col md={{ size: 6, offset: 3 }} xs={12}>



                        <Paper variant="outlined" />


                        {editStatus ? null :

                            <div className="user-profile-description">
                                {description}
                            </div>
                        }


                        <Paper />

                    </Col>

                    {editStatus ?

                        <Col xs={{ size: 6, offset: 3 }}>

                            <TextField id="outlined-basic"
                                label="Your profile description here!"
                                fullWidth
                                variant="outlined"
                                defaultValue={session.getCurrentUser.description}
                                onChange={handleDescriptionChange}
                                value={[description]}

                            />

                        </Col>

                        : null}

                    <div style={{ marginBottom: 10 }}></div>


                    {editStatus ? <Button variant="contained"
                        onClick={e => {
                            e.preventDefault();

                            editDescription({
                                variables: {
                                    username, description
                                }
                            });
                            setEditStatus(false)

                        }}

                    >



                        Save changes</Button> : null}

                    {DescriptionMutatedata && <p>Updated description ✅</p>}
                    {DescriptionMutateLoading && <p>Loading...</p>}
                    {DescriptionMutateError && <p>Error while updating description. Please try again</p>}

                    <div style={{ marginBottom: 20 }}></div>



                </Col>
            </Row>

        </Container>

    );
}

export default UserInfo;