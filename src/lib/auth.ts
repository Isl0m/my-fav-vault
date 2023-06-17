import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { User } from '@prisma/client'
import { compare, genSalt, hash } from 'bcryptjs'

import { env } from '@/env.mjs'

import prisma from './prisma'

const prismaAdapter = PrismaAdapter(prisma)

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token }) {
      if (token.uid && token.username) {
        session.user.id = token.uid
        session.user.username = token.username
        session.user.image = token.picture
      }
      return session
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.uid = user.id
        token.username = user?.username || null
      }
      if (trigger === 'update' && session.username) {
        token.username = session.username
      }
      if (trigger === 'update' && session.image) {
        token.picture = session.image
      }
      return token
    },
  },
  adapter: prismaAdapter,
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        email: {
          lable: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
        authMethod: { label: 'Auth Method', type: 'text' },
      },
      async authorize(credentials) {
        if (
          !credentials ||
          !credentials.email ||
          !credentials.password ||
          !credentials.authMethod
        ) {
          return null
        }

        const { email, password, authMethod } = credentials

        try {
          const user = await prisma.user.findFirst({
            where: { email },
          })

          if (authMethod === 'signin') {
            const isValid =
              user && user.password && (await compare(password, user.password))

            if (isValid) {
              const { password, ...filtredUser } = user

              return filtredUser as User
            }
          }

          if (authMethod === 'signup') {
            if (!credentials.username) return null

            const salt = await genSalt(12)

            const newUser = await prismaAdapter.createUser({
              email,
              emailVerified: null,
            })

            await prisma.user.update({
              where: { email },
              data: {
                password: await hash(password, salt),
                username: credentials.username,
              },
            })

            return { ...newUser, username: credentials.username } as User
          }

          return null
        } catch (e) {
          console.log(e)
          return null
        }
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
}
