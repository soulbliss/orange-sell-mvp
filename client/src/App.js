import React from 'react';

import withAuth from './Components/withAuth'


import ItemCard from './Components/Items/ItemCard'
import AddItemCardPage from './Components/Items/AddItemCardPage'
import Profile from './Components/Profile/Profile'



import Signout from './Components/Auth/Signout';



import './App.css';




const App = ({ session }) => {

 

  return (
    <div>

      {/* <p className="App">preview of a <code>item card</code></p>

   

      <AddItemCardPage/> */}

    


    </div>
  );
}

export default withAuth(session => session && session.getCurrentUser)(App);
