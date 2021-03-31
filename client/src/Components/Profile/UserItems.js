import React from 'react';

import ItemCard from '../Items/ItemCard'
import EditItemCardModal from '../Items/EditItemCardModal'

import { Link } from 'react-router-dom';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { Container, Row, Col } from 'reactstrap';

import { useMutation, useQuery } from "@apollo/react-hooks";
import {
    GET_USER_ITEMS
} from '../../queries';

import Spinner from '../Spinner'




const UserItems = ({ username, authStatus }) => {

    const classes = useStyles();

    const { loading: queryLoading, error: queryError, data: queryData } = useQuery(
        GET_USER_ITEMS, { variables: { username }, pollInterval: 1000 }

    );



    return (
        <Col md={{size:6, offset:3}} xs={12}>

            {queryLoading && <Spinner />}

            {queryError && <div className="App">Error loading thougts for the user</div>}

          
            <div className="blankSpace100"></div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead style={{ background: '#f5f5f5' }}>
                        <TableRow>
                            <StyledTableCell >No.</StyledTableCell>
                            <StyledTableCell >Orange type</StyledTableCell>

                            <StyledTableCell align="right">Rate</StyledTableCell>
                            <StyledTableCell align="right">Date Uploaded</StyledTableCell>
                            {authStatus ? <StyledTableCell align="right">Edit</StyledTableCell> : null}


                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {queryData && queryData.getUserItems.items.map((itemCardInfo, index) => {
                            console.log(itemCardInfo)
                            

                            return (
                                //slicing the extension from the file name
                                <StyledTableRow key={itemCardInfo._id}>
                                    <StyledTableCell component="th" scope="row">    {index + 1}    </StyledTableCell>
                                    <StyledTableCell >   {itemCardInfo.item}   </StyledTableCell>

                                    <StyledTableCell align="right">{itemCardInfo.tag}</StyledTableCell>
                                    <StyledTableCell align="right">{humanReadableDate(itemCardInfo.createdDate)}</StyledTableCell>
                                    {authStatus ? <StyledTableCell align="right"><EditItemCardModal _id={itemCardInfo._id} item={itemCardInfo.item} tag={itemCardInfo.tagtag} /></StyledTableCell> : null}
                                </StyledTableRow>

                            )
                        }

                        )}


                    </TableBody>
                </Table>
            </TableContainer>


        </Col>
    );
}


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#000',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  

function humanReadableDate(unix_timestamp) {
    var timestamp = parseInt(unix_timestamp)
    var a = new Date(timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' at ' + hour + ':' + min // + ':' + sec ;
    return time;
}



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default UserItems;