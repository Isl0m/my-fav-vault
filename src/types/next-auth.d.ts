import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
import { DefaultJWT, JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      username?: string | null
    } & DefaultSession['user']
    // } & DefaultUser
  }
  interface User extends DefaultUser {
    username?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    uid?: string | null
    username?: string | null
  }
}
