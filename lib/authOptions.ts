import prismadb from '@/lib/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET must be defined')
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user.hashedPassword) {
          throw new Error('Email does not exist')
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword,
        )

        if (!isCorrectPassword) {
          throw new Error('Incorrect password')
        }

        return user
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
}
