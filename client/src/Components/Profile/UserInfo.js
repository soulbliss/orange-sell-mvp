import React from 'react';
import Signout from './../Auth/Signout'
import HeaderUser from '../HeaderUser';

import { Container, Row, Col } from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';

import moment from 'moment';





const UserInfo = ({ session, username }) => {

    var date = moment(parseInt(session.getCurrentUser.joinDate)).format('MMM DD, YYYY')

    var userType = session.getCurrentUser.userType

    var loggedUser = session.getCurrentUser.username

    return (



        <Container fluid style={{ paddingRight: 0, paddingLeft: 0 }}>

            <HeaderUser userType={userType} />

            <Row>
                <Col xs={12}>

                    <div id="user"

                        style={{ backgroundImage: 'url(https://avatars0.githubusercontent.com/u/31365513?s=460&u=2c8ac60846741979dd42ff7835bfab2f6b871b15&v=4https://avatars0.githubusercontent.com/u/31365513?s=460&u=2c8ac60846741979dd42ff7835bfab2f6b871b15&v=4)' }}>

                    </div>


                </Col>

                <Col className="user-info" xs={12}>

                    {loggedUser === username ? <h3>Welcome {session.getCurrentUser.username}!</h3> : <h3>Welcome to {username}'s rate chart!</h3>}



                    <Signout />

                </Col>
            </Row>

        </Container>

    );
}

export default UserInfo;