import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/auth/Signin",
    error: "/auth/error",
    verifyRequest: "/auth/Verifyrequest",
    newUser: "/auth/newUser", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      //maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
  ],
  callbacks: {
    async session({ session, user, account, token }) {
      //console.log(user);
      let User = await mongoose.connection.db
        .collection("users")
        .findOne({ _id: new mongoose.Types.ObjectId(user.id) }, (err, user) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('found user' + user)
        });

        console.log(User?.newUser);

      if (User?.newUser == undefined || User?.newUser == true) {
        console.log("newUser undefined >>>>>" + User.newUser);
        await mongoose.connection.db
          .collection("users")
          .updateOne({ _id: new mongoose.Types.ObjectId(user.id) }, { $set: { newUser: true, introSessionUsed: false } });
      } 
      session.status = user.status;
      session.id = user.id;
      session.newUser = user.newUser;
      session.name = `${user.firstName} ${user.lastName}`;
      session.introSessionUsed = user.introSessionUsed;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  
};

export default NextAuth(authOptions);
