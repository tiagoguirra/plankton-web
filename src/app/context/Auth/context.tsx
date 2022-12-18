import { createContext } from 'react'
import { AuthUser, SignUpProcess } from '../../types/auth'

export interface AuthContextType {
  user?: AuthUser
  signIn: (email: string, password: string) => Promise<string | null>
  signUp: (name: string, email: string, password: string) => Promise<string | null>
  confirmSignUp: (email: string, password: string) => Promise<string | null>
  resendSignUp: (email: string) => Promise<string | null>
  signOut: () => void
  signUpUser?: SignUpProcess
}

export const AuthContext = createContext<AuthContextType>(null!)
