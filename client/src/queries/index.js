import { gql } from 'apollo-boost';

/* User Queries */

export const GET_CURRENT_USER = gql`

query {
  getCurrentUser{
    username
    joinDate
    email
    userType
  }
}

`;

export const GET_USER_ITEMS = gql`

query($username: String!){
  getUserItems(username: $username){
    _id
    items{
      _id
      item
      createdDate
      updatedDate
      version
      tag
    }
  }
}
`;


export const GET_ALL_USER_ITEMS = gql`
query {
  getAllUserItems {
    _id
    username
    item
    createdDate
    updatedDate
    version
    tag
  }
}
`;



export const GET_USER_INFO = gql`

query($username: String!) {
  getUserInfo(username: $username) {
    _id
    username
    userType
    password
  }
}
`;






/* Item Mutation */



export const ADD_ITEM = gql`

mutation( $tag: String!,
  $item: String!)
  {
    addItem( tag:$tag, item: $item)
    {
     item
      tag
    }
  }
`;



export const EDIT_ITEM = gql`
mutation($_id: ID!, $item: String!, $tag: String!) {
  editItem(_id: $_id, item: $item, tag: $tag) {
    _id
    item
    tag
    version
    }
}
`;

export const DELETE_ITEM = gql`
mutation($_id: ID!) {
  deleteItem(_id: $_id) {
    _id
    item
    }
}
`;






/* User Mutation */



export const SIGNUP_USER = gql`

mutation($username: String!, $email: String!,
  $password: String!, $userType: String!)
{
  signupUser(
    username: $username,
    email: $email,
    password: $password,
    userType: $userType)
  {
    token
  }
}
`;


export const SIGNIN_USER = gql`
mutation($username: String!,
  $password: String!)
{
  signinUser(
    username: $username,
    password: $password)
  {
    token
  }
}
`;
