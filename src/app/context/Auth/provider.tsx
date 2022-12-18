import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthResponse, AuthUser } from '../../types/auth'
import { AuthContext } from './context'
import { Amplify, Auth } from 'aws-amplify'
import config from '../../config'
import { SignUpProcess } from '../../types/auth'

Amplify.configure(config.amplify)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [signUpUser, setSignUpUser] = useState<SignUpProcess>()
  const [user, setUser] = useState<AuthUser>()

  const storage = (autentication: AuthResponse) => {
    global.window.localStorage.setItem('auth', JSON.stringify(autentication))
  }

  const signOut = useCallback(async (): Promise<string | null> => {
    try {
      global.window.localStorage.removeItem('auth')
      await Auth.signOut()
      return null
    } catch (err) {
      // @ts-expect-error
      return err?.code
    }
  }, [])

  const signIn = useCallback(
    async (username: string, password: string): Promise<string | null> => {
      try {
        const { signInUserSession } = await Auth.signIn(username, password)
        const { accessToken, refreshToken, idToken } = signInUserSession

        storage({
          accessToken: accessToken.jwtToken,
          expiresIn: accessToken.payload.exp,
          refreshToken: refreshToken.token,
          idToken: idToken.jwtToken
        })
        setUser({
          name: accessToken.payload.name,
          email: accessToken.payload.email,
          avatar: accessToken.payload?.picture
        })
        return null
      } catch (err) {
        // @ts-expect-error
        return err?.code
      }
    },
    []
  )

  const signUp = useCallback(
    async (
      name: string,
      email: string,
      password: string
    ): Promise<string | null> => {
      try {
        const { codeDeliveryDetails } = await await Auth.signUp({
          username: email,
          password,
          attributes: {
            email,
            name
          }
        })

        setSignUpUser({
          email,
          destination: codeDeliveryDetails.Destination,
          sendAt: new Date()
        })
        return null
      } catch (err) {
        // @ts-expect-error
        return err?.code
      }
    },
    []
  )

  const confirmSignUp = useCallback(
    async (email: string, code: string): Promise<string | null> => {
      const response = await Auth.confirmSignUp(email, code)
      console.log(response)
      return null
    },
    []
  )

  const resendSignUp = useCallback(
    async (email: string): Promise<string | null> => {
      const response = await Auth.resendSignUp(email)
      console.log(response)
      return null
    },
    []
  )

  const validate = useCallback(async () => {
    try {
      const session = await Auth.currentSession()

      if (session && session.isValid()) {
        const accessToken = session.getAccessToken()
        console.log(accessToken)
        setUser({
          name: accessToken.payload.name,
          email: accessToken.payload.email,
          avatar: accessToken.payload?.picture
        })
      }
    } catch (err) {
      console.info('No session found')
      setUser(undefined)
      global.window.localStorage.removeItem('auth')
    }
  }, [])

  useEffect(() => {
    validate()
  }, [])

  const providerState = useMemo(
    () => ({
      user,
      signUpUser,
      signIn,
      signUp,
      signOut,
      confirmSignUp,
      resendSignUp,
      validate
    }),
    [user]
  )

  return (
    <AuthContext.Provider value={providerState}>
      {children}
    </AuthContext.Provider>
  )
}
