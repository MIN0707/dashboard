import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './authconfig';
import { User } from './lib/models';
import { connectToDb } from './lib/utils';
import bcrypt from 'bcrypt';

const login = async (credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({
      username: credentials.username,
    });
    console.log(user);
    if (!user) {
      throw new Error('No user found');
    }
    console.log(credentials.password, user.password);
    const isValid = await bcrypt.compare(credentials.password, user.password);
    console.log(isValid);
    if (!isValid) {
      throw new Error('Invalid password');
    }
    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Login failed');
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.img = user.img;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
      }
      return session;
    },
  },
});
