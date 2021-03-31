exports.typeDefs = `


type Item {

    _id: ID!

    username: String!

    item: String!

    tag: String!

    version: Int!

    createdDate: String

    updatedDate: String

}



type User {

    _id: ID!

    username: String!

    password: String!

    description: String

    userType: String!

    items: [Item]

    email: String!

    joinDate: String

    
}

type Token {
    
    token: String!

}

type Query {

    
    getCurrentUser:  User

    getUserItems(username: String!): User

    getAllUserItems: [Item]

    getUserInfo(username: String!): User

    }


type Mutation {


    signinUser(username: String!, password: String!): Token

    signupUser(username: String!, email: String!, password: String!, userType: String!): Token

    addItem(item: String!, tag:String!): Item

    editItem(_id: ID!, item: String!, tag:String!): Item

    editDescription(username: String!, description: String): User

    deleteItem(_id: ID!): Item

}



`;
