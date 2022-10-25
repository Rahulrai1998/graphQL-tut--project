import { quotes, users } from "./fakedb.js";
import { randomBytes } from "crypto";

const resolvers = {
  Query: {
    users: () => {
      return users;
    },
    user: (_, args) => users.find((user) => user.id == args.id),
    quotes: () => quotes,
    quote: (_, { by }) => quotes.filter((q) => q.by == by),
  },

  User: {
    quotes: (ur) => quotes.filter((quote) => quote.by == ur.id),
  },

  Mutation: {
    // PASSED ARGUMENTS ARE DESTRUCTURED BELOW IN SIGNUPNEWUSER MUTATION

    signupNewUser: (_,{data}) => {
      const id = randomBytes(5).toString("hex"); // RETURNS 10 DIGITS RANDOM STRING
      users.push({
        // firstname:firstname,
        // lastname:lastname, //SINCE , KEY AND VALUE BOTH ARE SAME WE CAN SIMPLY GO WITH VALUE TO PUSH , HENCE ,
        id:id,
        ...data //spread() operator for getting out the object elements here ...data is equivalent to the elements of the data object
      });

      return users.find(user=>user.id === id)
    }
  }
};

export default resolvers;
