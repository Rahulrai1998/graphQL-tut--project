import { quotes, users } from "./fakedb.js";
import { randomBytes, sign } from "crypto";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";


// JUST USING USER MODEL AND NOT REGISTERING 
const User = mongoose.model("User")

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

    signupNewUser: async (_,{data}) => {

      const user  =  await User.findOne({email:data.email})
     
      if(user){
        throw new Error("User already exists with this email")
      }else{
        console.log(user)

      }
      const hashedPassword = await bcrypt.hash(data.password,12)
      const newUser = new User({
        ...data , 
        password : hashedPassword
      })

      return await newUser.save()
      // const _id = randomBytes(5).toString("hex"); // RETURNS 10 DIGITS RANDOM STRING
      // users.push({
      //   // firstname:firstname,
      //   // lastname:lastname, //SINCE , KEY AND VALUE BOTH ARE SAME WE CAN SIMPLY GO WITH VALUE TO PUSH , HENCE ,
      //   _id:_id,
      //   ...data //spread() operator for getting out the object elements here ...data is equivalent to the elements of the data object
      // });

      // return users.find(user=>user._id === _id)

    },

    signInUser: async (_,{signIndata})=>{
      const user = await User.findOne({email:signIndata.email})
      if(!user){
        throw new Error("Invalid email/user")
      } 
      const doMatch = await bcrypt.compare(signIndata.password , user.password)
      if(!doMatch){
        throw new Error("Email or password is invalid")
      }

      const token  = jwt.sign({userId:user._id},JWT_SECRET)

      return {token}

    }
  }
};

export default resolvers;


