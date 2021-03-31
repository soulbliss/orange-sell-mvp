import React, { useState } from 'react';
import UserInfo from './UserInfo';
import UserItems from './UserItems';
import BuyerFeed from './BuyerFeed';

import AddItemCardPage from './../Items/AddItemCardPage';


import withAuth from '../withAuth';

import { useMutation, useQuery } from "@apollo/react-hooks";
import {
    GET_USER_INFO
} from '../../queries';


const Profile = ({ session, props }) => {

    const username = props.match.params.name;

    const authStatus = session.getCurrentUser.username === username ? true : false

    const userType = session.getCurrentUser.userType;

    const [userInfo, setUserInfo] = useState({})

    const { loading: queryLoading, error: queryError, data: queryData } = useQuery(
        GET_USER_INFO, {variables: {username}});



    return (




        <div className='App'>

            {/* add item option button only for sellers */}

            {queryData && 

                <div>

                 
                
                    
                    {authStatus && userType === 'seller' ? <AddItemCardPage /> : null}

                    <UserInfo session={session} username={username}/>

                    <hr />

                    <h5>Your oranges</h5>

                    {/* depending on user type, we show different views */}

                    {/* if seller, we show rate table */}

                    {/* { if buyer, we show feed of all rates being fed from network } */}


                    <p>Account type: {queryData.getUserInfo["userType"]}</p>

                    {queryData.getUserInfo["userType"] === 'seller' ?


                        <UserItems username={username} authStatus={authStatus}/>

                        :

                        <BuyerFeed username={username} />


                    }

                </div>
            

            }



        </div>

    );
}

export default withAuth(session => session && session.getCurrentUser)(Profile);