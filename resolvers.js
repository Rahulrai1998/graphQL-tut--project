import { quotes, users } from "./fakedb.js";
import { randomBytes } from "crypto";

const resolvers = {
  Query: {
    users: () => {
      return users;
    },
    user: (_, args) => users.find((user) => user._id == args._id),
    quotes: () => quotes,
    quote: (_, { by }) => quotes.filter((q) => q.by == by),
  },

  User: {
    quotes: (ur) => quotes.filter((quote) => quote.by == ur._id),
  },

  Mutation: {
    // PASSED ARGUMENTS ARE DESTRUCTURED BELOW IN SIGNUPNEWUSER MUTATION

    signupNewUser: (_,{data}) => {

      
      // const _id = randomBytes(5).toString("hex"); // RETURNS 10 DIGITS RANDOM STRING
      // users.push({
      //   // firstname:firstname,
      //   // lastname:lastname, //SINCE , KEY AND VALUE BOTH ARE SAME WE CAN SIMPLY GO WITH VALUE TO PUSH , HENCE ,
      //   _id:_id,
      //   ...data //spread() operator for getting out the object elements here ...data is equivalent to the elements of the data object
      // });

      // return users.find(user=>user._id === _id)

    }
  }
};

export default resolvers;
