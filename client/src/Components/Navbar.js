import React, { Fragment } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Signout from './Auth/Signout';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';

import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({
    root: {
       
            width: '100%',
            position: 'fixed',
            bottom: 0,
            borderTop: "0.009px solid #d7d7d7",
            background: "white",
            zIndex:1000
            
    
    },
});


const Navbar = ({ session }) => {



    return (

        <nav style={{marginTop:100}}>

            {session && session.getCurrentUser ? <NavbarAuth session={session} /> :  <NavbarUnAuth  />}

        </nav>

    );


}
const NavbarAuth = ({ session }) => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const handleChange = (event, newValue) => {
      history.push(`/user/${newValue}`);
      setValue(newValue);
    };

    const username = session.getCurrentUser.username;

    return (

       <BottomNavigation
      value={value}
      onChange={handleChange} 
      showLabels
      className={classes.root}
    >
        
      {/* <BottomNavigationAction label="Home" value="" icon={<RestoreIcon />} /> */}
      <BottomNavigationAction label={username} value="profile" icon={<FavoriteIcon />} />
      {/* <BottomNavigationAction label="search" value="search" icon={<SearchIcon />} /> */}

    </BottomNavigation>
    
    );
}

const NavbarUnAuth = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const handleChange = (event, newValue) => {
      history.push(`/user/${newValue}`);
      setValue(newValue);
    };

    return (

       <BottomNavigation
      value={value}
      onChange={handleChange} 
      showLabels
      className={classes.root}
    >
      
      <BottomNavigationAction label="Signin" value="signin" icon={<FavoriteIcon />} />
     
    </BottomNavigation>
    
    );
}

export default Navbar;