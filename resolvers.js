import { quotes, users } from "./fakedb.js";
// import { randomBytes, sign } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

// JUST USING USER MODEL AND NOT REGISTERING
const User = mongoose.model("User");
const Quotes = mongoose.model("Quotes");

const resolvers = {
  Query: {
    users:async () => await User.find({}),
    user: async (_,{_id}) => await User.findOne({_id}),//users.find((user) => user._id == args._id),
    quotes: async () => await Quotes.find({}).populate("by" , "_id firstname"),
    quote: async(_, { by }) => await Quote.findOne({by}),//quotes.filter((q) => q.by == by)
  },

  User: {
    quotes: async (ur) => await Quotes.find({by:ur._id})//quotes.filter((quote) => quote.by == ur._id),
  },

  Mutation: {
    // PASSED ARGUMENTS ARE DESTRUCTURED BELOW IN SIGNUPNEWUSER MUTATION

    signupNewUser: async (_, { data }) => {
      const user = await User.findOne({ email: data.email });

      if (user) {
        throw new Error("User already exists with this email");
      } else {
        console.log(user);
      }
      const hashedPassword = await bcrypt.hash(data.password, 12);
      const newUser = new User({
        ...data,
        password: hashedPassword,
      });

      return await newUser.save();
      // const _id = randomBytes(5).toString("hex"); // RETURNS 10 DIGITS RANDOM STRING
      // users.push({
      //   // firstname:firstname,
      //   // lastname:lastname, //SINCE , KEY AND VALUE BOTH ARE SAME WE CAN SIMPLY GO WITH VALUE TO PUSH , HENCE ,
      //   _id:_id,
      //   ...data //spread() operator for getting out the object elements here ...data is equivalent to the elements of the data object
      // });

      // return users.find(user=>user._id === _id)
    },

    signInUser: async (_, { signIndata }) => {
      const user = await User.findOne({ email: signIndata.email });
      if (!user) {
        throw new Error("Invalid email/user");
      }
      const doMatch = await bcrypt.compare(signIndata.password, user.password);
      if (!doMatch) {
        throw new Error("Email or password is invalid");
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET);

      return { token };
    },

    // createQuote will be a protected resource , or user must sign in to use it
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) {
        throw new Error("You are not logged in");
      }
      const newQuote = new Quotes({
        // name : name ,
        name,
        by: userId,
      });

      await newQuote.save();
      return "Quote saved successfully";
    },
  },
};

export default resolvers;
