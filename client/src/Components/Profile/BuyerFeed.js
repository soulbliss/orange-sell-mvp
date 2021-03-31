import React from 'react';

import ItemCard from './../Items/ItemCard'


import { useMutation, useQuery } from "@apollo/react-hooks";
import {
    GET_ALL_USER_ITEMS
} from '../../queries';

import Spinner from './../Spinner'

const BuyerFeed = ({ username}) => {

    const { loading: queryLoading, error: queryError, data: queryData } = useQuery(
        GET_ALL_USER_ITEMS, {  pollInterval: 1000}

    );



    return (
        <div>

            {queryLoading && <Spinner />}

            {queryError && <div className="App">Error loading thougts for the user</div>}

            {queryData && queryData.getAllUserItems.map(itemCardInfo => (
                <ItemCard key={itemCardInfo.updatedDate} {...itemCardInfo} />
            ))}

            <div className="blankSpace100"></div>
        </div>
    );
}

export default BuyerFeed;