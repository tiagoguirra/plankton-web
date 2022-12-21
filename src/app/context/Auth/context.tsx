import { createContext } from 'react'
import { AuthUser, SignUpProcess } from '../../types/auth'

export interface AuthContextType {
  user?: AuthUser | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  confirmSignUp: (email: string, password: string) => Promise<void>
  resendSignUp: (email: string) => Promise<void>
  recoveryPassword: (email: string) => Promise<void>
  confirmRecoveryPassword: (
    email: string,
    code: string,
    password: string
  ) => Promise<void>
  signOut: () => void
  signUpUser?: SignUpProcess
  recoveryUser?: SignUpProcess
  setRecovery: (user: SignUpProcess) => void
  error?: string | null
  signInWith: (provider: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>(null!)
