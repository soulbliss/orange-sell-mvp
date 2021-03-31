const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');



const createToken = (user, secret, expiresIn) => {

    const { username, email } = user;

    return jwt.sign({ username, email }, secret, { expiresIn })
}


exports.resolvers = {

    Query: {

        getCurrentUser: async (root, args, { currentUser, User }) => {



            if (!currentUser) {

                return null;
            }

            const user = await User.findOne({ username: currentUser.username });

            return user;

        },

        getUserItems: async (root, { username }, { User }) => {


            const usertht = await User.findOne({ username }).populate({

                path: 'items',

                model: 'Item',

                options: { sort: { createdDate: -1 } }

            })


            return usertht;

        },

        getAllUserItems: async (root, { }, { Item }) => {

            const all = await Item.find().sort({

                createdDate: "desc"

            })

            return all
        },

        getUserInfo: async (root, { username }, { User }) => {

            return user = await User.findOne({ username })


        }

    },

    Mutation: {


        addItem: async (root,

            { item, tag }, { Item, User, currentUser }) => {


            const newtht = await new Item({



                item,

                tag, createdDate: new Date(), updatedDate: new Date(), username: currentUser.username


            }).save();

            console.log(newtht._id, currentUser.username);

            const addItemInUser = await User.findOneAndUpdate({ username: currentUser.username }, { $addToSet: { items: newtht._id } });

            return newtht;

        },


        editItem: async (root, { _id, item, tag }, { Item, currentUser }) => {

            const results = await Item.findOneAndUpdate({ _id }, {
                $inc: { version: 1 },
                $set: { item: item, tag: tag, updatedDate: new Date() },
                
            });

            return results

        },


        deleteItem: async (root, { _id }, { Item, User, currentUser }) => {

            const results = await Item.findOneAndRemove({ _id });

            const removeItemInUser = await User.findOneAndUpdate({

                username: currentUser.username
            },

                { $pull: { items: _id } });

            return results

        },

        signinUser: async (root, { username, password }, { User }) => {

            const user = await User.findOne({ username });

            if (!user) {
                throw new Error('User not found');
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                throw new Error('Not a valid password');
            }

            return { token: createToken(user, process.env.SECRET, '1hr') };

        },


        signupUser: async (root, { username, email, password, userType }, { User }) => {

            const user = await User.findOne({ username });

            if (user) {
                throw new Error('User already exists');
            }

            const newUser = await new User({
                username,
                email,
                password,
                userType
            }).save();

            return { token: createToken(newUser, process.env.SECRET, '1hr') };
        }



    }
};