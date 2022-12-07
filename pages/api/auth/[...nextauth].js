import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        allowDangerousEmailAccountLinking: true,
      }),

    // ...add more providers here
  ],
      
  callbacks: {  
    async session({token, session}) {
        session.user.tag = session.user.name.split(" ").join('').toLowerCase()
        console.log("tSub",token.sub)
        session.user.uid = token.sub
        return session;
    }
  }
}

export default NextAuth(authOptions)