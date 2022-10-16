import {quotes,users} from './fakedb.js'

const resolvers = {
    Query: {
      users: () => {
        return users;
      },
      user: (_,args)=>users.find(user=>user.id==args.id),
      quotes:()=> quotes,
      quote:(_,{by})=>quotes.filter(q=>q.by == by)
    },  
  
    User:{
      quotes: (ur)=>quotes.filter(quote=> quote.by == ur.id )
  
      
    },

    Mutation:{
        signupNewUser:(_,{firstname,lastname,email,password})=>{
            
        }
    }
  };

  export default resolvers;