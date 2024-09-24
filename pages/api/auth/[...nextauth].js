import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { User } from '@/models/User';

const adminEmails = ['dawid.paszko@gmail.com', "sahu86744@gmail.com", "admin1@gmail.com"];

export const authOptions = {
  secret: process.env.SECRET || "secret",
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await User.findByEmail(credentials.email);

        if (!user) {
          throw new Error('User not found');
        }

        const isValidPassword = await User.validatePassword(user, credentials.password);

        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        return { email: user.email }; // Return user object on successful login
      }
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return session;
      }
    },
  },
};

export default NextAuth(authOptions);
