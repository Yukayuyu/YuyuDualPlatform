import NextAuth, { type Session } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } 
  }
}

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [],//TODO: providers-- google,github,facebook,x ??
  callbacks: {
  },
  pages: {
    signIn: '/'
  }
})
