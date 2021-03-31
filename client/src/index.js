import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';


import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import App from './App';
import Navbar from './Components/Navbar';
import withSession from './Components/withSession';
import Signin from './Components/Auth/Signin';
import Signup from './Components/Auth/Signup';
import Test from './Test'

import Profile from './Components/Profile/Profile'
import VersionsItemPage from './Components/Items/VersionsItemPage';

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import { ApolloProvider } from "react-apollo";

import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import Spinner from './Components/Spinner';




const httpLink = createHttpLink({
  uri: 'http://localhost:7000/graphql',
  credentials: 'same-origin'
});



const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});




const Root = ({ refetch, session }) => {


  return (

    <Router>

      <Fragment>


        <Switch>

          <Route path="/" exact render={() => <App session={session} />} />

          <Route path="/signin" render={() => <Signin refetch={refetch} />} />

          <Route path="/signup" render={() => <Signup refetch={refetch} />} />

          <Route path="/user/:name" render={(props) => <Profile session={session} session={session} props={props} />} />

          <Route path="/test" render={() => <Test session={session} />} />
        </Switch>

        <Navbar session={session} />


      </Fragment>

    </Router>
  )

};

const RootWithSession = withSession(Root);


ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <RootWithSession />
    </ApolloHooksProvider>
  </ ApolloProvider>,
  document.getElementById('root')
);
